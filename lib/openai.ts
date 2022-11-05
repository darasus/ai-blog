import axios from 'axios'
import { Configuration, OpenAIApi } from 'openai'
import { CacheService } from './cache'
import { stringToHash } from './hash'

export class OpenAI {
  private ai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })
  )
  private cache = new CacheService()

  async createCompletion(prompt: string) {
    return this.cache.fetch(
      stringToHash(prompt),
      async () => {
        const response = await this.ai.createCompletion({
          model: 'text-davinci-002',
          prompt,
          temperature: 0,
          max_tokens: 4000,
          top_p: 1,
          frequency_penalty: 0.2,
          presence_penalty: 0,
        })

        return response.data
      },
      365
    )
  }

  async createImage(prompt: string) {
    return axios({
      url: 'https://api.openai.com/v1/images/generations',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      data: {
        prompt,
        n: 1,
        size: '1024x1024',
      },
    })
      .then((response) => response.data.data[0].url)
      .then((url) => fetch(url))
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => Buffer.from(arrayBuffer))
  }
}
