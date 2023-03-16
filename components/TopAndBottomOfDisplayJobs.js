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
} from 'next-share';


export function TopAndBottomOfDisplayJobs({DeadLine,Apply}) {
  const router = useRouter()
  const shareUrl = router.asPath
  console.log(shareUrl)
   const socialMediaLinks = [
    { path: "", button:"FacebookShareButton", icon:<FacebookIcon size={32} round />},
    { path: "", button:"FacebookShareButton", icon:<PinterestIcon size={32} round />},
    { path: "", button:"FacebookShareButton", icon:<RedditIcon size={32} round />},
    { path: "", button:"FacebookShareButton", icon:<TelegramIcon size={32} round />},
    { path: "", button:"FacebookShareButton", icon:<TwitterIcon size={32} round />},
    { path: "", button:"FacebookShareButton", icon:<ViberIcon size={32} round />},
    { path: "", button:"FacebookShareButton", icon:<WhatsappIcon size={32} round />},
    { path: "", button:"FacebookShareButton", icon:<LinkedinIcon size={32} round />},
    { path: "", button:"FacebookShareButton", icon:<FacebookMessengerIcon size={32} round />},
    { path: "", button:"FacebookShareButton", icon:<EmailIcon size={32} round />},
  ];
  return (
    <div className="bg-gray-200 dark:bg-slate-700 flex flex-col lg:flex-row justify-between items-center w-full lg:h-28 border rounded-lg dark:border-slate-700 px-0 lg:px-10 py-20">
    	<div className="flex mb-10">
    		<h1 className="px-3 lg:px-10 py-3 bg-yellow-400 text-white border rounded-lg text-md lg:text-lg font-bold mr-2">Apply Now</h1>
    		<div className="flex flex-col text-sm lg:text-lg text-red-700 font-bold">
    			<p className="">Deadline</p>
    			<p className="">{moment(DeadLine).utc().format('YYYY-MM-DD')}</p>
    		</div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center mb-10">
      	<h1 className="text-black dark:text-white border rounded-lg text-xl font-bold mr-2 mb-5 lg:mb-0 dark:border-slate-700">Share On:</h1>
      	<div className="flex items-center">
          {socialMediaLinks.map((main, index) => (
            <div className="mx-1">
              <FacebookShareButton
                url={`https://job-frontend-main.vercel.app/${shareUrl}`}
                quote={'next-share is a social share buttons for your next React apps.'}
                hashtag={'#nextshare'}
              >
                {main.icon}
              </FacebookShareButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}