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
        <meta charSet="utf-8" />
        
        
        <meta property="og:title" content="title" />
        <meta property="og:type" content="News" />
        <meta property="og:url" content={`https://job-frontend-main.vercel.app${shareUrl}`} />
        <meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" />
      </Head>
    </div>
  );
};
