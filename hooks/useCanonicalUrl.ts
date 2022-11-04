import { useRouter } from 'next/router'
import { baseProductionUrl } from '../constants'

interface UseCanonicalUrlArgs {
  slug?: string
}

export function useCanonicalUrl({ slug }: UseCanonicalUrlArgs) {
  // const router = useRouter()

  // if (router.pathname.startsWith('/posts/')) {
  //   return `${baseProductionUrl}${router.asPath}`
  // }

  // if (router.pathname.startsWith('/p/') && slug) {
  //   return `${baseProductionUrl}/p/${slug}`
  // }

  return `${baseProductionUrl}/`
}
