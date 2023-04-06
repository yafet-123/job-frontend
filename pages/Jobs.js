import React from "react";
import Link from "next/link";
import { useState } from "react";
import { prisma } from '../util/db.server.js'
import { MainHeader } from '../components/common/MainHeader';
import { Hero } from "../components/jobs/Hero";
import { Searchjobs } from "../components/jobs/Searchjobs";

export async function getServerSideProps(){
  const categories = await prisma.Category.findMany({
    include:{
       _count:{
        select:{
          JobCategory:true
        }
      },
    }
  });
  const locations = await prisma.Location.findMany({
    include:{
       _count:{
        select:{
          JobLocation:true
        }
      },
    }
  });
  const jobs = await prisma.Job.findMany({ 
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
    } 
  });

  const Alljobs = jobs.map((data)=>({
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
    Location:data.JobLocation,
  }))
  
  const reversejob = Alljobs.reverse();

  return{
    props:{
      categories:JSON.parse(JSON.stringify(categories)),
      locations:JSON.parse(JSON.stringify(locations)),
      latestjobs:JSON.parse(JSON.stringify(reversejob)),
    }
  }
}

export default function Jobs({categories, locations, latestjobs}) {
  return (
    <React.Fragment>
      <MainHeader title="Hulu Media : Jobs" />
      <section className="flex flex-col w-full h-full py-0 lg:py-20 pt-32 bg-[#e6e6e6] dark:bg-[#02201D]">
        <Hero />
        <Searchjobs categories={categories} locations={locations} latestjobs={latestjobs} />
      </section>
    </React.Fragment>
  );
}
