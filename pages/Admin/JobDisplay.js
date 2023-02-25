import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../util/db.server.js'
import { DisplayJob } from "../../components/Admin/Job/DisplayJob";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../components/MainHeader';

export async function getServerSideProps(){
  const jobs = await prisma.Job.findMany({
    orderBy: {
      job_id:"asc"
    },
    include:{
      User:{
        select:{
          UserName:true
        }
      },
      Location:{
        select:{
          LocationName:true,
          location_id:true
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
  })
  
  const Alljobs = jobs.map((data)=>({
    job_id:data.job_id,
    location_id:data.location_id,
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
    userName:data.User.UserName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate,
    categories:data.JobCategory,

  }))
  
  const reversejob = Alljobs.reverse();

  const categories = await prisma.Category.findMany({
    orderBy: {
      category_id:"asc"
    },
    include:{
      User:{
          select:{
              UserName:true
          }
      }
    }
  })

  const Allcategories = categories.map((data)=>({
      category_id:data.category_id,
      CategoryName:data.CategoryName,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      userName:data.User.UserName
  }))

  const locations = await prisma.Location.findMany({
    orderBy: {
      location_id:"asc"
    },
    include:{
      User:{
          select:{
              UserName:true
          }
      }
    }
  });

  const Alllocations = locations.map((data)=>({
      location_id:data.location_id,
      LocationName:data.LocationName,
      Image:data.Image,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      userName:data.User.UserName
  }))
  

  return{
    props:{
      jobs:JSON.parse(JSON.stringify(reversejob)),
      categories:JSON.parse(JSON.stringify(Allcategories)),
      locations:JSON.parse(JSON.stringify(Alllocations)),
    }
  }
}

export default function JobDisplay({jobs,categories,locations}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      	<MainHeader title="Entertemiment Category Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#ddd0c8] dark:bg-slate-700 pt-10">
    				<div className='w-full h-full flex flex-col lg:flex-row'>
    		      <VerticalNavbar data={data} />
    		      <div className="w-full">
            		<DisplayJob jobs={jobs} categories={categories} locations={locations}/>
            	</div>
    		    </div> 
  			  </section>
      	</React.Fragment>
        
    );
}
