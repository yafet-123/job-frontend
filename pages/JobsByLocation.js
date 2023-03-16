import React from "react";
import Link from "next/link";
import { JobRequirement } from "../data/JobRequirement";
import { AiOutlineMenu } from "react-icons/ai";
import Image from 'next/image'
import { AiOutlineClockCircle } from "react-icons/ai";
import { useRouter } from 'next/router'
import axios from 'axios';
import { prisma } from '../util/db.server.js'
import moment from 'moment';
import { MainHeader } from '../components/MainHeader';
export async function getServerSideProps(context){
	const {params,req,res,query} = context
  const location_id = query.location_id

  const locations = await prisma.Location.findMany({
  	include:{
       _count:{
        select:{
          Job:true
        }
      },
    }
  })
  const jobsByLocation = await prisma.Job.findMany({
  	where:{
  		location_id: Number(location_id)
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

  const Alljobs = jobsByLocation.map((data)=>({
    job_id:data.job_id,
    CompanyName:data.CompanyName,
    image:data.Image,
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

  const reversejoblatest = Alllatestjobs.reverse();

  return{
    props:{
    	Alllatestjobs:JSON.parse(JSON.stringify(reversejoblatest)),
    	jobsbylocation:JSON.parse(JSON.stringify(reversejob)),
      locations:JSON.parse(JSON.stringify(locations)),
    }
  }
}

export default function JobsByLocation({locations, jobsbylocation, Alllatestjobs}) {
	const router = useRouter();
  const { location, howmany, image } = router.query
  return (
  	<React.Fragment>
      <MainHeader title="Jobs By Location" />
	    <section className="bg-[#ddd0c8] dark:bg-slate-700 flex flex-col w-full h-full px-0 md:px-24 py-44">
	    	<div className="flex flex-col bg-[#d1cbc7] dark:bg-slate-800 w-full h-full lg:px-5 py-10 border rounded-xl dark:border-slate-800">
	    		<div className="flex flex-col lg:flex-row justify-between items-center mb-10 bg-[#cab3a8] dark:bg-slate-700 px-10">
	    			<div className="flex flex-col items-center lg:flex-row mb-5 mt-10">
	    				<Image src={image} width={100} height={100} alt="image" className="rounded-2xl" />
		    			<h1 className="lg:ml-5 text-blue-700 text-xl md:text-3xl lg:text-5xl capitalize font-bold mt-10 lg:mt-0 text-center lg:text-left">Jobs in {location}</h1>
	    			</div>
	    			<div className="flex flex-col items-center lg:flex-row mb-10 mt-10">
	    				<div className="flex flex-col lg:mr-5 mb-10 lg:mb-0">
	    					<p className="text-lg lg:text-3xl text-black dark:text-white font-bold capitalize mb-5 lg:mb-0 text-center lg:text-left">Population of {location}</p>
	    					<p className="text-md lg:text-2xl text-black dark:text-white font-bold capitalize text-center">2,739,551 </p>
	    				</div>

	    				<div className="flex flex-col items-center justify-center lg:ml-5 border rounded-xl bg-blue-500 text-white p-2 lg:p-5">
	    					<p className="text-lg lg:text-3xl font-bold capitalize">Jobs</p>
	    					<p className="text-md lg:text-xl font-bold capitalize">{howmany}</p>
	    				</div>
	    			</div>
	    		</div>	
	      	<div className="flex flex-col md:flex-row w-full bg-[#e7ddd8] dark:bg-slate-800">
	      		<div className="flex flex-col-reverse lg:flex-row w-full">
		      		<div className="flex flex-col w-full lg:w-1/4 h-[20rem] lg:h-[50rem] bg-[#ddcfc8] p-3 dark:bg-slate-700 sticky top-32">
		      				<h1 className="text-lg md:text-xl lg:text-2xl text-black dark:text-white font-bold capitalize text-center mb-10">Jobs in ethopia</h1>
		      				<div className="flex flex-col overflow-y-scroll scroll_width p-3">
			      				{locations.map((data, index) => (
			      					<button 
			      						className="flex items-center group hover:bg-white py-2 mb-5" 
			      						key={index}
			      						onClick = {()=>{
		                      router.push({
		                        pathname:"/JobsByLocation",
		                        query:{location:data.LocationName, howmany:data._count.Job, image:data.Image, location_id:data.location_id}
		                      })
		                    }}
			      					>
			      						<Image src={data.Image == null ? "/images/bgImage1.avif" : data.Image} width={25} height={25} alt="image that will be displayed" />
				      					<h1 className="text-left font-normal text-sm md:text-lg lg:text-xl capitalize group-hover:text-orange-500 ml-5">
				                	jobs in {data.LocationName}
				                </h1>
				              </button>
			      				))}
			      			</div>
		      		</div>
		      		<div className="flex flex-col w-full lg:w-3/4 bg-[#ddcfc8] dark:bg-slate-800 p-3 lg:border-l-2 px-3 lg:px-10">
		      			{ jobsbylocation == "" ? 
		      				<h1 className="text-black dark:text-white text-lg lg:text-xl font-bold text-center italic">
		      					There is No job posted in {location}
		      				</h1>
		      			:
			      			<div>
				      			{ jobsbylocation.map((data,index)=>(
					      			<div key={index} className="flex flex-col w-full bg-[#b5998a] dark:bg-slate-800 mb-10 p-3 border rounded-lg">
					      				<div className="flex justify-between items-center mb-5">
					      					<Link href="/DisplayJobs">
					      						<a className="text-sm lg:text-2xl text-blue-700 font-bold">Job Type: {data.JobsType} </a>
					      					</Link>
						      				<p className="text-xs lg:text-lg text-blue-900">Posted: {moment(data.ModifiedDate).utc().format('MMM DD')}</p>
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

							      			 <Image src={data.image == "" || data.image == null ? "/images/bgImage1.avif" : data.image} width={100} height={100} alt="image" required />
							      		</div>

							      		<div className="text-sm lg:text-lg font-normal mb-5 h-36 overflow-hidden" dangerouslySetInnerHTML={{ __html: data.JobsDescreption }} />

							      		<Link 
							      			href={{
				            				pathname: '/DisplayJobs',
				            				query:{job_id:data.job_id}
				          				}}
							      		>
							      			<a className="my-5 text-blue-900 text-md lg:text-xl">
							      				view detail
							      			</a>
							      		</Link>
					      			</div>
				      			))}
			      			</div>
		      			}
		      		</div>
		      	</div>
	      		<div className="flex flex-col w-full lg:w-4/12 h-[50rem] p-3 border rounded-lg bg-[#ddd0c9] dark:bg-slate-700 sticky top-32">
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

				      <div className="md:max-w-7xl md:mx-auto bg-[#b5998a] dark:bg-slate-800 w-full h-[40rem] border rounded-lg md:mt-10 shadow-2xl shadow-sky-200 flex flex-col overflow-y-scroll scroll_width">
				        {Alllatestjobs.map((data, index) => (
				          <Link 
				          	href={{
	            				pathname: '/DisplayJobs',
	            				query:{job_id:data.job_id}
	          				}}
				          	key={index}
				          >
				            <a className="flex justify-around items-center mb-5 even:bg-white even:dark:bg-slate-600 px-2 py-5 group hover:bg-neutral-500">
				              <div className="flex flex-col w-2/4 lg:w-3/4">
                        <h1 className="font-normal text-sm lg:text-lg text-black dark:text-white group-hover:text-white text-left">
                          {data.JobsType}
                        </h1>
                        <h1 className="font-light text-xs lg:text-sm text-black dark:text-white group-hover:text-white text-left">
                          {data.CompanyName}
                        </h1>
                      </div>
                      <div className="flex flex-col items-center justify-center w-1/4 lg:w-1/4">
                        <h1 className="font-light text-xs text-black dark:text-white md:text-lg text-right group-hover:text-white">
                          {moment(data.CreatedDate).utc().format('MMM DD YYYY')}
                        </h1>
                        <h1 className="font-light text-xs text-black dark:text-white md:text-lg text-right group-hover:text-white">
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
