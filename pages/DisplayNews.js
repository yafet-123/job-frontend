import React,{useState,useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { prisma } from '../util/db.server.js'
import { DisplayIndvidualNews } from '../components/News/DisplayIndvidualNews';
import { DisplayLatestNews } from '../components/News/DisplayLatestNews';
import Head from 'next/head';

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
  const findCategory = []
  for(let i=0; i< newsCategory.length;i++){
    findCategory.push(
      Number(newsCategory[i].NewsCategory?.category_id)
    )
  }

  const dataForCategoryNews = await prisma.NewsCategoryRelationship.findMany({
    where:{
        NewsCategory:{
          category_id:{
            in:findCategory
          }
        }
    },
    include:{
      User:{
        select:{
          UserName:true
        }
      },
      News:true,
      NewsCategory:true
    }
  });

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

  const AllcategoryNews = dataForCategoryNews.map((data)=>({
    News:data.News
  }))

  const uniqueallcategoryNews = [...new Map(AllcategoryNews.map(v => [v.News.news_id,v])).values()]
  console.log(uniqueallcategoryNews)

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
      AllcategoryNews:JSON.parse(JSON.stringify(uniqueallcategoryNews)),
      
    }
  }
}

export default function DisplayNews({ news,Alllatestnews, AllcategoryNews, newsCategory}) {
  const router = useRouter()
  return (
  	<React.Fragment>
      <Head>
        <title>Hulu Media : Display News</title>
        <meta property="og:url" content={`https://job-frontend-main.vercel.app${router.asPath}`}/>
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="1233665570615472" />
        <meta
          property="og:title"
          content="Hulu Media : Display News"
        />
        <meta name="twitter:card" content={news.ShortDescription} />
        <meta
          property="og:description"
          content={news.ShortDescription}
        />
        <meta property="og:image" content={news.Image} />
        <meta property="og:image:secure_url" content={news.Image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="300" />
      </Head>
	    <section className="flex flex-col lg:flex-row w-full h-full px-1 lg:pl-80 lg:px-32 bg-[#e6e6e6] dark:bg-[#02201D] pt-32">
	      <DisplayIndvidualNews news={news} AllcategoryNews={AllcategoryNews} newsCategory={newsCategory} shareUrl={router.asPath} quotes={news.ShortDescription} />
        <DisplayLatestNews Alllatestnews={Alllatestnews} />          
	    </section>
	  </React.Fragment>
  );
}
