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

export async function getServerSideProps(context){
	const {params,req,res,query} = context
  const location_id = query.location_id

  const locations = await prisma.Location.findMany()
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
    orderBy: {
      CreatedDate:"desc"
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
  const Alllocations = locations.map((data)=>({
      location_id:data.location_id,
      LocationName:data.LocationName,
      Image:data.Image
  }))

  return{
    props:{
    	Alllatestjobs:JSON.parse(JSON.stringify(Alllatestjobs)),
    	jobsbylocation:JSON.parse(JSON.stringify(reversejob)),
      locations:JSON.parse(JSON.stringify(Alllocations)),
    }
  }
}

export default function JobsByCategory() {
	const router = useRouter();
	const { category, howmany } = router.query
  return (
    <section className="bg-gray-200 flex flex-col w-full h-full py-20 px-0 md:px-32">
    	<div className="flex flex-col bg-white w-full h-full px-5 py-10 border rounded-xl">
	    	<h1 className="text-black text-3xl capitalize font-bold mb-10">{howmany} {category} Jobs</h1>
    	
      	<div className="flex flex-col md:flex-row w-full ">
      		<div className="flex flex-col w-full lg:w-1/4 bg-white p-3">
      			<h1 className="text-2xl text-black font-bold capitalize text-center mb-10">Jobs By Category</h1>
      				<div className="flex flex-col h-96 lg:h-[40rem] overflow-y-scroll bg-gray-200 p-3">
	      				{JobsByLocation.map((data, index) => (
	      					<button 
	      						className="flex items-center justify-between group hover:bg-white py-2 mb-5 px-2" 
	      						key={index}
	      						onClick = {()=>{
                      router.push({
                        pathname:"/JobsByCategory",
                        query:{category:"Computer Science", howmany:data.howmany}
                      })
                    }}
	      					>
		      					<h1 className="text-left font-normal text-sm md:text-lg lg:text-xl capitalize group-hover:text-orange-500">
		                	Accounting and Finance
		                </h1>

		                <h1 className="text-left text-blue-800 font-bold text-sm md:text-lg lg:text-xl group-hover:text-orange-500 group-hover:border-orange-200">
                      {data.howmany}
                    </h1>
		              </button>
	      				))}
	      			</div>
      		</div>
      		<div className="flex flex-col w-full lg:w-3/4 bg-white p-3 lg:border-l-2">
      			<div className="flex flex-col w-full bg-gray-200 mb-10 p-3 border rounded-lg">
      				<div className="flex justify-between items-center">
	      				<Link href="/DisplayJobs">
      						<a className="text-2xl text-blue-600 font-bold">Job Type: Purchasing Officer</a>
      					</Link>
	      				<p className="text-lg text-blue-500">Posted: Today</p>
      				</div>

	      			<div className="flex flex-col-reverse md:flex-row justify-between items-center">
		      			<ul className="mt-10">
				      		<li className="flex flex-row justify-between w-full mb-5">
				      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Company Name:</h1>
				      			<p className="text-lg text-left w-1/2"> Holland Dairy P.L.C</p>
				      		</li>

				      		<li className="flex flex-row justify-between w-full mb-5">
				      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Location:</h1>
				      			<p className="text-lg text-left w-1/2">Addis Ababa</p>
				      		</li>

				      		<li className="flex flex-row justify-between w-full mb-5">
				      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Career Level:</h1>
				      			<p className="text-lg text-left w-1/2">Junior Level (1+ - 2 years experience)</p>
				      		</li>

				      		<li className="flex flex-row justify-between w-full mb-5">
				      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Dead Line</h1>
				      			<p className="text-lg text-left w-1/2">Nov 10, 2022</p>
				      		</li>
		      			</ul>

		      			 <Image src="/images/vercel.svg" width={100} height={100} alt="vercel" />
		      		</div>

		      		<p className="text-lg font-normal mb-5">
		      			Collect proformas from suppliers and price negotiation  Negotiate price while receiving 
		      			Priorate purchases Deliver products to storekeeper on time and in good quality Cross-check 
		      			prices from different suppliers  Proper checking of invoices for tin number and amount  
		      			Identify fake suppliers with the right ones  Perform purchases in honest and trustworthy
		      		</p>

		      		<Link href="/DisplayJobs">
		      			<a className="my-5 text-yellow-600 text-xl">
		      				view detail
		      			</a>
		      		</Link>

		      		<hr className="w-full bg-blue-900 mb-5" />
      			</div>

      			<div className="flex flex-col w-full bg-gray-200 mb-10 p-3 border rounded-lg">
      				<div className="flex justify-between items-center">
	      				<Link href="/DisplayJobs">
      						<a className="text-2xl text-blue-600 font-bold">Job Type: Purchasing Officer</a>
      					</Link>
	      				<p className="text-lg text-blue-500">Posted: Today</p>
      				</div>

	      			<div className="flex flex-col-reverse md:flex-row justify-between items-center">
		      			<ul className="mt-10">
				      		<li className="flex flex-row justify-between w-full mb-5">
				      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Company Name:</h1>
				      			<p className="text-lg text-left w-1/2"> Holland Dairy P.L.C</p>
				      		</li>

				      		<li className="flex flex-row justify-between w-full mb-5">
				      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Location:</h1>
				      			<p className="text-lg text-left w-1/2">Addis Ababa</p>
				      		</li>

				      		<li className="flex flex-row justify-between w-full mb-5">
				      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Career Level:</h1>
				      			<p className="text-lg text-left w-1/2">Junior Level (1+ - 2 years experience)</p>
				      		</li>

				      		<li className="flex flex-row justify-between w-full mb-5">
				      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Dead Line</h1>
				      			<p className="text-lg text-left w-1/2">Nov 10, 2022</p>
				      		</li>
		      			</ul>

		      			 <Image src="/images/vercel.svg" width={100} height={100} alt="vercel" />
		      		</div>

		      		<p className="text-lg font-normal mb-5">
		      			Collect proformas from suppliers and price negotiation  Negotiate price while receiving 
		      			Priorate purchases Deliver products to storekeeper on time and in good quality Cross-check 
		      			prices from different suppliers  Proper checking of invoices for tin number and amount  
		      			Identify fake suppliers with the right ones  Perform purchases in honest and trustworthy
		      		</p>

		      		<Link href="/DisplayJobs">
		      			<a className="my-5 text-yellow-600 text-xl">
		      				view detail
		      			</a>
		      		</Link>

		      		<hr className="w-full bg-blue-900 mb-5" />
      			</div>
      		</div>
      		<div className="flex flex-col w-full lg:w-1/4 h-[45rem] p-3 border rounded-lg">
      			<div className="flex justify-between items-center p-10 md:p-0">
			        <div className="flex items-center font-bold text-xl text-black capitalize">
			          <AiOutlineClockCircle size={20} />
			          <span className="ml-5">Latest Jobs</span>
			        </div>
			        <Link href="">
			          <a className="font-bold text-lg text-white p-4 bg-blue-700 capitalize border rounded-2xl">
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
			            <a className="flex justify-around items-center mb-5 even:bg-white even:dark:bg-slate-600 px-5 py-5 group">
			              <div className="flex flex-col w-3/4">
			                <h1 className="font-bold text-sm text-blue-500 group-hover:text-orange-500">
			                  {data.JobsType}
			                </h1>
			                <h1 className="font-light md:text-xs text-blue-500 group-hover:text-orange-500">
			                  {data.CompanyName}
			                </h1>
			              </div>
			              <div className="flex flex-col w-1/4">
			                <h1 className="font-light text-sm text-blue-500 text-right group-hover:text-orange-500">
			                  {moment(data.CreatedDate).utc().format('MMM DD YYYY')}
			                </h1>
			                <h1 className="font-light text-sm text-blue-500 text-right group-hover:text-orange-500">
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
  );
}
