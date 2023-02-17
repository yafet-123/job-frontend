import { VerticalNavbar } from "../components/Admin/VerticalNavbar";
import { DashBoard } from "../components/Admin/DashBoard";
import { AddUser } from "../components/Admin/AddUser";
import { DisplayJob } from "../components/Admin/DisplayJob";
import { AddCategory } from "../components/Admin/AddCategory";
import { AddJob } from "../components/Admin/AddJob";
import { AddLocation } from "../components/Admin/AddLocation";
import { AddNewsCategory } from "../components/Admin/AddNewsCategory";
import { AddNews } from "../components/Admin/AddNews";
import { DisplayCategory } from "../components/Admin/DisplayCategory";
import {AddEntertainmentCategory} from "../components/Admin/AddEntertainmentCategory"
import { useSession } from "next-auth/react";
import { useState,useEffect} from 'react'
import { prisma } from '../util/db.server.js'
import { NextPage } from "next";
import { useRouter } from 'next/router'
import { MainHeader } from '../components/MainHeader';
import React from 'react'

export async function getServerSideProps(){
  const users = await prisma.User.findMany({orderBy : {ModifiedDate:'desc'}});
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
  const newscategories = await prisma.NewsCategory.findMany({
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

  // const entertainmentcategories = await prisma.EntertainmentCategory.findMany({
  //   orderBy: {
  //     category_id:"asc"
  //   },
  //   include:{
  //     User:{
  //         select:{
  //             UserName:true
  //         }
  //     }
  //   }
  // })

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

  const Alllocations = locations.map((data)=>({
      location_id:data.location_id,
      LocationName:data.LocationName,
      Image:data.Image,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      userName:data.User.UserName
  }))

  const Allcategories = categories.map((data)=>({
      category_id:data.category_id,
      CategoryName:data.CategoryName,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      userName:data.User.UserName
  }))

  const AllNewscategories = newscategories.map((data)=>({
      category_id:data.category_id,
      CategoryName:data.CategoryName,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      userName:data.User.UserName
  }))

  // const AllEntertainmentcategories = entertainmentcategories.map((data)=>({
  //     category_id:data.category_id,
  //     CategoryName:data.CategoryName,
  //     CreatedDate:data.CreatedDate,
  //     ModifiedDate:data.ModifiedDate,
  //     userName:data.User.UserName
  // }))

  const Allusers = users.map((data)=>({
      user_id:data.user_id,
      email:data.email,
      role:data.role,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      UserName:data.UserName
  }))

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

  return{
    props:{
      Alllocations:JSON.parse(JSON.stringify(Alllocations)),
      Allusers:JSON.parse(JSON.stringify(Allusers)),
      Allcategories:JSON.parse(JSON.stringify(Allcategories)),
      Alljobs:JSON.parse(JSON.stringify(reversejob)),
      AllNewscategories:JSON.parse(JSON.stringify(AllNewscategories)),
      // AllEntertainmentcategories:JSON.parse(JSON.stringify(AllEntertainmentcategories))
    }
  }
}

export default function Admin({Allusers,Allcategories, Alljobs, Alllocations, AllNewscategories }) {
  const [selected , setselected] = useState("dashboard")
  const { status, data } = useSession();
  // console.log(jobCategory)
  const router = useRouter();
  // useEffect(() => {
  //   if (status === "unauthenticated") router.replace("/auth/signin");
  // }, [status]);


  function handleChange(newValue) {
      setselected(newValue);
  }
  // if (status === "authenticated")
    return (
      <React.Fragment>
        <MainHeader title="Admin" />
        <div className="flex bg-neutral-300 dark:bg-slate-700">
          <VerticalNavbar onChange={handleChange} data={data} />
          <div className="flex-1 pt-32 ">
            { selected == "dashboard" && <DashBoard categories={Allcategories} locations={Alllocations} />}
            { selected == "addUser" && <AddUser users={Allusers}/>}
            { selected == "addCategory" && <AddCategory categories={Allcategories}/>}
            { selected == "displayJob" && <DisplayJob jobs={Alljobs} categories={Allcategories} locations={Alllocations}/>}
            { selected == "addJob" && <AddJob categories={Allcategories} locations={Alllocations}/>}
            { selected == "addlocation" && <AddLocation locations={Alllocations}/>}
            { selected == "addnewscategory" && <AddNewsCategory categories={AllNewscategories} />}
            { selected == "addnews" && <AddNews categories={AllNewscategories} />}
            { selected == "addentertainmentcategory" && <AddEntertainmentCategory categories={AllNewscategories} />}
            { selected == "addentertainment" && <AddNews categories={AllNewscategories} />}
          </div>
        </div>
      </React.Fragment>
  );

}

