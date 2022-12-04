import { VerticalNavbar } from "../components/Admin/VerticalNavbar";
import { DashBoard } from "../components/Admin/DashBoard";
import { AddUser } from "../components/Admin/AddUser";
import { DisplayUser } from "../components/Admin/DisplayUser";
import { AddCategory } from "../components/Admin/AddCategory";
import { AddJob } from "../components/Admin/AddJob";

import { useState,useEffect} from 'react'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getServerSideProps(){
  const Allusers = await prisma.User.findMany({orderBy : {ModifiedDate:'desc'}});
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

  return{
    props:{
      Allusers:JSON.parse(JSON.stringify(Allusers)),
      Allcategories:JSON.parse(JSON.stringify(categories)),
      Alljobs:JSON.parse(JSON.stringify(reversejob)),
    }
  }
}

export default function Admin({Allusers,Allcategories, Alljobs }) {
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
        { selected == "displayUser" && <DisplayUser users={Allusers}/>}
        { selected == "addCategory" && <AddCategory />}
        { selected == "addJob" && <AddJob categories={Allcategories}/>}
      </div>
    </div>
  );
}
