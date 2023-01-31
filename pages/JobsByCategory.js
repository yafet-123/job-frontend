import React from "react";
import Link from "next/link";
import { JobRequirement } from "../data/JobRequirement";
import { AiOutlineMenu } from "react-icons/ai";
import Image from 'next/image'
import { LatestJobs } from "../components/LatestJobs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { LatestJobsList } from "../data/LatestJobs"
import { JobsByLocation } from "../data/JobsByLocation";
import { useRouter } from 'next/router'
import axios from 'axios';
import { prisma } from '../util/db.server.js'
import moment from 'moment';
import { MainHeader } from '../components/MainHeader';
export async function getServerSideProps(context){
	const {params,req,res,query} = context
  const category_id = query.category_id
  console.log(category_id)

  const jobsBycategories = await prisma.Job.findMany({
  	where:{
  		JobCategory:{
  			some: {
	  			Category:{
	  				category_id: Number(category_id)
	  			}
	  		}
  		}	
  	},
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
  });

  console.log(jobsBycategories)

  const Alljobs = jobsBycategories.map((data)=>({
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
  
  const reversejob = Alljobs.reverse();

  const categories = await prisma.Category.findMany({
  	include:{
       _count:{
        select:{
          JobCategory:true
        }
      },
    }
  })
  
  const latestjobs = await prisma.Job.findMany({
  	take:-5,
    orderBy: {
      ModifiedDate:"asc"
    },
    include:{
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
    JobsType:data.JobsType,
    Location:data.Location.LocationName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate
  }))

  const reversejoblatest = Alllatestjobs.reverse();

  return{
    props:{
    	jobsbycategory:JSON.parse(JSON.stringify(reversejob)),
    	Alllatestjobs:JSON.parse(JSON.stringify(reversejoblatest)),
      categories:JSON.parse(JSON.stringify(categories)),
    }
  }
}

export default function JobsByCategory({categories,Alllatestjobs, jobsbycategory}) {
	const router = useRouter();
	console.log(categories)
	const { category, howmany } = router.query
  return (
  	<React.Fragment>
      <MainHeader title="Jobs By Category" />
	    <section className="bg-gray-200 dark:bg-slate-700 flex flex-col w-full h-full py-20 px-0 md:px-24 py-28">
	    	<div className="flex flex-col bg-white dark:bg-slate-800 w-full h-full lg:px-5 py-5 border rounded-xl dark:border-slate-800">
	    		<div className="flex flex-col lg:flex-row justify-between items-center mb-10 bg-white dark:bg-slate-800">
	    			<div className="flex flex-col lg:flex-row mb-5 mt-10">
		    			<h1 className="lg:ml-5 text-blue-700 text-xl md:text-3xl lg:text-4xl capitalize font-bold mt-10 lg:mt-0 text-center lg:text-left">{category} Jobs</h1>
	    			</div>
	    			<div className="flex flex-col lg:flex-row mb-10 mt-10">
	    				
	    				<div className="flex flex-col items-center justify-center lg:ml-5 border rounded-xl bg-blue-500 text-white p-2 lg:p-5">
	    					<p className="text-lg lg:text-3xl font-bold capitalize">Jobs</p>
	    					<p className="text-md lg:text-xl font-bold capitalize">{howmany}</p>
	    				</div>
	    			</div>
	    		</div>
	      	<div className="flex flex-col md:flex-row w-full bg-white dark:bg-slate-800">
	      		<div className="flex flex-col-reverse lg:flex-row w-full">
		      		<div className="flex flex-col w-full lg:w-1/4 bg-white p-3 dark:bg-slate-800">
		      			<h1 className="text-lg md:text-xl lg:text-2xl text-black dark:text-white font-bold capitalize text-center mb-10">Jobs By Category</h1>
		      				<div className="flex flex-col h-[20rem] lg:h-[50rem] overflow-y-scroll bg-gray-200 dark:bg-slate-700 p-3">
			      				{categories.map((data, index) => (
			      					<button 
			      						className="flex items-center group hover:bg-white py-2 mb-5" 
			      						key={index}
			      						onClick = {()=>{
		                      router.push({
		                        pathname:"/JobsByCategory",
		                        query:{category:data.CategoryName, howmany:data._count.JobCategory, category_id: data.category_id}
		                      })
		                    }}
			      					>
				      					<h1 className="text-left font-normal text-sm md:text-lg lg:text-xl capitalize group-hover:text-orange-500">
				                	{data.CategoryName}
				                </h1>

				                <h1 className="text-left text-blue-800 font-bold text-sm md:text-lg lg:text-xl group-hover:text-orange-500 group-hover:border-orange-200">
		                      {data.howmany}
		                    </h1>
				              </button>
			      				))}
			      			</div>
		      		</div>
		      		<div className="flex flex-col w-full lg:w-3/4 bg-white dark:bg-slate-800 p-3 lg:border-l-2 px-3 lg:px-10">
		      			{ jobsbycategory == "" ? 
		      				<h1 className="text-black dark:text-white text-lg lg:text-xl font-bold text-center italic">
		      					There is No job posted in {category} Category
		      				</h1>
		      			:
			      			<div>
				      			{ jobsbycategory.map((data,index)=>(
					      			<div key={index} className="flex flex-col w-full bg-gray-300 dark:bg-slate-800 mb-10 p-3 border rounded-lg">
					      				<div className="flex justify-between items-center mb-5">
					      					<Link href="/DisplayJobs">
					      						<a className="text-sm lg:text-2xl text-blue-600 font-bold">Job Type: {data.JobsType} </a>
					      					</Link>
						      				<p className="text-xs lg:text-lg text-blue-500">Posted: {moment(data.ModifiedDate).utc().format('MMM DD')}</p>
					      				</div>

						      			<div className="flex flex-col-reverse md:flex-row items-center">
							      			<ul className="mt-10 w-full lg:w-3/4">
									      		<li className="flex flex-row justify-between items-center w-full mb-5">
									      			<h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Company Name:</h1>
									      			<p className="text-xs lg:text-lg text-left w-1/2">{data.CompanyName}</p>
									      		</li>

									      		<li className="flex flex-row justify-between items-center w-full mb-5">
									      			<h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Location:</h1>
									      			<p className="text-xs lg:text-lg text-left w-1/2">{data.Location}</p>
									      		</li>

									      		<li className="flex flex-row justify-between items-center w-full mb-5">
									      			<h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Career Level:</h1>
									      			<p className="text-xs lg:text-lg text-left w-1/2">{data.CareerLevel}</p>
									      		</li>

									      		<li className="flex flex-row justify-between items-center w-full mb-5">
									      			<h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Dead Line</h1>
									      			<p className="text-xs lg:text-lg text-left w-1/2">{moment(data.DeadLine).utc().format('MMM DD')}</p>
									      		</li>
							      			</ul>

							      			<Image src={data.Image == null ? "/images/bgImage1.avif" : data.Image} width={100} height={100} alt="image" required className="my-5" />
							      		</div>

							      		<div className="text-sm lg:text-lg font-normal mb-5 h-36 overflow-hidden" dangerouslySetInnerHTML={{ __html: data.JobsDescreption }} />

							      		<Link 
							      			href={{
				            				pathname: '/DisplayJobs',
				            				query:{job_id:data.job_id}
				          				}}
							      		>
							      			<a className="my-5 text-yellow-600 text-md lg:text-xl">
							      				view detail
							      			</a>
							      		</Link>
					      			</div>
				      			))}
			      			</div>
		      			}
		      		</div>
		      	</div>
	      		<div className="flex flex-col w-full lg:w-4/12 h-[45rem] p-3 border rounded-lg bg-white dark:bg-slate-800 mt-5">
	      			<div className="flex justify-between items-center p-2 md:p-0">
				        <div className="flex items-center font-bold text-md lg:text-xl text-black dark:text-white capitalize">
				          <AiOutlineClockCircle size={20} />
				          <span className="ml-2 lg:ml-5">Latest Jobs</span>
				        </div>
				        <Link href="">
				          <a className="font-bold text-sm md:text-md lg:text-lg text-white p-2 lg:p-4 bg-blue-700 capitalize border rounded-2xl">
				            view all jobs
				          </a>
				        </Link>
	      			</div>

				      <div className="md:max-w-7xl md:mx-auto bg-gray-200 dark:bg-slate-800 w-full h-[40rem] border rounded-lg md:mt-10 shadow-2xl shadow-sky-200 flex flex-col overflow-y-scroll">
				        {Alllatestjobs.map((data, index) => (
				          <Link 
				          	href={{
	            				pathname: '/DisplayJobs',
	            				query:{job_id:data.job_id}
	          				}}
				          	key={index}
				          >
				            <a className="flex justify-around items-center mb-5 even:bg-white even:dark:bg-slate-600 px-2 py-5 group">
				              <div className="flex flex-col w-3/4">
				                <h1 className="break-words text-left font-bold text-sm md:text-lg lg:text-xl text-blue-500 dark:text-white group-hover:text-orange-500">
				                  {data.JobsType}
				                </h1>
				                <h1 className="break-words text-left font-light text-xs md:text-sm lg:text-lg text-blue-500 dark:text-white group-hover:text-orange-500">
				                  {data.CompanyName}
				                </h1>
				              </div>
				              <div className="flex flex-col w-1/4">
				                <h1 className="fbreak-words ont-light text-xs md:text-sm lg:text-lg text-blue-500 dark:text-white text-right group-hover:text-orange-500">
				                  {moment(data.CreatedDate).utc().format('MMM DD YYYY')}
				                </h1>
				                <h1 className="break-words font-light text-xs md:text-sm lg:text-lg text-blue-500 dark:text-white text-right group-hover:text-orange-500">
				                  {data.Location}
				                </h1>
				              </div>
				            </a>
				          </Link>
				        ))}
				      </div>
	      		</div>
	     		</div>
	    	</div>
	    </section>
	  </React.Fragment>
  );
}
