import { Hero } from "../components/Hero";
import { LatestJobs } from "../components/LatestJobs";
import { SearchJobs } from "../components/SearchJobs";

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getStaticProps(){
  const locations = await prisma.Location.findMany();
  const categories = await prisma.Category.findMany();
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

  return{
    props:{
      categories:JSON.parse(JSON.stringify(categories)),
      locations:JSON.parse(JSON.stringify(locations)),
      latestjobs:JSON.parse(JSON.stringify(latestreversejob)),
    }
  }
}

export default function Home({categories, locations, latestjobs}) {
  console.log(locations)
  return (
    <div className="pt-10">
      <Hero />
      <LatestJobs latestjobs={latestjobs} />
      <SearchJobs categories={categories} locations={locations} />
    </div>
  );
}
