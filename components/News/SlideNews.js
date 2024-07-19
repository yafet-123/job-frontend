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
    <section>
      <Slider {...settings} className="">
        {allnews.map(({news_id, CreatedDate, Header, ShortDescription, image, Category, view},index)=>(
          <div 
            key={index}
            id={Header}
            className="!flex flex-col lg:flex-row px-2 w-full h-full lg:mt-5 py-5"
          >
            <div className="w-full lg:w-[40%] !h-52 lg:!h-96 relative">
              <Image
                src={image}
                fill
                className="!bg-cover w-full !h-full border rounded-xl"
                alt="latest news image"
              />
            </div>

            <div className="w-full lg:w-[60%] flex flex-col justify-between lg:mx-10 py-10 text-left">
              <button 
                onClick = {()=>{
                  router.push({
                    pathname:"/News/Display",
                    query:{news_id:news_id}
                  })
                }}
                className="flex flex-col justify-between w-full h-full group"
              >
                <div className="flex flex-row justify-between mb-5 w-full">
                  <h3 className="flex flex-col justify-between">
                    { Category.map((data,index)=>(
                      <span key={index} className="text-left text-xs lg:text-sm font-bold dark:text-white text-slate-600 mb-2 group-hover:text-lg group-hover:text-[#009688]">
                        {data.CategoryName}
                      </span>
                    ))}
                  </h3>
                </div>
                <h1 className="group-hover:underline text-left text-xl lg:text-2xl font-extrabold text-slate-600 dark:text-[#009688] tracking-wide leading-snug w-full group-hover:text-3xl group-hover:text-[#009688]">
                  {Header}
                </h1>
                <div  className="group-hover:text-2xl group-hover:text-[#009688] !bg-transparent !text-left !text-black dark:!text-white mt-5 w-full " dangerouslySetInnerHTML={{ __html: ShortDescription }} />
              </button>

              <div className="flex items-center justify-between text-sm my-5"> 
                <h3 className="text-left font-normal text-sm lg:text-md dark:text-white text-slate-600">
                  {moment(CreatedDate).utc().format('MMMM, Do YYYY')}
                </h3>

                <button
                    onClick = {()=>{
                      router.push({
                        pathname:"/News/Display",
                        query:{news_id:news_id}
                      })
                    }}
                    className="text-sm lg:text-lg text-white bg-[#009688] hover:bg-opacity-50 font-bold px-3 py-4 border rounded-2xl">
                    Read More
                </button>

                <p className="flex flex-row items-center text-black dark:text-white hover:text-[#009688] font-bold py-2 hover:scale-110 duration-1000 ease-in-out rounded ">
                  <AiOutlineEye size={30} />
                  <span className="ml-3 text-xs">{view}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {viewmodalOn && 
        <Share setviewModalOn={setviewModalOn} shareUrl={shareUrl} id={id} quote={quotes} />
      }

    </section>
  );
}
