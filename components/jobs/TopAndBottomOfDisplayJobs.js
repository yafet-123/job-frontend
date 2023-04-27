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


export function TopAndBottomOfDisplayJobs({DeadLine,Apply,quotes}) {
  const router = useRouter()
  const shareUrl = router.asPath
  return (
    <div className="bg-neutral-300 dark:bg-slate-700 flex flex-col lg:flex-row justify-between items-center w-full lg:h-28 border rounded-lg dark:border-slate-700 px-0 lg:px-3 py-20 my-2">
    	<div className="flex mb-10">
    		<div className="flex flex-row items-center text-sm lg:text-lg font-bold">
    			<p className="text-2xl text-[#009688]">Deadline</p>
    			<p className="px-3 text-red-700">{moment(DeadLine).utc().format('YYYY-MM-DD')}</p>
    		</div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center mb-5">
      	<h1 className="text-black dark:text-white text-xl font-bold mr-2 mb-5 lg:mb-0">Share On:</h1>
      	<div className="flex flex-col lg:flex-row items-center">
          <div className="flex items-center mb-5 lg:mb-0">
            <div className="mx-1">
              <FacebookShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={quotes}
                hashtag={'#huluMedia'}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>

            <div className="mx-1">
              <TelegramShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={quotes}
                hashtag={'#huluMedia'}
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>
            </div>

            <div className="mx-1">
              <TwitterShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={quotes}
                hashtag={'#huluMedia'}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>

            <div className="mx-1">
              <PinterestShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={quotes}
                hashtag={'#huluMedia'}
              >
                <PinterestIcon size={32} round />
              </PinterestShareButton>
            </div>

            <div className="mx-1">
              <RedditShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={quotes}
                hashtag={'#huluMedia'}
              >
                <RedditIcon size={32} round />
              </RedditShareButton>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mx-1">
              <ViberShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={quotes}
                hashtag={'#huluMedia'}
              >
                <ViberIcon size={32} round />
              </ViberShareButton>
            </div>

            <div className="mx-1">
              <WhatsappShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={quotes}
                hashtag={'#huluMedia'}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>

            <div className="mx-1">
              <LinkedinShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={quotes}
                hashtag={'#huluMedia'}
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>

            <div className="mx-1">
              <FacebookMessengerShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={quotes}
                hashtag={'#huluMedia'}
              >
                <FacebookMessengerIcon size={32} round />
              </FacebookMessengerShareButton>
            </div>

            <div className="mx-1">
              <EmailShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={quotes}
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
