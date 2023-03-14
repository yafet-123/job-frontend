import React from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/router'
import { prisma } from '../util/db.server.js'
import moment from 'moment'
import { MainHeader } from '../components/MainHeader';
import Image from 'next/image'
import 'react-quill/dist/quill.snow.css';

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
  }

  const newsCategory = data.NewsCategoryRelationship

  const latestnews = await prisma.News.findMany({
  	take:-5,
    orderBy: {
      ModifiedDate:"asc"
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
  console.log(newsCategory)
  return (
  	<React.Fragment>
      <MainHeader title="Display News" />
	    <section className="flex flex-col lg:flex-row w-full h-full px-1 lg:px-44 bg-[#ddd0c8] dark:bg-slate-700 pt-32">
	      	<div className="flex flex-col flex-1 p-5 pb-20 w-full lg:w-[70%] px-1 lg:pr-5 lg:pl-32">
	      		<h1 className="text-lg lg:text-2xl font-extrabold dark:text-white text-black tracking-wide leading-snug mb-5">
              {news.Header}
            </h1>

            <div className="px-20 h-52 lg:!h-80 relative ">
              <Image
                src={news.Image == "" || news.Image == null ? "/images/logo2.png" : news.Image}
                layout="fill" 
                className="!bg-cover w-full !h-full border rounded-xl "
                alt="latest news image"
              />
            </div>

            <div className="w-full flex flex-col my-5">
              <div className="flex flex-row justify-between lg:mb-5 px-1 lg:px-2 w-full">
                 <h3 className="flex flex-col justify-between w-2/4">
                  { newsCategory.map((data,index)=>(
                    <span key={index} className="text-sm lg:text-xl font-bold dark:text-white text-black mb-1 lg:mb-5">
                      {data.NewsCategory.CategoryName}
                    </span>
                  ))}
                </h3>
                <h3 className="text-left font-normal text-sm lg:text-lg dark:text-white text-gray-600 w-1/4">
                  {moment(news.CreatedDate).utc().format('MMMM, Do YYYY')}
                </h3>
              </div>

              <div className="ql-editor ql-snow ql-video " dangerouslySetInnerHTML={{ __html: news.Description }} />
            </div>
          </div>

          <div className="sticky top-0 bottom-10 grid grid-cols-1 md:grid-cold-3 gap-5 w-full lg:w-[30%] h-full lg:h-[90rem] border rounded-lg shadow-2xl shadow-sky-200 lg:overflow-y-scroll">
				    {Alllatestnews.map(({news_id, CreatedDate, Header, ShortDescription, image, Category}, index) => (
				      <Link 
				      	href={{
	         			pathname: '/DisplayNews',
	         			query:{news_id:news_id}
	        		}}
				      	key={index}
				      >
				        <a className="flex flex-col mb-5 even:bg-white odd:bg-gray-300 odd:dark:bg-slate-700 even:dark:bg-slate-600 px-2 py-5">
				          <div className="w-full h-52 lg:!h-64 relative">
                    <Image
                      src={image}
                      layout="fill"
                      className="!bg-cover w-full !h-full border rounded-xl"
                      alt="latest news image"
                    />
                  </div>

                  <div className="w-full flex flex-col my-5 text-left">
                  	<h1 className="text-lg lg:text-xl font-extrabold dark:text-white text-black tracking-wide leading-snug">
                     	{Header}
                    </h1>
                    <h3 className="mt-5 flex justify-between items-center">
                      <h3 className="flex flex-col justify-between"> 
                        { Category.map((data,index)=>(
                          <span key={index} className="text-lg lg:text-xl font-bold dark:text-white text-black mb-3">
                            {data.NewsCategory.CategoryName}
                          </span>
                        ))}
                      </h3>
                      <span className="font-normal text-sm lg:text-md dark:text-white text-gray-600">
                        {moment(CreatedDate).utc().format('MMMM, Do YYYY')}
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
