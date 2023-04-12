import React from 'react';
import Head from 'next/head';

export const MainHeader = ({ title }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Hulu Media Offer you diffrent jobs , entertainment and other wonderfull things"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:image" content="https://flaviocopes.com/img/avatar.png"/>
        <link
          rel="Head-icon"
          sizes="180x180"
          href="/headLogo.png"
        />
      </Head>
    </div>
  );
};
