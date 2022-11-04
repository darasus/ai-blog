import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Category } from '../types'
import { useTranslations } from '../hooks/useTranslations'
import { headers } from 'next/headers'
import { Navbar } from '../components/Navbar'
import { LinkButton } from '../components/LinkButton'
import { Footer } from '../components/Footer'
import '../styles/globals.css'

type Props = React.PropsWithChildren<{}>

export default function RootLayout({ children }: Props) {
  const locale = headers().get('Accept-Language') as 'en' | 'es'
  const translations = useTranslations(locale)

  const categoryLabel: Record<Category, string> = {
    politics: translations['category.politics'],
    business: translations['category.business'],
    investing: translations['category.investing'],
    productivity: translations['category.productivity'],
    technology: translations['category.technology'],
    crypto: translations['category.crypto'],
    coding: translations['category.coding'],
    gaming: translations['category.gaming'],
    health: translations['category.health'],
    culture: translations['category.culture'],
    cooking: translations['category.cooking'],
    life: translations['category.life'],
  }

  return (
    <html>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body>
        <div className="bg-gray-100 min-h-screen">
          <div className="bg-gray-900">
            <div className="px-4 max-w-6xl m-auto">
              <div>
                <Navbar />
              </div>
            </div>
          </div>
          <div className="bg-white py-2 border-b border-gray-200">
            <div className="max-w-6xl m-auto">
              <div className="flex flex-row gap-2 overflow-y-visible overflow-x-auto px-2">
                {Object.keys(categoryLabel).map((c, i) => {
                  // const isActive = router.query.category === c
                  return (
                    <div key={i}>
                      <LinkButton
                        href={`/category/${c}/1`}
                        // colorScheme={isActive ? 'brand' : 'secondary'}
                      >
                        {categoryLabel[c as Category]}
                      </LinkButton>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="my-4">
            <div className="flex max-w-6xl m-auto p-4 bg-white border border-gray-200 items-center">
              <div className="mr-2">
                <span className="text-yellow-300">
                  <ExclamationTriangleIcon width={22} height={22} />
                </span>
              </div>
              <div>
                <span className="text-gray-700">
                  {translations['intro.warning']}
                </span>
              </div>
            </div>
          </div>
          <div className="max-w-6xl m-auto bg-white border border-gray-200">
            <main>{children}</main>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
