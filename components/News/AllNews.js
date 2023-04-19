import React, {useState,useRef} from "react";
import Image from 'next/future/image'
import moment from 'moment';
import { useRouter } from 'next/router'
import {Share} from '../common/Share.js'
import { AiOutlineShareAlt, AiOutlineEye } from 'react-icons/ai'

export function AllNews({allnews , setimage}) {
  const router = useRouter()
  const quoteRef = useRef(null)
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
          <div key={index}>
            <button 
              onClick = {()=>{
                router.push({
                  pathname:"/DisplayNews",
                  query:{news_id:news_id}
                })
              }}
              id={news_id} ref={quoteRef} className="flex flex-col w-full lg:mt-5 group pt-5"
            >
              <div className="w-full !h-52 lg:!h-96 relative">
                <Image src={image} fill className="!bg-cover w-full !h-full border rounded-xl" alt="latest news image"/>
              </div>

              <div className="w-full flex flex-col text-left py-5">
                <div className="flex flex-row justify-between items-center w-full mb-5">
                  <h3 className="flex flex-col justify-between w-full">
                    { Category.map((data,index)=>(
                      <span key={index} className="group-hover:text-xs group-hover:text-[#009688] text-xs lg:text-sm font-bold dark:text-white text-slate-600 mb-2 w-full">
                        {data.NewsCategory.CategoryName}
                      </span>
                    ))}
                  </h3>
                  <h3 className="group-hover:text-xs group-hover:text-[#009688] text-left font-normal text-sm lg:text-md dark:text-white text-slate-600">
                    {moment(CreatedDate).utc().format('MMMM, Do YYYY')}
                  </h3>
                </div>

                <h1 className="group-hover:text-3xl group-hover:text-[#009688] group-hover:underline text-lg lg:text-2xl font-extrabold dark:text-[#009688] text-slate-600 tracking-wide leading-snug">
                  {Header}
                </h1>

                <div  className="group-hover:text-xl group-hover:text-[#009688] bg-transparent text-black dark:!text-white mt-10" dangerouslySetInnerHTML={{ __html: ShortDescription }} />
              </div>
            </button>

            <div className="flex items-center justify-between text-sm"> 
              <p className="flex flex-row items-center text-black dark:text-white hover:text-[#009688] font-bold py-2 hover:scale-110 duration-1000 ease-in-out rounded ">
                <AiOutlineEye size={32} />
                <span className="ml-3">{view}</span>
              </p>

              <button
                  onClick={() => {
                      clickedForview()
                      setid(news_id)
                      setquotes(quoteRef.current?.textContent)
                      setimage(image)
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
