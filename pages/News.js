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
import AboutUsImage2 from '../public/images/bgImage2.avif';
import AboutUsImage3 from '../public/images/bgImage3.avif';
import AboutUsImage4 from '../public/images/bgImage4.avif';
import moment from 'moment';

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
    Image:data.Image,
    ShortDescription:data.ShortDescription,
    Description:data.Description,
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
  return (
    <React.Fragment>
      <MainHeader title="News" />
      <section className="w-full h-full bg-white dark:!bg-slate-700 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col py-32 !px-3">
          <h1 className="text-center text-3xl lg:text-7xl font-bold my-10 italic">Trending</h1>
          <Slider {...settings}>
            {allnews.map((data,index)=>(
              <div className="!flex flex-col lg:flex-row px-2 w-full h-full lg:h-96 ">
                  <div className="w-full lg:w-1/2 h-52 lg:!h-96 relative">
                    <Image
                      src={AboutUsImage1}
                      layout="fill" 
                      className="!bg-cover w-full !h-full border rounded-xl"
                      alt="latest news image"
                    />
                  </div>

                  <div className="w-full lg:w-3/4 flex flex-col lg:mx-10 lg:pl-5">
                    <h3 className="mb-5">
                      <span className="text-lg lg:text-2xl font-bold dark:text-white text-black"> Category Name </span>
                      <span className="font-normal text-md lg:text-lg dark:text-white text-gray-600">
                         - Date of the post
                      </span>
                    </h3>

                    <h1 className="text-xl lg:text-4xl font-extrabold dark:text-white text-black tracking-wide leading-snug lg:w-3/4">
                      Your most customers are your greater source of learning.
                    </h1>

                    <p className="mt-5 leading-loose font-sans text-sm lg:text-lg font-medium tracking-wide text-left dark:text-white text-slate-700">
                      {`So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my 
                      way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of 
                      all living things but I tell you Jerry at that moment, I was a marine biologist.`}
                    </p>
                  </div>
              </div>
            ))}
          </Slider>

          <div className="bg-white dark:bg-slate-700 py-5 px-3 lg:px-10 w-full h-full">      
            <h1 className="text-center text-3xl lg:text-5xl font-bold my-5 italic">Latest News</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-10 mb-5 w-full h-full">
              {allnews.map((data,index)=>(
                <button 
                  key={index} 
                  onClick = {()=>{
                    router.push({
                      pathname:"/DisplayNews",
                      query:{news_id:data.news_id}
                    })
                  }}
                  className="flex flex-col w-full h-full lg:mt-20 float-right"
                >
                  <Image
                    src={data.Image}
                    width={200}
                    height={200} 
                    className="!bg-cover w-full !h-64 border rounded-xl"
                    alt="latest news image"
                  />
                  <div className="w-full flex flex-col my-5">
                    <h3 className="my-5">
                      <span className="text-md lg:text-lg font-bold dark:text-white text-black"> Category Name </span>
                      <span className="font-normal text-sm lg:text-md dark:text-white text-gray-600">
                        {moment(data.CreatedDate).utc().format('YYYY-MM-DD')}
                      </span>
                    </h3>

                    <h1 className="text-lg lg:text-2xl font-extrabold dark:text-white text-black tracking-wide leading-snug">
                      {data.Header}
                    </h1>

                    <div  className="news_header !text-black dark:news_text mt-5 " dangerouslySetInnerHTML={{ __html: data.ShortDescription }} />
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
