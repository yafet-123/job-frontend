import Link from "next/link";
import React, {useState,useRef} from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import moment from 'moment'
import { useRouter } from 'next/router' 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Share} from '../common/Share.js'
import Image from 'next/future/image'
import { AiOutlineShareAlt, AiOutlineEye } from 'react-icons/ai'

export function Entertainment({latestentertainments}) {
  var settings = {
    dots: true,
    lazyLoad: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
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
    <section className="w-full h-full lg:h-[50rem] px-3 lg:px-10 lg:py-10  bg-[#e6e6e6] dark:bg-[#02201D] flex flex-col brightness-100 py-10">
      <h1 className={`px-3 lg:px-0 text-lg mb-3 lg:mb-10 font-bold md:text-2xl text-center lg:text-5xl text-black dark:text-white opacity-100`}>
        Entertainment
      </h1>

      <Slider {...settings}>
        {latestentertainments.map(({entertainment_id, CreatedDate, Header, ShortDescription, image, Category, view},index)=>(
          <div 
            key={index}
            id={Header}
            className="!flex flex-col lg:flex-row px-2 w-full h-full lg:mt-5 py-5"
          >
            <div className="w-full lg:w-[40%] h-52 lg:!h-96 relative">
              <Image
                src={image}
                fill
                className="!bg-cover w-full !h-full border rounded-xl"
                alt="latest news image"
              />
            </div>

            <div className="w-full lg:w-[60%] flex flex-col justify-between lg:mx-10 my-10 text-left ">
              <button 
                onClick = {()=>{
                  router.push({
                    pathname:"/Entertemiment/Display",
                    query:{entertainment_id:entertainment_id}
                  })
                }}
                className="flex flex-col justify-between w-full h-full group"
              >
                <div className="flex flex-row justify-between mb-5 w-full ">
                  <h3 className="flex flex-col justify-between">
                    { Category.map((data,index)=>(
                      <span key={index} className="text-left text-xs lg:text-sm font-bold dark:text-white text-slate-600 mb-2 group-hover:text-lg group-hover:text-[#009688]">
                        {data.EntertainmentCategory.CategoryName}
                      </span>
                    ))}
                  </h3>
                </div>
                <h1 className="group-hover:underline text-left text-xl lg:text-2xl font-extrabold text-slate-600 dark:text-[#009688] tracking-wide leading-snug w-full group-hover:text-3xl group-hover:text-[#009688]">
                  {Header}
                </h1>
                <div  className="!bg-transparent !text-left !text-black dark:!text-white mt-5 w-full group-hover:text-2xl group-hover:text-[#009688] " dangerouslySetInnerHTML={{ __html: ShortDescription }} />
              </button>

              <div className="flex items-center justify-between text-sm py-5"> 
                <h3 className="text-left font-normal text-sm lg:text-md dark:text-white text-slate-600">
                  {moment(CreatedDate).utc().format('MMMM, Do YYYY')}
                </h3>

                <button
                    onClick = {()=>{
                      router.push({
                        pathname:"/Entertemiment/Display",
                        query:{entertainment_id:entertainment_id}
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

      <div className="w-full flex items-center justify-center">
        <Link href="/Entertemiment">
          <a className="mb-10 text-lg lg:text-2xl mt-10 lg:mt-20 text-white bg-[#009688] hover:bg-opacity-50 font-bold p-5 border rounded-2xl">More Entertainment</a>
        </Link>
      </div>

      {viewmodalOn && 
        <Share setviewModalOn={setviewModalOn} shareUrl={shareUrl} id={id} quote={quotes} />
      }
    </section>
  );
}
