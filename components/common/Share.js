import React , { useState } from "react";
import Link from "next/link";
import moment from 'moment';
import { useRouter } from "next/router";
import { AiOutlineClose } from 'react-icons/ai'
import {
  TelegramShareButton,
  FacebookIcon,
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

import { FacebookShareButton } from "react-share"
export function Share({shareUrl,id,setviewModalOn,quote}) {
  const [deletemodalOn, setdeleteModalOn] = useState(false);

  const handleCancelClickForview = () => {
    setviewModalOn(false)
  }

  const clickedFordelete = () => {
    setdeleteModalOn(true)
  }

  return (
    <div className="bg-neutral-100 bg-opacity-80 dark:bg-slate-800 fixed inset-0 z-50 flex justify-center items-center">
        <div className="flex flex-col bg-white dark:bg-slate-500 py-2 lg:py-5 px-2 lg:px-5 border-4 border-sky-500 rounded-xl px-2">
          <div className="flex items-center justify-between mb-1 lg:mb-10">
            <h1 className="text-[#009688] dark:text-white font-bold text-lg lg:text-2xl">Share</h1>
            <button
                onClick={() => {
                  handleCancelClickForview()
                }} 
                className="text-[#009688] hover:bg-white font-bold py-2 px-4 hover:scale-110 duration-1000 ease-in-out rounded dark:text-white">
                <AiOutlineClose size={32} />
              </button>
          </div>
          <div className="lg:w-full flex flex-col">
            <div className="flex flex-row lg:justify-between w-full my-2 lg:my-5">
              <div className="m-1 lg:m-3 group hover:bg-[#009688] p-2 hover:border rounded-2xl">
                <FacebookShareButton
                  url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                  
                >
                  <span className="hidden lg:flex text-sm lg:text-xl font-bold text-[#009688] group-hover:text-white dark:text-white">
                    Facebook
                  </span>
                  <FacebookIcon className="block m-auto mt-2 lg:mt-5" size={40} round />
                </FacebookShareButton>
              </div>

              <div className="m-1 lg:m-3 group hover:bg-[#009688] p-2 hover:border rounded-2xl">
                <TelegramShareButton
                  url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                  title={quote}
                  hashtag={'#huluMedia'}
                  className="flex flex-col items-center justify-between"
                >
                  <span className="hidden lg:flex text-sm lg:text-xl font-bold text-[#009688] group-hover:text-white dark:text-white">
                    Telegram
                  </span>
                  <TelegramIcon className="block m-auto mt-2 lg:mt-5" size={40} round />
                </TelegramShareButton>
              </div>

              <div className="m-1 lg:m-3 group hover:bg-[#009688] p-2 hover:border rounded-2xl">
                <TwitterShareButton
                  url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                  title={quote}
                  hashtag={'#huluMedia'}
                  className="flex flex-col items-center justify-between"
                >
                  <span className="hidden lg:flex text-sm lg:text-xl font-bold text-[#009688] group-hover:text-white dark:text-white">
                    Twitter
                  </span>
                  <TwitterIcon className="block m-auto mt-2 lg:mt-5" size={40} round />
                </TwitterShareButton>
              </div>

              <div className="m-1 lg:m-3 group hover:bg-[#009688] p-2 hover:border rounded-2xl">
                <EmailShareButton
                  url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                  body={quote}
                  hashtag={'#huluMedia'}
                  className="flex flex-col items-center justify-between"
                >
                  <span className="hidden lg:flex text-sm lg:text-xl font-bold text-[#009688] group-hover:text-white dark:text-white">
                    Email
                  </span>
                  <EmailIcon className="block m-auto mt-2 lg:mt-5" size={40} round />
                </EmailShareButton>
              </div>   
            </div>

            <div className="flex flex-row lg:justify-between w-full my-2 lg:my-5">   
              <div className="m-1 lg:m-3 group hover:bg-[#009688] p-2 hover:border rounded-2xl">
                <ViberShareButton
                  url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                  title={quote}
                  hashtag={'#huluMedia'}
                  className="flex flex-col items-center justify-between"
                >
                  <span className="hidden lg:flex text-sm lg:text-xl font-bold text-[#009688] group-hover:text-white dark:text-white">
                    Viber
                  </span>
                  <ViberIcon className="block m-auto mt-2 lg:mt-5"  size={40} round />
                </ViberShareButton>
              </div> 

              <div className="m-1 lg:m-3 group hover:bg-[#009688] p-2 hover:border rounded-2xl">
                <WhatsappShareButton
                  url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                  title={quote}
                  hashtag={'#huluMedia'}
                  className="flex flex-col items-center justify-between"
                >
                  <span className="hidden lg:flex text-sm lg:text-xl font-bold text-[#009688] group-hover:text-white dark:text-white">
                    Whatsapp
                  </span>
                  <WhatsappIcon className="block m-auto mt-2 lg:mt-5" size={40} round />
                </WhatsappShareButton>
              </div>

              <div className="m-1 lg:m-3 group hover:bg-[#009688] p-2 hover:border rounded-2xl">
                <LinkedinShareButton
                  url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                  title={quote}
                  hashtag={'#huluMedia'}
                >
                  <span className="hidden lg:flex text-sm lg:text-xl font-bold text-[#009688] group-hover:text-white dark:text-white">
                    Linkedin
                  </span>
                  <LinkedinIcon className="block m-auto mt-2 lg:mt-5" size={40} round />
                </LinkedinShareButton>
              </div>

              <div className="m-1 lg:m-3 group hover:bg-[#009688] p-2 hover:border rounded-2xl">
                <FacebookMessengerShareButton
                  url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                  title={quote}
                  hashtag={'#huluMedia'}
                >
                  <span className="hidden lg:flex text-sm lg:text-xl font-bold text-[#009688] group-hover:text-white dark:text-white">
                    Messenger
                  </span>
                  <FacebookMessengerIcon className="block m-auto mt-2 lg:mt-5" size={40} round />
                </FacebookMessengerShareButton>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
