import React from "react";
import Link from "next/link";
import { useState } from "react";
import { prisma } from '../util/db.server.js'
import { MainHeader } from '../components/MainHeader';
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
          Job:true
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
      Location:{
        select:{
          LocationName:true
        }
      }
    } 
  });

  const Alljobs = jobs.map((data)=>({
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
