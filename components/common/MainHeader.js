import React from 'react';
import Head from 'next/head';
 
export const MainHeader = ({ title, image , quotes, shareUrl }) => {
  const ImageUrl = `https://job-frontend-main.vercel.app/api/og?images=${image}`
  const url = `process.env.headeurl${shareUrl}`
  console.log(quotes)
  console.log(image)
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={quotes} />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        {/* Open Graph */}
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:image" content={image} key="ogimage" />
        <meta property="og:description" content={quotes} key="ogdesc" /> 
        <meta property="og:url" content={url} key="ogurl" />
        <meta property="og:site_name" content="Hulu Media" key="ogsitename" />


        <title>{title}</title>
      </Head>
    </div>
  );
};
