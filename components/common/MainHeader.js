import React from 'react';
import Head from 'next/head';
 
export const MainHeader = ({ title, image , quotes, shareUrl, type }) => {
  const ogurl = `https://job-frontend-main.vercel.app${shareUrl}`
  const ogImage=`https://job-frontend-main.vercel.app/api/og?images=${image}`
  console.log(ogurl)
  console.log(image)
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={quotes} />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={`https://job-frontend-main.vercel.app${shareUrl}`} />
        <meta property="og:image" content={`https://job-frontend-main.vercel.app/api/og?images=${image}`} key="ogimage" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={type} />
        <meta property="og:description" content={quotes} key="ogdesc" /> 
        <meta property="og:site_name" content="Hulu Media" key="ogsitename" />
        <meta property="fb:app_id" content="your_app_id" />

        <title>{title}</title>
      </Head>
    </div>
  );
};
