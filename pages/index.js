import { Hero } from "../components/Home/Hero";
import { LatestJobs } from "../components/Home/LatestJobs";
import { SearchJobs } from "../components/Home/SearchJobs";
import { Slide } from "../components/Home/Slide";
import React from 'react'
import { prisma } from '../util/db.server.js'
import { MainHeader } from '../components/common/MainHeader';
import { useSession } from "next-auth/react";


export async function getStaticProps(){
  const locations = await prisma.Location.findMany({
    include:{
       _count:{
        select:{
          JobLocation:true
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
      JobLocation:{
        include:{
          Location:{
            select:{
              location_id:true,
              LocationName:true
            }
          }
        }
      },
      JobCategory:{
        include:{
          Category:{
            select:{
              category_id:true,
              CategoryName:true
            }
          }
        }
      },  
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
  const entertainments = await prisma.Entertainment.findMany({
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
      EntertainmentCategoryRelationship:{
        include:{
          EntertainmentCategory:{
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
  const latestentertainments = entertainments.map((data)=>({
    entertainment_id:data.entertainment_id,
    Header:data.Header,
    image:data.Image,
    view:data.view,
    ShortDescription:data.ShortDescription,
    userName:data.User.UserName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate,
    Category:data.EntertainmentCategoryRelationship
  }))

  const Alllatestjobs = latestjobs.map((data)=>({
    job_id:data.job_id,
    CompanyName:data.CompanyName,
    image:data.Image,
    JobsName:data.JobsName,
    CareerLevel:data.CareerLevel,
    Salary:data.Salary,
    Descreption:data.Descreption,
    shortDescreption:data.shortDescreption,
    DeadLine:data.DeadLine,
    Apply:data.Apply,
    view:data.view,
    userName:data.User.UserName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate,
    categories:data.JobCategory,
    Location:data.JobLocation,
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
    view:data.view,
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
      latestentertainments:JSON.parse(JSON.stringify(latestentertainments))
    }
  }
}

export default function Home({categories, locations, latestjobs, Alllatestblogs, latestnews, latestentertainments}) {
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="Hulu Media : Home" />
      <div className="flex flex-col w-full h-full py-0 pt-32 bg-[#e6e6e6] dark:bg-[#02201D]">
        <Hero />
        <LatestJobs latestjobs={latestjobs} />
        <SearchJobs categories={categories} locations={locations} />
        <Slide latestnews={latestnews} Alllatestblogs={Alllatestblogs} latestentertainments={latestentertainments}/>
      </div>
    </React.Fragment>
  );
}
