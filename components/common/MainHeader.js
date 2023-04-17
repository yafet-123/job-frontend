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
        <meta
          property="og:description"
          content="And a social description for our cool page"
        />
        <meta
          property="og:image"
          content="https://example.com/images/cool-page.jpg"
        />
        
      </Head>
    </div>
  );
};
