import { Hero } from "../components/Home/Hero";
import { LatestJobs } from "../components/Home/LatestJobs";
import { SearchJobs } from "../components/Home/SearchJobs";
import { Blogs } from "../components/Home/Blogs";
import { SlideNews } from '../components/News/SlideNews';
import React from 'react'
import { prisma } from '../util/db.server.js'
import { MainHeader } from '../components/MainHeader';
import { useSession } from "next-auth/react";
import Link from 'next/link'

export async function getStaticProps(){
  const locations = await prisma.Location.findMany({
    include:{
       _count:{
        select:{
          Job:true
        }
      },
    }
  });
  const categories = await prisma.Category.findMany({
    include:{
       _count:{
        select:{
          JobCategory:true
        }
      },
    }
  });
  const latestjobs = await prisma.Job.findMany({ 
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

      Location:{
        select:{
          LocationName:true
        }
      }
    } 
  });
  
  const news = await prisma.News.findMany({
    take:-5,
    orderBy : {
      CreatedDate:'desc'
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

  const latestnews = news.map((data)=>({
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

  const Alllatestjobs = latestjobs.map((data)=>({
    job_id:data.job_id,
    CompanyName:data.CompanyName,
    Image:data.Image,
    JobsType:data.JobsType,
    Location:data.Location.LocationName,
    CareerLevel:data.CareerLevel,
    EmploymentType:data.EmploymentType,
    Salary:data.Salary,
    JobsDescreption:data.JobsDescreption,
    JobsRequirement:data.JobsRequirement,
    DeadLine:data.DeadLine,
    Apply:data.Apply,
    location_id:data.location_id,
    userName:data.User.UserName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate
  }))
  
  const latestreversejob = Alllatestjobs.reverse();

  const latestblogs = await prisma.Blogs.findMany({
    take:-6,
    orderBy: {
      blogs_id:"desc"
    },
    include:{
      User:{
        select:{
          UserName:true
        }
      },
      BlogsCategoryRelationship:{
        include:{
          BlogsCategory:{
            select:{
              category_id:true,
              CategoryName:true
            }
          }
        }
      },
    }
  });

  const Alllatestblogs = latestblogs.map((data)=>({
    blogs_id:data.blogs_id,
    Header:data.Header,
    image:data.Image,
    ShortDescription:data.ShortDescription,
    userName:data.User.UserName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate,
    Category:data.BlogsCategoryRelationship
  }))

  return{
    props:{
      categories:JSON.parse(JSON.stringify(categories)),
      locations:JSON.parse(JSON.stringify(locations)),
      latestjobs:JSON.parse(JSON.stringify(latestreversejob)),
      Alllatestblogs:JSON.parse(JSON.stringify(Alllatestblogs)),
      latestnews:JSON.parse(JSON.stringify(latestnews)),
    }
  }
}

export default function Home({categories, locations, latestjobs, Alllatestblogs, latestnews}) {
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="Hulu Media : Home" />
      <div className="flex flex-col w-full h-full py-0 lg:py-20 pt-32 bg-[#e6e6e6] dark:bg-[#02201D]">
        <Hero />
        <LatestJobs latestjobs={latestjobs} />
        <SearchJobs categories={categories} locations={locations} />
        <Blogs blogs={Alllatestblogs} />
        <div className="w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] overflow-hidden px-0 lg:px-32">
          <h1 className={`text-lg mb-3 lg:mb-10 font-bold md:text-2xl text-center lg:text-5xl text-black dark:text-white opacity-100`}>
            News
          </h1>
          <SlideNews allnews={latestnews} />
          <div className="w-full flex items-center justify-center">
            <Link href="/News">
              <a className="mb-10 text-lg lg:text-2xl mt-10 lg:mt-20 text-white bg-[#009688] hover:bg-opacity-50 font-bold p-5 border rounded-2xl">More News</a>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
