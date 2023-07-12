import React from "react";
import { Blogs } from "./Blogs";
import { Entertainment } from "./Entertainment";
import { SlideNews } from '../News/SlideNews';
import Link from 'next/link'

export function Slide({latestnews, latestentertainments, Alllatestblogs }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full bg-slate-100 dark:bg-slate-700 overflow-hidden px-0 lg:px-32 py-10">
        <h1 className={`text-lg mb-3 lg:mb-10 font-bold md:text-2xl text-center lg:text-5xl text-black dark:text-white opacity-100`}>
          News
        </h1>
        <SlideNews allnews={latestnews} />
        <div className="w-full flex items-center justify-center">
          <Link href="/News">
            <a className="mb-10 text-lg lg:text-2xl mt-10 lg:mt-20 text-white bg-[#009688] hover:bg-opacity-50 font-bold p-5 border rounded-2xl">More News</a>
          </Link>
        </div>
      </div>
      <div  className="w-full h-full overflow-hidden py-10">
        <Entertainment latestentertainments={latestentertainments} />
      </div>

      <div className="w-full h-full overflow-hidden">
        <Blogs blogs={Alllatestblogs} />
      </div>
    </div>
  );
}
