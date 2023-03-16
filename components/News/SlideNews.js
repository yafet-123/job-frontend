import React, {useState} from "react";
import Image from 'next/future/image'
import moment from 'moment';
import { useRouter } from 'next/router'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  return (
    <Slider {...settings}>
      {allnews.map(({news_id, CreatedDate, Header, ShortDescription, image, Category},index)=>(
        <button 
          key={index} 
          onClick = {()=>{
            router.push({
              pathname:"/DisplayNews",
              query:{news_id:news_id}
            })
          }}
          className="!flex flex-col lg:flex-row px-2 w-full h-full lg:mt-5 group py-5"
        >
          <div className="w-full lg:w-1/2 h-52 lg:!h-96 relative">
            <Image
              src={image}
              fill
              className="!bg-cover w-full !h-full border rounded-xl"
              alt="latest news image"
            />
          </div>

          <div className="w-full lg:w-3/4 flex flex-col lg:mx-10 py-10 text-left">
            <div className="flex flex-row justify-between mb-5">
              <h3 className="flex flex-col justify-between">
                { Category.map((data,index)=>(
                  <span key={index} className="text-xs lg:text-sm font-bold dark:text-white text-slate-600 mb-2">
                    {data.NewsCategory.CategoryName}
                  </span>
                ))}
              </h3>
              <h3 className="text-md lg:text-lg text-[#444444] font-bold">
                {moment(CreatedDate).utc().format('YYYY-MM-DD')}
              </h3>
            </div>
            <h1 className="group-hover:underline text-xl lg:text-2xl font-extrabold text-[#444444] tracking-wide leading-snug w-full lg:w-3/4">
              {Header}
            </h1>
            <div  className="!text-black mt-5 w-full " dangerouslySetInnerHTML={{ __html: ShortDescription }} />
          </div>
        </button>
      ))}
    </Slider>
  );
}
