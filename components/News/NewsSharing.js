import React from "react";
import Link from "next/link";
import moment from 'moment';
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  ViberIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  EmailShareButton,
  EmailIcon,
  LineShareButton,
  LineIcon,
} from 'react-share';


export function NewsSharing({shareUrl,quotes}) {
  const yafet= quotes.textContent
  console.log(yafet)
  return (
    <div className="bg-gray-200 dark:bg-slate-700 flex flex-col lg:flex-row justify-between items-center w-full lg:h-28 border rounded-lg dark:border-slate-700 py-20">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-5 w-full">
      	<h1 className="text-black dark:text-white border rounded-lg text-xl font-bold mr-2 mb-5 lg:mb-0 dark:border-slate-700">Share On:</h1>
      	<div className="flex flex-col lg:flex-row items-center w-full flex-wrap">
          <div className="flex items-center justify-between mb-5">
            <div className="mx-1">
              <FacebookShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}`}
                quote="HuluNeger is one the most online recruitment provider in ethiopia, 
          The website advertises jobs across a wide range of job types by different employers, 
          inlcuding private, local, international, who are hiring in ethiopia."
                hashtag={'#huluMedia'}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>

            <div className="mx-1">
              <TelegramShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}`}
                title="HuluNeger is one the most online recruitment provider in ethiopia, 
          The website advertises jobs across a wide range of job types by different employers, 
          inlcuding private, local, international, who are hiring in ethiopia."
                hashtag={'#huluMedia'}
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>
            </div>

            <div className="mx-1">
              <TwitterShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}`}
                quote="HuluNeger is one the most online recruitment provider in ethiopia, 
          The website advertises jobs across a wide range of job types by different employers, 
          inlcuding private, local, international, who are hiring in ethiopia."
                hashtag={'#huluMedia'}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>

            <div className="mx-1">
              <PinterestShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}`}
                quote="HuluNeger is one the most online recruitment provider in ethiopia, 
          The website advertises jobs across a wide range of job types by different employers, 
          inlcuding private, local, international, who are hiring in ethiopia."
                hashtag={'#huluMedia'}
              >
                <PinterestIcon size={32} round />
              </PinterestShareButton>
            </div>

            <div className="mx-1">
              <RedditShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}`}
                quote="HuluNeger is one the most online recruitment provider in ethiopia, 
          The website advertises jobs across a wide range of job types by different employers, 
          inlcuding private, local, international, who are hiring in ethiopia."
                hashtag={'#huluMedia'}
              >
                <RedditIcon size={32} round />
              </RedditShareButton>
            </div> 
          </div>

          <div className="flex items-center justify-between mb-5">
            <div className="mx-1">
              <ViberShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}`}
                quote="HuluNeger is one the most online recruitment provider in ethiopia, 
          The website advertises jobs across a wide range of job types by different employers, 
          inlcuding private, local, international, who are hiring in ethiopia."
                hashtag={'#huluMedia'}
              >
                <ViberIcon size={32} round />
              </ViberShareButton>
            </div>

            <div className="mx-1">
              <WhatsappShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}`}
                quote="HuluNeger is one the most online recruitment provider in ethiopia, 
          The website advertises jobs across a wide range of job types by different employers, 
          inlcuding private, local, international, who are hiring in ethiopia."
                hashtag={'#huluMedia'}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>

            <div className="mx-1">
              <LinkedinShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}`}
                quote="HuluNeger is one the most online recruitment provider in ethiopia, 
          The website advertises jobs across a wide range of job types by different employers, 
          inlcuding private, local, international, who are hiring in ethiopia."
                hashtag={'#huluMedia'}
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>

            

            <div className="mx-1">
              <EmailShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}`}
                quote="HuluNeger is one the most online recruitment provider in ethiopia, 
          The website advertises jobs across a wide range of job types by different employers, 
          inlcuding private, local, international, who are hiring in ethiopia."
                hashtag={'#huluMedia'}
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
