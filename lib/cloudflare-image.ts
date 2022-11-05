export class CloudflareImage {
  async client({
    url,
    body,
    method = 'GET',
  }: {
    url: string
    body?: BodyInit
    method?: 'POST' | 'GET'
  }) {
    return fetch(
      `https://api.cloudflare.com/client/v4/accounts/520ed574991657981b4927dda46f2477${url}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGES_KEY}`,
        },
        body,
      }
    )
  }

  async uploadImage(
    buffer: Buffer
  ): Promise<{ id: string; variants: string[] }> {
    var form = new FormData()
    form.append('requireSignedURLs', 'my false')
    form.append('file', buffer.toString('base64'))

    return this.client({ url: '/images/v1', body: form })
      .then((res) => res.json())
      .then(({ response }) => {
        return { id: response.result.id, variants: response.result.variants }
      })
  }

  async fetchImageUrl(id: string) {
    return this.client({ url: `/images/v1/${id}` })
  }

  async getImageBuffer(id: string) {
    return this.client({ url: `/images/v1/${id}` })
      .then((res) => res.json())
      .then((response) => {
        // console.log(response.result.variants[0])
        return response.result.variants[0]
      })
      .then((url) => fetch(url))
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => Buffer.from(arrayBuffer))
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
