import React from 'react';
import Head from 'next/head';

export const MainHeader = ({ title }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content="How to set GitHub credentials for macOS"/>
        <meta property="og:description" content="Set up GitHub authentication so you can use it from VS Code or the command line"/>
        <meta property="og:type" content="article"/>
        <meta property="og:url" content="https://flaviocopes.com/setup-github-credentials-macos"/>
        <meta property="og:image" content="https://flaviocopes.com/img/avatar.png"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      
        <link
          rel="Head-icon"
          sizes="180x180"
          href="/headLogo.png"
        />
      </Head>
    </div>
  );
};
