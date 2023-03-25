import React, {useState,useRef} from "react";
import Image from 'next/future/image'
import moment from 'moment';
import { useRouter } from 'next/router'
import {Share} from '../common/Share.js'
import { AiOutlineShareAlt, AiOutlineEye } from 'react-icons/ai'

export function AllNews({allnews}) {
  const router = useRouter()
  const quoteRef = useRef(null)
  const quote = quoteRef.current?.textContent ?? "";
  const [quotes, setquotes] = useState()
  const shareUrl = router.asPath
  const [viewmodalOn, setviewModalOn] = useState(false)
  const [id, setid] = useState()
  const clickedForview = () => {
      setviewModalOn(true)
  }
  return (
    <div className="py-5 w-full h-full">      
      <h1 className="text-center text-xl lg:text-4xl font-bold my-5">Latest News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-10 mb-5 w-full h-full">
        {allnews.map(({news_id, CreatedDate, Header, ShortDescription, image, Category, view},index)=>(
          <div
            id={news_id}
            ref={quoteRef}
            key={index} 
            className="flex flex-col w-full h-full lg:mt-5 group py-5"
          >
            <div className="w-full !h-52 lg:!h-64 relative">
              <Image
                src={image}
                fill
                className="!bg-cover w-full !h-full border rounded-xl"
                alt="latest news image"
              />
            </div>

            <button 
              onClick = {()=>{
                router.push({
                  pathname:"/DisplayNews",
                  query:{news_id:news_id}
                })
              }}
              className="w-full flex flex-col text-left py-5"
            >
              <div className="flex flex-row justify-between items-center mb-5">
                <h3 className="flex flex-col justify-between w-[60%]">
                  { Category.map((data,index)=>(
                    <span key={index} className="text-xs lg:text-sm font-bold dark:text-white text-slate-600 mb-2">
                      {data.NewsCategory.CategoryName}
                    </span>
                  ))}
                </h3>
                <h3 className="text-left font-normal text-sm lg:text-md dark:text-white text-slate-600">
                  {moment(CreatedDate).utc().format('MMMM, Do YYYY')}
                </h3>
              </div>

              <h1 className="group-hover:underline text-lg lg:text-2xl font-extrabold dark:text-[#009688] text-slate-600 tracking-wide leading-snug">
                {Header}
              </h1>

              <div  className="bg-transparent text-black dark:!text-white mt-5 ql-editor ql-snow ql-video " dangerouslySetInnerHTML={{ __html: ShortDescription }} />
            </button>

            <div className="flex items-center justify-between text-sm"> 
              <p className="flex flex-row items-center text-black dark:text-white hover:text-[#009688] font-bold py-2 px-4 hover:scale-110 duration-1000 ease-in-out rounded ">
                <AiOutlineEye size={32} />
                <span className="ml-3">{view}</span>
              </p>

              <button
                  onClick={() => {
                      clickedForview()
                      setid(Header)
                      setquotes(quote)
                  }} 
                  className="text-black dark:text-white hover:text-[#009688] font-bold py-2 px-4 hover:scale-110 duration-1000 ease-in-out rounded ">
                  <AiOutlineShareAlt size={32} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {viewmodalOn && 
        <Share setviewModalOn={setviewModalOn} shareUrl={shareUrl} id={id} quote={quotes} />
      }
    </div>
  );
}
