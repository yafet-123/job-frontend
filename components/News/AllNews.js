import React, {useState,useRef} from "react";
import Image from 'next/future/image'
import moment from 'moment';
import { useRouter } from 'next/router'
import {Share} from '../common/Share.js'
import { AiOutlineShareAlt, AiOutlineEye } from 'react-icons/ai'
import Link from 'next/link'

export function AllNews({allnews , setimage, setquotes}) {
  const router = useRouter()
  const quoteRef = useRef(null)
  const shareUrl = router.asPath
  const [viewmodalOn, setviewModalOn] = useState(false)
  const [id, setid] = useState()
  const clickedForview = () => {
      setviewModalOn(true)
  } 

  return (
    <div className="py-5 w-full h-full">      
      <div className="allListGrid">
        {allnews.map(({news_id, CreatedDate, Header, ShortDescription, image, Category, view},index)=>(
          <Link key={index} 
            href={`/DisplayNews?news_id=${news_id}`}
          >
            <a className="group">
              <div className="relative">
                <Image src={image} fill className="!bg-cover w-full !h-full border rounded-xl" alt="latest news image"/>
              </div>
              <div className="flex flex-col justify-between mt-5">
                <h1 className="allListHeader group-hover:text-[#009688] text-left group-hover:underline font-extrabold dark:text-[#009688] text-slate-600 tracking-wide leading-snug">
                  {Header}
                </h1>
                <div  className="allListshortdescription flex flex-col w-full group-hover:text-[#009688] bg-transparent text-black dark:!text-white" dangerouslySetInnerHTML={{ __html: ShortDescription }} />
                <div className="w-full flex flex-row justify-between items-center px-2 mt-5">
                  <h3 className="text-left font-normal text-sm lg:text-md dark:text-white text-slate-600">
                    {moment(CreatedDate).utc().format('MMMM, Do YYYY')}
                  </h3>


                  <p className="flex flex-row items-center text-black dark:text-white hover:text-[#009688] font-bold py-2 hover:scale-110 duration-1000 ease-in-out rounded ">
                    <AiOutlineEye size={20} />
                    <span className="ml-3 text-xs">{view}</span>
                  </p>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>

      {viewmodalOn && 
        <Share setviewModalOn={setviewModalOn} shareUrl={shareUrl} id={id} />
      }
    </div>
  );
}
