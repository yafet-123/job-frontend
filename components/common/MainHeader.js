import Head from 'next/head';
import React,{useState,useEffect} from "react";

export const MainHeader = ({ title, image , quotes, shareUrl, type, news }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="HuluNeger is one the most online recruitment provider in ethiopia, 
          The website advertises jobs across a wide range of job types by different employers, 
          inlcuding private, local, international, who are hiring in ethiopia." 
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/logo1.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo1.png" />

        <meta property="og:url" content={`https://job-frontend-main.vercel.app${shareUrl}`}/>
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="1233665570615472" />
        <meta property="og:title" content={title} />
        <meta name="twitter:card" content={quotes} />
        <meta property="og:description" content={quotes} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
      </Head>
    </div>
  );
};
