import React from 'react'
import { baseProductionUrl } from '../constants'
import { useCanonicalUrl } from '../hooks/useCanonicalUrl'

interface Props {
  title: string
  description: string
  imageSrc?: string
  structured?: {
    datePublished: string
    dateModified: string
    image?: string[]
  }
  slug?: string
}

export const Meta: React.FC<Props> = ({
  title,
  description,
  imageSrc = `${baseProductionUrl}/thumbnail.png`,
  structured,
  slug,
}) => {
  const canonicalUrl = useCanonicalUrl({ slug })
  const actualTitle = `${title} | The AI Paper`
  const structuredData = structured
    ? {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: actualTitle,
        image: structured.image,
        datePublished: structured.datePublished,
        dateModified: structured.dateModified,
        author: [
          {
            '@type': 'Organization',
            name: 'The AI Paper',
            url: `${baseProductionUrl}/`,
          },
        ],
      }
    : null
  const url = `${baseProductionUrl}/p/${slug}`

  return (
    <>
      <title>{actualTitle}</title>
      <meta name="title" content={actualTitle} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={slug ? url : `${baseProductionUrl}/`} />
      <meta property="og:title" content={actualTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageSrc} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={slug ? url : `${baseProductionUrl}/`}
      />
      <meta property="twitter:title" content={actualTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageSrc} />

      <link rel="canonical" href={canonicalUrl} />

      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </>
  )
}
