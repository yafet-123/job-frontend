import React from 'react';
import Head from 'next/head';

export const MainHeader = ({ title }) => {
  const image = "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg"
  const url = `${process.env.headurl}?images=${image}`
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:url" content={process.env.headeurl} key="ogurl" />
        <meta property="og:image" content={url} key="ogimage" />
        <meta property="og:site_name" content="Hulu Media" key="ogsitename" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content="Hulu Media Offer you diffrent jobs , entertainment and other wonderfull things" key="ogdesc" />
        
      </Head>
    </div>
  );
};
