import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { Category } from '../types'
import { useRouter } from 'next/router'
import { useTranslations } from '../hooks/useTranslations'
import { LinkButton } from './LinkButton'

type Props = React.PropsWithChildren<{}>

export function Layout({ children }: Props) {
  const router = useRouter()
  const translations = useTranslations()

  const categoryLabel: Record<Category, string> = {
    politics: translations.categoryPolitics(),
    business: translations.categoryBusiness(),
    investing: translations.categoryInvesting(),
    productivity: translations.categoryProductivity(),
    technology: translations.categoryTechnology(),
    crypto: translations.categoryCrypto(),
    coding: translations.categoryCoding(),
    gaming: translations.categoryGaming(),
    health: translations.categoryHealth(),
    culture: translations.categoryCulture(),
    cooking: translations.categoryCooking(),
    life: translations.categoryLife(),
  }

  return (
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
              const isActive = router.query.category === c
              return (
                <div key={i}>
                  <LinkButton
                    href={`/category/${c}/1`}
                    colorScheme={isActive ? 'brand' : 'secondary'}
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
            <span className="text-gray-700">{translations.introWarning()}</span>
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
  )
}
