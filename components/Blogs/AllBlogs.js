import React, {useState,useRef} from "react";
import Image from 'next/future/image'
import moment from 'moment';
import { useRouter } from 'next/router'
import {Share} from '../common/Share.js'
import { AiOutlineShareAlt, AiOutlineEye } from 'react-icons/ai'
import Link from 'next/link'

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
                    pathname:"/Blogs/Category",
                    query:{category_id:item.category_id}
                  })
                }}
                className={ item.category_id == category_id ? 'px-2 text-center bg-[#009688] dark:bg-[#009688] py-3 w-full text-center text-white font-bold flex': 'text-center w-full text-black dark:text-white hover:text-[#009688] hover:text-center hover:bg-white dark:hover:bg-[#009688] px-2 py-3 font-bold flex' }
              >
                {item.CategoryName}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="allListGrid mt-10">
        {allblogs.map(({blogs_id, CreatedDate, Header, ShortDescription, image, Category, view},index)=>(
          <Link key={index} 
            href={`/Blogs/Display?blogs_id=${blogs_id}`}
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
    </div>
  );
}
