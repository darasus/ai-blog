import { ImageLoaderProps } from 'next/image'

export function cloudflareLoader({
  src,
  width = 1000,
  quality = 75,
}: ImageLoaderProps) {
  return `https://imagedelivery.net/1Y4KoCbQQUt_e_VWvskl5g/${src}/width=${
    width > 1000 ? 1000 : width
  },quality=${quality}`
}
