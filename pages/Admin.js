import { VerticalNavbar } from "../components/Admin/VerticalNavbar";
import { DashBoard } from "../components/Admin/DashBoard";
import { AddUser } from "../components/Admin/AddUser";
import { DisplayUser } from "../components/Admin/DisplayUser";
import { AddCategory } from "../components/Admin/AddCategory";
import { AddJob } from "../components/Admin/AddJob";
import { DisplayCategory } from "../components/Admin/DisplayCategory";
import { useSession } from "next-auth/react";
import { useState,useEffect} from 'react'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getServerSideProps(){
  const users = await prisma.User.findMany({orderBy : {ModifiedDate:'desc'}});
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
    Location:data.Location,
    CareerLevel:data.CareerLevel,
    EmploymentType:data.EmploymentType,
    Salary:data.Salary,
    JobsDescreption:data.JobsDescreption,
    JobsRequirement:data.JobsRequirement,
    DeadLine:data.DeadLine,
    Apply:data.Apply,
    user:data.User.UserName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate
  }))
  const reversejob = Alljobs.reverse();

  return{
    props:{
      Allusers:JSON.parse(JSON.stringify(Allusers)),
      Allcategories:JSON.parse(JSON.stringify(Allcategories)),
      Alljobs:JSON.parse(JSON.stringify(reversejob)),
    }
  }
}

export default function Admin({Allusers,Allcategories, Alljobs }) {
  const [selected , setselected] = useState("dashboard")
  const { status, data } = useSession();
  console.log(data)
  function handleChange(newValue) {
      setselected(newValue);
  }
  return (
    <div className="flex bg-gray-200 dark:bg-slate-700">
      <VerticalNavbar onChange={handleChange} />
      <div className="flex-1">
        { selected == "dashboard" && <DashBoard />}
        { selected == "addUser" && <AddUser users={Allusers}/>}
        { selected == "addCategory" && <AddCategory categories={Allcategories}/>}
        { selected == "addJob" && <AddJob categories={Allcategories}/>}
      </div>
    </div>
  );
}
