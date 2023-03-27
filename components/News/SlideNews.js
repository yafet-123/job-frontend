import React, {useState,useRef} from "react";
import Image from 'next/future/image'
import moment from 'moment';
import { useRouter } from 'next/router'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Share} from '../common/Share.js'
import { AiOutlineShareAlt, AiOutlineEye } from 'react-icons/ai'

export function SlideNews({allnews}) {
  var settings = {
    dots: true,
    lazyLoad: true,
    fade: true,
    infinite: true,
    autoplay: true,
    // speed: 2000,
    // autoplaySpeed: 2000,
    // slidesToScroll: 1,
    autoplay: true
  };
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
    <div>
      <Slider {...settings} className="">
        {allnews.map(({news_id, CreatedDate, Header, ShortDescription, image, Category, view},index)=>(
          <div 
            key={index}
            id={Header}
            className="!flex flex-col lg:flex-row px-2 w-full h-full lg:mt-5 py-5"
          >
            <div className="w-full lg:w-1/2 h-52 lg:!h-96 relative">
              <Image
                src={image}
                fill
                className="!bg-cover w-full !h-full border rounded-xl"
                alt="latest news image"
              />
            </div>

            <div className="w-full lg:w-3/4 flex flex-col justify-between lg:mx-10 py-10 text-left group">
              <button 
                onClick = {()=>{
                  router.push({
                    pathname:"/DisplayNews",
                    query:{news_id:news_id}
                  })
                }}
                className="flex flex-col justify-between w-full"
              >
                <div className="flex flex-row justify-between mb-5 w-full">
                  <h3 className="flex flex-col justify-between">
                    { Category.map((data,index)=>(
                      <span key={index} className="text-left text-xs lg:text-sm font-bold dark:text-white text-slate-600 mb-2">
                        {data.NewsCategory.CategoryName}
                      </span>
                    ))}
                  </h3>
                  <h3 className="text-md lg:text-lg text-slate-600 dark:text-white font-bold">
                    {moment(CreatedDate).utc().format('YYYY-MM-DD')}
                  </h3>
                </div>
                <h1 className="group-hover:underline text-left text-xl lg:text-2xl font-extrabold text-slate-600 dark:text-[#009688] tracking-wide leading-snug w-full">
                  {Header}
                </h1>
                <div  className="!bg-transparent !text-left !text-black dark:!text-white mt-5 w-full " dangerouslySetInnerHTML={{ __html: ShortDescription }} />
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
          </div>
        ))}
      </Slider>

      {viewmodalOn && 
        <Share setviewModalOn={setviewModalOn} shareUrl={shareUrl} id={id} quote={quotes} />
      }

    </div>
  );
}
