import React from "react";
import Link from "next/link";
import moment from 'moment';
import { useRouter } from "next/router";
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
} from 'next-share';


export function Share({DeadLine,Apply}) {
  return (
    <div className="flex flex-col lg:flex-row w-full justify-between lg:h-28 border rounded-lg dark:border-slate-700 py-5 mb-2">
      <div className="flex flex-col lg:flex-row mb-5 w-full">
        <div className="flex justify-between  w-full mb-5">
          <div className="mx-1">
            <FacebookShareButton
              url={`https://job-frontend-main.vercel.app/${shareUrl}`}
              quote={'Hulu Media is company that shares jobs , entertainment and others'}
              hashtag={'#huluMedia'}
            >
              <FacebookIcon size={28} round />
            </FacebookShareButton>
          </div>

          <div className="mx-1">
            <TelegramShareButton
              url={`https://job-frontend-main.vercel.app/${shareUrl}`}
              quote={'Hulu Media is company that shares jobs , entertainment and others'}
              hashtag={'#huluMedia'}
            >
              <TelegramIcon size={28} round />
            </TelegramShareButton>
          </div>

          <div className="mx-1">
            <TwitterShareButton
              url={`https://job-frontend-main.vercel.app/${shareUrl}`}
              quote={'Hulu Media is company that shares jobs , entertainment and others'}
              hashtag={'#huluMedia'}
            >
              <TwitterIcon size={28} round />
            </TwitterShareButton>
          </div>

          <div className="mx-1">
            <EmailShareButton
              url={`https://job-frontend-main.vercel.app/${shareUrl}`}
              quote={'Hulu Media is company that shares jobs , entertainment and others'}
              hashtag={'#huluMedia'}
            >
              <EmailIcon size={28} round />
            </EmailShareButton>
          </div>

          <div className="mx-1">
            <ViberShareButton
              url={`https://job-frontend-main.vercel.app/${shareUrl}`}
              quote={'Hulu Media is company that shares jobs , entertainment and others'}
              hashtag={'#huluMedia'}
            >
              <ViberIcon size={28} round />
            </ViberShareButton>
          </div>    
        </div>

        <div className="flex justify-between w-full ">
          

          <div className="mx-1">
            <WhatsappShareButton
              url={`https://job-frontend-main.vercel.app/${shareUrl}`}
              quote={'Hulu Media is company that shares jobs , entertainment and others'}
              hashtag={'#huluMedia'}
            >
              <WhatsappIcon size={28} round />
            </WhatsappShareButton>
          </div>

          <div className="mx-1">
            <LinkedinShareButton
              url={`https://job-frontend-main.vercel.app/${shareUrl}`}
              quote={'Hulu Media is company that shares jobs , entertainment and others'}
              hashtag={'#huluMedia'}
            >
              <LinkedinIcon size={28} round />
            </LinkedinShareButton>
          </div>

          <div className="mx-1">
            <FacebookMessengerShareButton
              url={`https://job-frontend-main.vercel.app/${shareUrl}`}
              quote={'Hulu Media is company that shares jobs , entertainment and others'}
              hashtag={'#huluMedia'}
            >
              <FacebookMessengerIcon size={28} round />
            </FacebookMessengerShareButton>
          </div>

           <div className="mx-1">
            <PinterestShareButton
              url={`https://job-frontend-main.vercel.app/${shareUrl}`}
              quote={'Hulu Media is company that shares jobs , entertainment and others'}
              hashtag={'#huluMedia'}
            >
              <PinterestIcon size={28} round />
            </PinterestShareButton>
          </div>

          <div className="mx-1">
            <RedditShareButton
              url={`https://job-frontend-main.vercel.app/${shareUrl}`}
              quote={'Hulu Media is company that shares jobs , entertainment and others'}
              hashtag={'#huluMedia'}
            >
              <RedditIcon size={28} round />
            </RedditShareButton>
          </div>
        </div>
      </div>
    </div>
  );
}
