import React,{useState,useEffect} from "react";
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
	const router = useRouter()

  return (
	 	<React.Fragment>
	     <Head>
       <title>Hulu Media : Display News</title>
       <meta property="og:url" content={`https://job-frontend-main.vercel.app${router.asPath}`}/>
       <meta property="og:type" content="website" />
       <meta property="fb:app_id" content="1233665570615472" />
       <meta
         property="og:title"
         content="Hulu Media : Display News"
       	/>
       	<meta name="twitter:card" content={job.ShortDescription} />
       	<meta
        	property="og:description"
        	content={job.ShortDescription}
      	/>
      	<meta property="og:image" content={job.Image} />
      	<meta property="og:image:secure_url" content={job.Image} />
      	<meta property="og:image:width" content="1200" />
      	<meta property="og:image:height" content="300" />
    	</Head>
			<section className="flex flex-col w-full h-full px-5 lg:px-56 bg-[#e6e6e6] dark:bg-[#02201D] py-52">
		  	<TopAndBottomOfDisplayJobs DeadLine={job.DeadLine} Apply={job.Apply} quotes={job.ShortDescription} shareUrl={router.asPath} />
		  	<DisplayIndividualJobs job={job} categories={categories}/>
		  	<TopAndBottomOfDisplayJobs DeadLine={job.DeadLine} Apply={job.Apply} quotes={job.ShortDescription} shareUrl={router.asPath} />
			</section>
		</React.Fragment>
  );
}
