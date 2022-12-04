import { VerticalNavbar } from "../components/Admin/VerticalNavbar";
import { DashBoard } from "../components/Admin/DashBoard";
import { AddUser } from "../components/Admin/AddUser";
import { AddCategory } from "../components/Admin/AddCategory";
import { AddJob } from "../components/Admin/AddJob";

import { useState,useEffect} from 'react'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getServerSideProps(){
  const users = await prisma.User.findMany();
  const categories = await prisma.Category.findMany({orderBy : {category_id:'asc'}})
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

  const AllUser = users.map((data)=>({
      user_id:data.user_id,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      UserName:data.UserName
  }))

  return{
    props:{
      ALlusers:JSON.parse(JSON.stringify(AllUser)),
      Allcategories:JSON.parse(JSON.stringify(categories)),
      Alljobs:JSON.parse(JSON.stringify(reversejob)),
    }
  }
}

export default function Admin({ALlusers,Allcategories, Alljobs }) {
  const [selected , setselected] = useState("dashboard")
  function handleChange(newValue) {
      setselected(newValue);
  }

  console.log(Allcategories)
  return (
    <div className="flex bg-gray-200">
      <VerticalNavbar onChange={handleChange} />
      <div className="flex-1">
        { selected == "dashboard" && <DashBoard />}
        { selected == "addUser" && <AddUser />}
        { selected == "addCategory" && <AddCategory />}
        { selected == "addJob" && <AddJob categories={Allcategories}/>}
      </div>
    </div>
  );
}
