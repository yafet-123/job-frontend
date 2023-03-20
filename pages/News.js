import React from "react";
import { MainHeader } from '../components/MainHeader';
import { AllNews } from '../components/News/AllNews';
import { SlideNews } from '../components/News/SlideNews';
import { prisma } from '../util/db.server.js'

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
  return (
    <React.Fragment>
      <MainHeader title="News" />
      <section className="w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] overflow-hidden px-0 lg:px-32">
        <div className="max-w-7xl mx-auto flex flex-col py-32 !px-3">
          <h1 className="text-center text-xl lg:text-5xl font-bold my-10">Trending</h1>
          <SlideNews allnews={allnews} />
          <AllNews allnews={allnews}/>
        </div>
      </section>
    </React.Fragment>
  );
}
