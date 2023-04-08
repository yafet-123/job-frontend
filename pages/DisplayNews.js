import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { prisma } from '../util/db.server.js'
import { MainHeader } from '../components/common/MainHeader';
import { DisplayIndvidualNews } from '../components/News/DisplayIndvidualNews';
import { DisplayLatestNews } from '../components/News/DisplayLatestNews';
 
export async function getServerSideProps(context){
  const {params,req,res,query} = context
  const id = query.news_id

  const updateview = await prisma.News.update({
    where:{news_id : Number(id),},
    data: { view: { increment: 1 }, },
  })
  
	const data = await prisma.News.findUnique({
		where:{
			news_id: Number(id),
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
	
	const onedata = {
    news_id:data.news_id,
    Header:data.Header,
    Image:data.Image,
    ShortDescription:data.ShortDescription,
    Description:data.Description,
    userName:data.User.UserName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate,
  }

  const newsCategory = data.NewsCategoryRelationship

  const latestnews = await prisma.News.findMany({
  	take:-6,
    orderBy: {
      news_id:"desc"
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

  const Alllatestnews = latestnews.map((data)=>({
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
      news:JSON.parse(JSON.stringify(onedata)),
      Alllatestnews:JSON.parse(JSON.stringify(Alllatestnews)),
      newsCategory:JSON.parse(JSON.stringify(newsCategory)),
    }
  }
}

export default function DisplayNews({news,Alllatestnews, newsCategory}) {
  const router = useRouter()
  const shareUrl = router.asPath
  return (
  	<React.Fragment>
      <MainHeader title="Display News" />
	    <section className="flex flex-col lg:flex-row w-full h-full px-1 lg:px-80 bg-[#e6e6e6] dark:bg-[#02201D] pt-32">
	      <DisplayIndvidualNews news={news} newsCategory={newsCategory} shareUrl={shareUrl} />
        <DisplayLatestNews Alllatestnews={Alllatestnews}/>          
	    </section>
	  </React.Fragment>
  );
}
