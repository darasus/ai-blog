import Head from "next/head";
import React from "react";

interface Props {
  title: string;
  description: string;
  imageSrc?: string;
}

export const Meta: React.FC<Props> = ({ title, description, imageSrc }) => {
  const actualTitle = `${title} | The AI Paper`;
  const imgSrc = imageSrc
    ? `https://www.theaipaper.com${imageSrc}`
    : `https://www.theaipaper.com/thumbnail.png`;
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
    </Head>
  );
};
