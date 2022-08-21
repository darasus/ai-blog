import Head from "next/head";
import React from "react";

interface Props {
  title: string;
  description: string;
  imageSrc?: string;
  structured?: {
    datePublished: string;
    dateModified: string;
    image?: string[];
  };
}

export const Meta: React.FC<Props> = ({
  title,
  description,
  imageSrc,
  structured,
}) => {
  const actualTitle = `${title} | The AI Paper`;
  const imgSrc = imageSrc
    ? `https://www.theaipaper.com${imageSrc}`
    : `https://www.theaipaper.com/thumbnail.png`;
  const structuredData = structured
    ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: actualTitle,
        image: structured.image,
        datePublished: structured.datePublished,
        dateModified: structured.dateModified,
        author: [
          {
            "@type": "Organization",
            name: "The AI Paper",
            url: "https://www.theaipaper.com/",
          },
        ],
      }
    : null;
  return (
    <Head>
      <title>{actualTitle}</title>
      <meta name="title" content={actualTitle} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.theaipaper.com/" />
      <meta property="og:title" content={actualTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgSrc} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.theaipaper.com/" />
      <meta property="twitter:title" content={actualTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imgSrc} />

      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
};
