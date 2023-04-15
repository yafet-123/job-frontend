import React, {useState,useRef} from "react";
import Image from 'next/future/image'
import moment from 'moment';
import { useRouter } from 'next/router'
import {Share} from '../common/Share.js'
import { AiOutlineShareAlt, AiOutlineEye } from 'react-icons/ai'

export function AllBlogs({allblogs,categories}) {
  const router = useRouter()
  const { category_id } = router.query
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
      <div className="flex flex-col justify-between shadow-2xl shadow-zinc-900 bg-[#e6e6e6] dark:bg-[#02201D]">
        <ul className="flex flex-row items-center px-2 gap-3 lg:gap-10 w-full sticky top-0 bottom-0 scroll_width">
          <li className='flex text-center gap-2 transition-none cursor-pointer whitespace-nowrap hover:text-gray-600'>
            <button 
              onClick = {()=>{
                router.push({
                  pathname:"/Blogs" 
                })
              }}
                className={ router.pathname == "/Blogs" ? 'text-center bg-[#009688] dark:bg-[#009688] px-2 py-3 w-full text-center text-white font-bold flex': 'text-center w-full text-black dark:text-white hover:text-[#009688] hover:text-center hover:bg-white dark:hover:bg-[#009688] px-2 py-3 font-bold flex' }
            >
              Dashboard
            </button>
          </li>
          {categories.map((item, index) => (
            <li className='flex text-center transition-none cursor-pointer whitespace-nowrap hover:text-gray-600 w-full' key={index}>
              <button 
                onClick = {()=>{
                  router.push({
                    pathname:"/Blog",
                    query:{category_id:item.category_id}
                  })
                }}
                className={ item.category_id == category_id ? 'text-center bg-[#009688] dark:bg-[#009688] py-3 w-full text-center text-white font-bold flex': 'text-center w-full text-black dark:text-white hover:text-[#009688] hover:text-center hover:bg-white dark:hover:bg-[#009688] px-2 py-3 font-bold flex' }
              >
                {item.CategoryName}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-10 mb-5 w-full h-full">
        {allblogs.map(({blogs_id, CreatedDate, Header, ShortDescription, image, Category, view},index)=>(
          <div key={index}>
            <button
              onClick = {()=>{
                router.push({
                  pathname:"/DisplayBlogs",
                  query:{blogs_id:blogs_id}
                })
              }}
              id={blogs_id} ref={quoteRef} key={index}  className="flex flex-col w-full lg:mt-5 group pt-5"
            >
              <div className="w-full !h-52 lg:!h-96 relative">
                <Image src={image} fill className="!bg-cover w-full !h-full" alt="latest news image"/>
              </div>

              <div className="w-full flex flex-col text-left py-5">
                <div className="flex flex-row justify-between items-center w-full mb-5">
                  <h3 className="flex flex-col justify-between w-full">
                    { Category.map((data,index)=>(
                      <span key={index} className="group-hover:text-xs group-hover:text-[#009688] text-xs lg:text-sm font-bold dark:text-white text-slate-600 mb-2">
                        {data.BlogsCategory.CategoryName}
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

                <div className="group-hover:text-xl group-hover:text-[#009688] bg-transparent text-black dark:!text-white mt-5 ql-editor ql-snow ql-video" dangerouslySetInnerHTML={{ __html: ShortDescription }} />
              </div>
            </button>
            <div className="flex items-center justify-between text-sm"> 
              <p className="flex flex-row items-center text-black dark:text-white hover:text-[#009688] font-bold py-2 px-4 hover:scale-110 duration-1000 ease-in-out rounded ">
                <AiOutlineEye size={32} />
                <span className="ml-3">{view}</span>
              </p>

              <button
                onClick={() => {
                  clickedForview()
                  setid(blogs_id)
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
