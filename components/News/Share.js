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


export function Share({shareUrl,id}) {
  const handleCancelClickForview = () => {
    setviewModalOn(false)
  }
  return (
    <div className="bg-neutral-100 bg-opacity-80 dark:bg-slate-800 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center bg-white dark:bg-slate-500 py-5 px-5 lg:px-10 border-4 border-sky-500 rounded-xl ">
          <div className="flex justify-between  w-full mb-5">
            <div className="mx-5">
              <FacebookShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
                className="flex flex-col items-center justify-between"
              >
                <span className="text-sm lg:text-xl font-bold text-[#009688]">
                  Facebook
                </span>
                <FacebookIcon className="!text-center" size={40} round />
              </FacebookShareButton>
            </div>

            <div className="mx-5">
              <TelegramShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
                className="flex flex-col items-center justify-between"
              >
                <span className="text-sm lg:text-xl font-bold text-[#009688]">
                  Telegram
                </span>
                <TelegramIcon size={40} round />
              </TelegramShareButton>
            </div>

            <div className="mx-2">
              <TwitterShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
                className="flex flex-col items-center justify-between"
              >
                <span className="text-sm lg:text-xl font-bold text-[#009688]">
                  Twitter
                </span>
                <TwitterIcon size={40} round />
              </TwitterShareButton>
            </div>

            <div className="mx-5">
              <EmailShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
                className="flex flex-col items-center justify-between"
              >
                <span className="text-sm lg:text-xl font-bold text-[#009688]">
                  Email
                </span>
                <EmailIcon size={40} round />
              </EmailShareButton>
            </div>

            <div className="mx-5">
              <ViberShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
                className="flex flex-col items-center justify-between"
              >
                <span className="text-sm text-center lg:text-xl font-bold text-[#009688]">
                  Viber
                </span>
                <ViberIcon className="" size={40} round />
              </ViberShareButton>
            </div>    
          </div>

          <div className="flex justify-between w-full ">
            

            <div className="mx-1">
              <WhatsappShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
                className="flex flex-col items-center justify-between"
              >
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
            </div>

            <div className="mx-1">
              <LinkedinShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
              >
                <LinkedinIcon size={40} round />
              </LinkedinShareButton>
            </div>

            <div className="mx-1">
              <FacebookMessengerShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
              >
                <FacebookMessengerIcon size={40} round />
              </FacebookMessengerShareButton>
            </div>

             <div className="mx-1">
              <PinterestShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
              >
                <PinterestIcon size={40} round />
              </PinterestShareButton>
            </div>

            <div className="mx-1">
              <RedditShareButton
                url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
              >
                <RedditIcon size={40} round />
              </RedditShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
