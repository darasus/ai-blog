import axios from 'axios'
import { CacheService } from './cache'
import { stringToHash } from './hash'
import axiosRetry from 'axios-retry'

const client = axios.create({
  baseURL: 'https://api.writesonic.com/v1/business/content',
  headers: {
    accept: 'application/json',
    'X-API-KEY': '7bfde6b2-3a26-402b-9808-3f84640fadd4',
    'Content-Type': 'application/json',
  },
  params: {
    end_user_id: 'idarase@gmail.com',
    engine: 'business',
    language: 'en',
  },
})

axiosRetry(client, {
  retries: 3,
  retryCondition(error: any) {
    return error?.response?.status >= 500
  },
  retryDelay: (retryCount) => {
    return retryCount * 1000
  },
  onRetry() {
    console.warn(`Request failed, retrying...`)
  },
})

export class Writesonic {
  private cache = new CacheService()

  private handleError =
    (type: 'content' | 'summary' | 'outlines' | 'intro') => (error: any) => {
      const e = {
        code: error?.code,
        type,
        status: error?.response?.status,
        message: error?.response?.statusText,
      }
      console.error('[WRITESONIC] Error generating content: ', e)
      throw e
    }

  private generateIntro = async ({
    title,
  }: {
    title: string
  }): Promise<string> =>
    this.cache.fetch(
      stringToHash(JSON.stringify({ title })),
      () =>
        client
          .post('/blog-intros', {
            blog_title: title,
          })
          .then((response) => response.data[0].text)
          .catch(this.handleError('intro')),
      3650
    )

  private generateOutlines = async ({
    title,
    intro,
  }: {
    title: string
    intro: string
  }): Promise<string[]> =>
    this.cache.fetch(
      stringToHash(JSON.stringify({ title, intro })),
      () =>
        client
          .post('/blog-outlines', {
            blog_title: title,
            blog_intro: intro,
          })
          .then((response) => response.data[0].text)
          .then((text) => text.split('\n').map((line: string) => line.trim()))
          .catch(this.handleError('outlines')),
      3650
    )

  private generateContent = async ({
    title,
    intro,
    outlines,
  }: {
    title: string
    intro: string
    outlines: string[]
  }): Promise<string> =>
    this.cache.fetch(
      stringToHash(JSON.stringify({ title, intro, outlines })),
      () =>
        client
          .post('/ai-article-writer-v3', {
            article_title: title,
            article_intro: intro,
            article_sections: outlines,
          })
          .then((response) => response.data.data[0].content)
          .catch(this.handleError('content')),
      3650
    )

  private generateSummary = async ({
    content,
  }: {
    content: string
  }): Promise<string> => {
    return this.cache.fetch(
      stringToHash(JSON.stringify({ type: 'summary', content })),
      () =>
        client
          .post('/summary', {
            article_text: content,
          })
          .then((response) => {
            const summary = response.data?.[0]?.summary.trim()
            if (!summary) {
              throw new Error('No summary found')
            }
            return summary
          })
          .catch(this.handleError('summary')),
      3650
    )
  }

  public generateArticle = async ({
    title,
  }: {
    title: string
  }): Promise<{
    title: string
    content: string
    summary: string
    intro: string
  }> => {
    const intro = await this.generateIntro({ title })
    const outlines = await this.generateOutlines({ title, intro })
    const content = await this.generateContent({ title, intro, outlines })
    const summary = await this.generateSummary({ content })

    return { title, summary, content, intro }
  }
}
