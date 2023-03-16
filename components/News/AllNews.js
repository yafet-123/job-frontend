import React, {useState} from "react";
import Image from 'next/future/image'
import moment from 'moment';
import { useRouter } from 'next/router'

export function AllNews({allnews}) {
  const router = useRouter()
  return (
    <div className="py-5 w-full h-full">      
      <h1 className="text-center text-xl lg:text-4xl font-bold my-5">Latest News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-10 mb-5 w-full h-full">
        {allnews.map(({news_id, CreatedDate, Header, ShortDescription, image, Category},index)=>(
          <button 
            key={index} 
            onClick = {()=>{
              router.push({
                pathname:"/DisplayNews",
                query:{news_id:news_id}
              })
            }}
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

            <div className="w-full flex flex-col text-left py-5">
              <div className="flex flex-row justify-between items-center mb-5">
                <h3 className="flex flex-col justify-between w-[60%]">
                  { Category.map((data,index)=>(
                    <span key={index} className="text-lg lg:text-xl font-bold dark:text-white text-black mb-3">
                      {data.NewsCategory.CategoryName}
                    </span>
                  ))}
                </h3>
                <h3 className="text-left font-normal text-sm lg:text-md dark:text-slate-300 text-slate-600">
                  {moment(CreatedDate).utc().format('MMMM, Do YYYY')}
                </h3>
              </div>

              <h1 className="group-hover:underline text-lg lg:text-2xl font-extrabold dark:text-slate-300 text-slate-600 tracking-wide leading-snug">
                {Header}
              </h1>

              <div  className="!text-black mt-5 ql-editor ql-snow ql-video " dangerouslySetInnerHTML={{ __html: ShortDescription }} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
