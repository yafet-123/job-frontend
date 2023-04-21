import React from 'react';
import Head from 'next/head';

export const MainHeader = ({ title, image , quotes }) => {
  const url = `https://job-frontend-main.vercel.app/api/og?images=${image}`
  console.log(quotes)
  console.log(image)
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:url" content={process.env.headeurl} key="ogurl" />
        <meta property="og:image:url" content={image} />
        <meta property="og:site_name" content="Hulu Media" key="ogsitename" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={quotes} key="ogdesc" />
        
      </Head>
    </div>
  );
};
