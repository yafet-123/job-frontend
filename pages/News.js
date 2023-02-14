import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NewsTemplate } from "../data/NewsTemplate.js"
import { MainHeader } from '../components/MainHeader';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { prisma } from '../util/db.server.js'
import AboutUsImage1 from '../public/images/bgImage1.avif';
import moment from 'moment';
import { useRouter } from 'next/router'

export async function getServerSideProps(context){
  const news = await prisma.News.findMany({
    orderBy : {
      ModifiedDate:'desc'
    },
    include:{
      User:{
        select:{
          UserName:true
        }
      },
      NewsCategoryRelationship:{
        include:{
          NewsCategory:{
            select:{
              category_id:true,
              CategoryName:true
            }
          }
        }
      },
    }
  });

  const allnews = news.map((data)=>({
    news_id:data.news_id,
    Header:data.Header,
    image:data.Image,
    ShortDescription:data.ShortDescription,
    userName:data.User.UserName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate,
    Category:data.NewsCategoryRelationship
  }))

  return{
    props:{
      allnews:JSON.parse(JSON.stringify(allnews)),
    }
  }
}

export default function News({allnews}) {
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
  console.log(allnews[0].Category[0].NewsCategory.CategoryName)
  console.log(allnews)
  return (
    <React.Fragment>
      <MainHeader title="News" />
      <section className="w-full h-full bg-white dark:!bg-slate-600 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col py-32 !px-3">
          <h1 className="text-center text-xl lg:text-5xl font-bold my-10">Trending</h1>
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
                    layout="fill"
                    className="!bg-cover w-full !h-full border rounded-xl"
                    alt="latest news image"
                  />
                </div>

                <div className="w-full lg:w-3/4 flex flex-col lg:mx-10 py-10 text-left">
                  <div className="flex flex-row justify-between mb-5">
                    <h3 className="flex flex-col justify-between">
                      { Category.map((data,index)=>(
                        <span key={index} className="text-lg lg:text-xl font-bold dark:text-white text-black mb-5">
                          {data.NewsCategory.CategoryName}
                        </span>
                      ))}
                    </h3>
                    <h3 className="font-normal text-md lg:text-lg dark:text-white text-gray-600">
                      {moment(CreatedDate).utc().format('YYYY-MM-DD')}
                    </h3>
                  </div>

                  <h1 className="group-hover:underline text-xl lg:text-2xl font-extrabold dark:text-white text-black tracking-wide leading-snug w-full lg:w-3/4">
                   {Header}
                  </h1>

                  <div  className="!text-black mt-5 w-full " dangerouslySetInnerHTML={{ __html: ShortDescription }} />
                </div>
              </button>
            ))}
          </Slider>

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
                  <div className="w-full h-52 lg:!h-64 relative">
                    <Image
                      src={image}
                      layout="fill"
                      className="!bg-cover w-full !h-full border rounded-xl"
                      alt="latest news image"
                    />
                  </div>

                  <div className="w-full flex flex-col text-left py-5">
                    <div className="flex flex-row justify-between mb-5">
                      <h3 className="flex flex-col justify-between">
                        { Category.map((data,index)=>(
                          <span key={index} className="text-lg lg:text-xl font-bold dark:text-white text-black mb-3">
                            {data.NewsCategory.CategoryName}
                          </span>
                        ))}
                      </h3>
                      <h3 className="font-normal text-sm lg:text-md dark:text-slate-300 text-slate-600">
                        {moment(CreatedDate).utc().format('YYYY-MM-DD')}
                      </h3>
                    </div>

                    <h1 className="group-hover:underline text-lg lg:text-2xl font-extrabold dark:text-slate-300 text-slate-600 tracking-wide leading-snug">
                      {Header}
                    </h1>

                    <div  className="!text-black mt-5 " dangerouslySetInnerHTML={{ __html: ShortDescription }} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
