import Head from 'next/head';
import React,{useState,useEffect} from "react";

export const MainHeader = ({ title, image , quotes, shareUrl, type, news }) => {
  const [ogImageUrl, setOgImageUrl] = useState('');
  const ogurl = `https://job-frontend-main.vercel.app${shareUrl}`
  const ogImage=`https://job-frontend-main.vercel.app/api/og?images=${image}`
  console.log(image)
 
  useEffect(() => {
    async function generateOgImage() {
      const response = await fetch(`../api/og-image?image=${image}`);
      const imageUrl = await response.text();
      setOgImageUrl(imageUrl);
    }
    generateOgImage();
  }, [image]);

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
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
      </Head>
    </div>
  );
};
