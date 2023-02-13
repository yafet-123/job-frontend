import React from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/router'
import { prisma } from '../util/db.server.js'
import moment from 'moment'
import { MainHeader } from '../components/MainHeader';
import Image from 'next/image'

export async function getServerSideProps(context){
  const {params,req,res,query} = context
  const id = query.news_id

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
    Category:data.NewsCategoryRelationship
  }

  const latestnews = await prisma.News.findMany({
  	take:-5,
    orderBy: {
      ModifiedDate:"asc"
    }
  });

  const Alllatestnews = latestnews.map((data)=>({
    news_id:data.news_id,
    Header:data.Header,
    Image:data.Image,
    ShortDescription:data.ShortDescription,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate
  }))

  return{
    props:{
      news:JSON.parse(JSON.stringify(onedata)),
      Alllatestnews:JSON.parse(JSON.stringify(Alllatestnews))
    }
  }
}

export default function DisplayNews({news,Alllatestnews}) {
  return (
  	<React.Fragment>
      <MainHeader title="Display News" />
	    <section className="flex flex-col lg:flex-row w-full h-full px-0 md:px-32 bg-gray-200 dark:bg-slate-700 p-5 pt-32">
	      	<div className="flex flex-col flex-1 p-5 pb-20 w-full lg:w-3/4">

	      		<h1 className="text-lg lg:text-2xl font-extrabold dark:text-white text-black tracking-wide leading-snug mb-5">
              {news.Header}
            </h1>

            <div className="w-full h-52 lg:!h-96 relative px-20">
              <Image
                src={news.Image}
                layout="fill" 
                className="!bg-cover w-full !h-full border rounded-xl"
                alt="latest news image"
              />
            </div>

            <div className="w-full flex flex-col my-5">
              <h3 className="my-5">
                <span className="text-md lg:text-lg font-bold dark:text-white text-black"> Category Name </span>
                <span className="font-normal text-sm lg:text-md dark:text-white text-gray-600">
                  {moment(news.CreatedDate).utc().format('YYYY-MM-DD')}
                </span>
              </h3>

              <div className="news_header !text-black dark:news_text mt-5 " dangerouslySetInnerHTML={{ __html: news.Description }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cold-3 gap-5 w-full lg:w-1/4 h-full lg:h-[100rem] border rounded-lg shadow-2xl shadow-sky-200 lg:overflow-y-scroll">
				    {Alllatestnews.map((data, index) => (
				      <Link 
				      	href={{
	         			pathname: '/DisplayNews',
	         			query:{news_id:data.news_id}
	        		}}
				      	key={index}
				      >
				        <a className="flex flex-col mb-5 even:bg-white even:dark:bg-slate-600 px-2 py-5">
				          <div className="w-full h-52 lg:!h-64 relative">
                    <Image
                      src={data.Image}
                      layout="fill"
                      className="!bg-cover w-full !h-full border rounded-xl"
                      alt="latest news image"
                    />
                  </div>

                  <div className="w-full flex flex-col my-5 text-left">
                  	<h1 className="text-lg lg:text-xl font-extrabold dark:text-white text-black tracking-wide leading-snug">
                     	{data.Header}
                    </h1>
                    <h3 className="mt-5 flex justify-between items-center">
                      <span className="text-md lg:text-lg font-bold dark:text-white text-black"> Category Name </span>
                      <span className="font-normal text-sm lg:text-md dark:text-white text-gray-600">
                        {moment(data.CreatedDate).utc().format('YYYY-MM-DD')}
                      </span>
                    </h3>
                  </div>
				        </a>
				      </Link>
				    ))}
				  </div>
	    </section>
	  </React.Fragment>
  );
}
