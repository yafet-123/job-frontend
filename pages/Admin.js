import { VerticalNavbar } from "../components/Admin/VerticalNavbar";
import { DashBoard } from "../components/Admin/DashBoard";
import { AddUser } from "../components/Admin/AddUser";
import { DisplayUser } from "../components/Admin/DisplayUser";
import { DisplayJob } from "../components/Admin/DisplayJob";
import { AddCategory } from "../components/Admin/AddCategory";
import { AddJob } from "../components/Admin/AddJob";
import { AddLocation } from "../components/Admin/AddLocation";
import { DisplayCategory } from "../components/Admin/DisplayCategory";
import { useSession } from "next-auth/react";
import { useState,useEffect} from 'react'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { NextPage } from "next";
import { useRouter } from 'next/router'

export async function getServerSideProps(){
  const users = await prisma.User.findMany({orderBy : {ModifiedDate:'desc'}});
  const locations = await prisma.Location.findMany({
    include:{
      User:{
          select:{
              UserName:true
          }
      }
    }
  });
  const categories = await prisma.Category.findMany({
    include:{
      User:{
          select:{
              UserName:true
          }
      }
    }
  })
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
          LocationName:true
        }
      }
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

  const Allusers = users.map((data)=>({
      user_id:data.user_id,
      email:data.email,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      UserName:data.UserName
  }))

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
    userName:data.User.UserName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate
  }))
  
  const reversejob = Alljobs.reverse();

  return{
    props:{
      Alllocations:JSON.parse(JSON.stringify(Alllocations)),
      Allusers:JSON.parse(JSON.stringify(Allusers)),
      Allcategories:JSON.parse(JSON.stringify(Allcategories)),
      Alljobs:JSON.parse(JSON.stringify(reversejob)),
    }
  }
}

export default function Admin({Allusers,Allcategories, Alljobs, Alllocations }) {
  const [selected , setselected] = useState("dashboard")
  const { status, data } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/signin");
  }, [status]);
  function handleChange(newValue) {
      setselected(newValue);
  }
  if (status === "authenticated")
    return (
    <div className="flex bg-gray-100 dark:bg-slate-700">
      <VerticalNavbar onChange={handleChange} />
      <div className="flex-1">
        { selected == "dashboard" && <DashBoard />}
        { selected == "addUser" && <AddUser users={Allusers}/>}
        { selected == "addCategory" && <AddCategory categories={Allcategories}/>}
        { selected == "displayJob" && <DisplayJob jobs={Alljobs}/>}
        { selected == "addJob" && <AddJob categories={Allcategories} locations={Alllocations}/>}
        { selected == "addlocation" && <AddLocation locations={Alllocations}/>}
      </div>
    </div>
  );

}

