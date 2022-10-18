import axios from 'axios'
import { CacheService } from './cache'
import { stringToHash } from './hash'

export class Translate {
  cache = new CacheService()

  translate = async (q: string) => {
    return this.cache.fetch(
      stringToHash(
        JSON.stringify({
          version: 'v3',
          type: 'google-translate-api',
          source: 'en',
          target: 'es',
          format: 'text',
          q,
        })
      ),
      async () => {
        const url = new URL(
          'https://translation.googleapis.com/language/translate/v2'
        )

        url.searchParams.append('source', 'en')
        url.searchParams.append('target', 'es')
        url.searchParams.append('format', 'text')

        const response = await axios(url.toString(), {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.GOOGLE_TRANSLATE_API_TOKEN}`,
          },
          data: { q },
        })

        return response.data.data.translations[0].translatedText
      },
      3650
    )
  }
}
