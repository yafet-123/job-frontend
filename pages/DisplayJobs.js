import React from "react";
import Link from "next/link";
import { JobRequirement } from "../data/JobRequirement";
import { TopAndBottomOfDisplayJobs } from "../components/jobs/TopAndBottomOfDisplayJobs";
import { DisplayIndividualJobs } from "../components/jobs/DisplayIndividualJobs";
import axios from "axios";
import { useRouter } from 'next/router'
import { prisma } from '../util/db.server.js'
import { MainHeader } from '../components/common/MainHeader';
export async function getServerSideProps(context){
  const {params,req,res,query} = context
  const id = query.job_id

  const updateview = await prisma.Job.update({
  	where:{job_id : Number(id),},
	  data: { view: { increment: 1 }, },
	})
 
	const data = await prisma.Job.findUnique({
		where:{
			job_id: Number(id),
		},
		include:{
			User:{
				select:{
					UserName:true,
				},
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
		},

	});

	const categoriesdata = await prisma.JobCategory.findMany({
		where:{
			job_id: Number(id),
		},

		include:{
			Category:{
				select:{
					CategoryName:true,
				},
			},
		},
	})
	
	const onedata = {
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
	}

	const Allcategories = categoriesdata.map((data)=>({
    CategoryName:data.Category.CategoryName,
  }))

  return{
    props:{
      job:JSON.parse(JSON.stringify(onedata)),
      categories:JSON.parse(JSON.stringify(Allcategories)),
    }
  }
}

export default function DisplayJobs({job, categories}) {
	console.log(categories)
  return (
  	<React.Fragment>
      <MainHeader title="Display Jobs" />
	    <section className="flex flex-col w-full h-full px-5 lg:px-64 bg-[#e6e6e6] dark:bg-[#02201D] py-52">
	      	<TopAndBottomOfDisplayJobs DeadLine={job.DeadLine} Apply={job.Apply}/>
	      	<DisplayIndividualJobs job={job} categories={categories}/>
	      	<TopAndBottomOfDisplayJobs DeadLine={job.DeadLine} Apply={job.Apply}/>
	    </section>
	  </React.Fragment>
  );
}
