import { useRouter } from 'next/router'
import { useMemo } from 'react'
import translations from '../lang.json'

export const useTranslations = () => {
  const { locale } = useRouter()

  const t = useMemo(() => {
    return Object.keys(translations).reduce((acc, next) => {
      return {
        ...acc,
        [next]:
          translations[next as keyof typeof translations][
            locale as 'en' | 'es'
          ],
      }
    }, {})
  }, [locale])

  return t as Record<string, string>
}
