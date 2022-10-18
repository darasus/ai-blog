import { Configuration, OpenAIApi } from 'openai'
import { CacheService } from './cache'
import { stringToHash } from './hash'

export class AI {
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
}
