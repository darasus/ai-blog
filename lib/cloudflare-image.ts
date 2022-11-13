import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

export class CloudflareImage {
  async client({
    url,
    body,
    method = 'GET',
    headers,
  }: {
    url: string
    body?: any
    method?: 'POST' | 'GET'
    headers?: HeadersInit
  }) {
    return fetch(
      `https://api.cloudflare.com/client/v4/accounts/520ed574991657981b4927dda46f2477${url}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGES_KEY}`,
          ...headers,
        },
        body,
      }
    )
  }

  async uploadImage(
    buffer: Buffer,
    filename: string
  ): Promise<{ id: string; variants: string[] }> {
    const form = new FormData()
    form.append('requireSignedURLs', 'false')
    form.append('file', fs.ReadStream.from(buffer), filename)

    return axios(
      'https://api.cloudflare.com/client/v4/accounts/520ed574991657981b4927dda46f2477/images/v1',
      {
        method: 'POST',
        data: form,
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGES_KEY}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
      .then((res) => {
        return res.data
      })
      .then(({ result }) => {
        return { id: result.id, variants: result.variants }
      })
  }

  async fetchImageUrl(id: string) {
    return this.client({ url: `/images/v1/${id}` })
  }

  async getImageBuffer(id: string) {
    return this.client({ url: `/images/v1/${id}` })
      .then((res) => {
        return res.json()
      })
      .then((response) => {
        return response.result.variants[0]
      })
      .then((url) => {
        return fetch(url)
      })
      .then((res) => {
        return res.arrayBuffer()
      })
      .then((arrayBuffer) => {
        return Buffer.from(arrayBuffer)
      })
  }

  async getAllImages() {
    console.log('Started fetching all articles....')
    const imageObject: Record<string, string> = {}
    let page = 0

    while (true) {
      const response = await this.client({
        url: `/images/v1?per_page=100&page=${page}`,
      })
      const {
        result: { images },
      } = await response.json()
      if (images.length === 0) {
        break
      }
      images.forEach((image: any) => {
        imageObject[image.filename.replace('.png', '')] = image.id
      })
      page++
    }

    console.log(`Done fetching ${Object.keys(imageObject).length} articles....`)

    return imageObject
  }
}
