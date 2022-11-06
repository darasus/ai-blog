import { Category } from '@prisma/client'
import { useMemo } from 'react'
import { IntlShape, useIntl } from 'react-intl'

function getTranslations(intl: IntlShape) {
  return {
    introWarning: () =>
      intl.formatMessage({
        id: 'intro.warning',
        defaultMessage:
          'All materials from "The AI Paper" are carefully crafted by advanced Artificial Intelligence models and should not be taken as truth.',
      }),
    siteDescription: () =>
      intl.formatMessage({
        id: 'site.description',
        defaultMessage:
          'All materials from "The AI Paper" are carefully crafted by advanced Articial Intelligence models.',
      }),
    latestArticles: () =>
      intl.formatMessage({
        id: 'latest.articles',
        defaultMessage: 'Latest articles',
      }),
    latest: () =>
      intl.formatMessage({
        id: 'latest',
        defaultMessage: 'Latest',
      }),
    otherInCategory: (category: Category) =>
      intl.formatMessage(
        {
          id: 'other.in.category',
          defaultMessage: 'Other in {category}',
        },
        { category }
      ),
    seeMore: () =>
      intl.formatMessage({
        id: 'see.more',
        defaultMessage: 'See more',
      }),
    categoryPolitics: () =>
      intl.formatMessage({
        id: 'category.politics',
        defaultMessage: 'Politics',
      }),
    categoryBusiness: () =>
      intl.formatMessage({
        id: 'category.business',
        defaultMessage: 'Business',
      }),
    categoryInvesting: () =>
      intl.formatMessage({
        id: 'category.investing',
        defaultMessage: 'Investing',
      }),
    categoryProductivity: () =>
      intl.formatMessage({
        id: 'category.productivity',
        defaultMessage: 'Productivity',
      }),
    categoryTechnology: () =>
      intl.formatMessage({
        id: 'category.technology',
        defaultMessage: 'Technology',
      }),
    categoryCrypto: () =>
      intl.formatMessage({
        id: 'category.crypto',
        defaultMessage: 'Crypto',
      }),
    categoryCoding: () =>
      intl.formatMessage({
        id: 'category.coding',
        defaultMessage: 'Coding',
      }),
    categoryGaming: () =>
      intl.formatMessage({
        id: 'category.gaming',
        defaultMessage: 'Gaming',
      }),
    categoryHealth: () =>
      intl.formatMessage({
        id: 'category.health',
        defaultMessage: 'Health',
      }),
    categoryCulture: () =>
      intl.formatMessage({
        id: 'category.culture',
        defaultMessage: 'Culture',
      }),
    categoryCooking: () =>
      intl.formatMessage({
        id: 'category.cooking',
        defaultMessage: 'Cooking',
      }),
    categoryLife: () =>
      intl.formatMessage({
        id: 'category.life',
        defaultMessage: 'Life',
      }),
  }
}

export const useTranslations = () => {
  const intl = useIntl()

  return useMemo(() => {
    return getTranslations(intl)
  }, [intl])
}
