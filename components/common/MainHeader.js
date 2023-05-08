import React from 'react';
import Head from 'next/head';
 
export const MainHeader = ({ title, image , quotes, shareUrl, type }) => {
  const ogurl = `https://job-frontend-main.vercel.app${shareUrl}`
  const ogImage=`https://job-frontend-main.vercel.app/api/og?images=${image}`
  console.log(image)
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta property="og:url" content={`https://job-frontend-main.vercel.app${shareUrl}`}/>
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="1233665570615472" />
        <meta
          property="og:title"
          content={title}
        />
        <meta name="twitter:card" content={quotes} />
        <meta
          property="og:description"
          content={quotes}
        />
        <meta property="og:image" content={`https://job-frontend-main.vercel.app/api/og?images=${image}`} />
      </Head>
    </div>
  );
};
