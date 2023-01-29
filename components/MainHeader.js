import React from 'react';
import Head from 'next/head';

export const MainHeader = ({ title }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Eco Travel Ethiopia offers you a tailor made sustainable adventures"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};
