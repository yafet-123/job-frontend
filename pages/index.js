import { Hero } from "../components/Hero";
import { LatestJobs } from "../components/LatestJobs";
import { SearchJobs } from "../components/SearchJobs";

import { prisma } from '../util/db.server.js'
import { MainHeader } from '../components/MainHeader';
export async function getStaticProps(){
  const locations = await prisma.Location.findMany({
    include:{
       _count:{
        select:{
          Job:true
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

      Location:{
        select:{
          LocationName:true
        }
      }
    } 
  });
  console.log(locations)

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
  console.log(categories)
  return (
    <React.Fragment>
      <MainHeader title="Home" />
      <div className="">
        <Hero />
        <LatestJobs latestjobs={latestjobs} />
        <SearchJobs categories={categories} locations={locations} />
      </div>
    </React.Fragment>
  );
}
