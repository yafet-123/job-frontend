import React, {useState,useEffect} from "react";
import { MainHeader } from '../components/common/MainHeader';
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
    view:data.view,
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
  const [image , setimage] = useState() 
  const [quotes, setquotes] = useState("")

  return (
    <React.Fragment>
      <MainHeader title="Hulu Media : News" image={image} quotes="shbdckh ksjnd" />
      <section className="w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] overflow-hidden px-0 lg:px-32">
        <div className="max-w-7xl mx-auto flex flex-col py-32 px-2 lg:!px-3">
          <h1 className="text-center text-xl lg:text-5xl font-bold my-10">Trending</h1>
          <SlideNews allnews={allnews} />
          <AllNews allnews={allnews} setimage={setimage} setquotes={setquotes}/>
        </div>
      </section>
    </React.Fragment>
  );
}
