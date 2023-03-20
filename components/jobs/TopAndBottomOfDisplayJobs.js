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


export function TopAndBottomOfDisplayJobs({DeadLine,Apply}) {
  const router = useRouter()
  const shareUrl = router.asPath
  return (
    <div className="bg-neutral-300 dark:bg-slate-700 flex flex-col lg:flex-row justify-between items-center w-full lg:h-28 border rounded-lg dark:border-slate-700 px-0 lg:px-10 py-20 mb-2">
    	<div className="flex mb-10">
    		<h1 className="px-3 lg:px-10 py-3 bg-[#009688] text-white border rounded-lg text-md lg:text-lg font-bold mr-2">Apply Now</h1>
    		<div className="flex flex-col text-sm lg:text-lg text-red-700 font-bold">
    			<p className="">Deadline</p>
    			<p className="">{moment(DeadLine).utc().format('YYYY-MM-DD')}</p>
    		</div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center mb-5">
      	<h1 className="text-black dark:text-white border rounded-lg text-xl font-bold mr-2 mb-5 lg:mb-0 dark:border-slate-700">Share On:</h1>
      	<div className="flex flex-col lg:flex-row items-center">
          <div className="flex items-center mb-5 lg:mb-0">
            <div className="mx-1">
              <FacebookShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>

            <div className="mx-1">
              <PinterestShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
              >
                <PinterestIcon size={32} round />
              </PinterestShareButton>
            </div>

            <div className="mx-1">
              <RedditShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
              >
                <RedditIcon size={32} round />
              </RedditShareButton>
            </div>

            <div className="mx-1">
              <TelegramShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>
            </div>

            <div className="mx-1">
              <TwitterShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mx-1">
              <ViberShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
              >
                <ViberIcon size={32} round />
              </ViberShareButton>
            </div>

            <div className="mx-1">
              <WhatsappShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>

            <div className="mx-1">
              <LinkedinShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>

            <div className="mx-1">
              <FacebookMessengerShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
                hashtag={'#huluMedia'}
              >
                <FacebookMessengerIcon size={32} round />
              </FacebookMessengerShareButton>
            </div>

            <div className="mx-1">
              <EmailShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={'Hulu Media is company that shares jobs , entertainment and others'}
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
