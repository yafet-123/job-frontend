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
import { PrismaClient } from '@prisma/client'
import axios from 'axios';
const prisma = new PrismaClient()
import moment from 'moment';

export async function getServerSideProps(){
  const locations = await prisma.Location.findMany()
  
  const Alllocations = locations.map((data)=>({
      location_id:data.location_id,
      LocationName:data.LocationName
  }))

  return{
    props:{
      locations:JSON.parse(JSON.stringify(Alllocations)),
    }
  }
}

export default function JobsByLocationPage({locations}) {
	const router = useRouter();
  const { location, howmany, image } = router.query
  return (
    <section className="bg-gray-200 flex flex-col w-full h-full py-20 px-0 md:px-32">
    	<div className="flex flex-col bg-white w-full h-full px-5 py-5 border rounded-xl">
    		<div className="flex flex-col lg:flex-row justify-between items-center mb-10">
    			<div className="flex flex-col lg:flex-row mb-5 mt-10">
    				<Image src={image} width={100} height={100} alt="image" className="rounded-2xl" />
	    			<h1 className="lg:ml-5 text-blue-700 text-3xl lg:text-5xl capitalize font-bold mt-10 lg:mt-0 text-center lg:text-left">Jobs in {location}</h1>
    			</div>
    			<div className="flex flex-col lg:flex-row mb-10 mt-10">
    				<div className="flex flex-col mr-5 mb-10 lg:mb-0">
    					<p className="text-3xl text-gray-600 font-bold capitalize mb-5 lg:mb-0 text-center lg:text-left">Population of {location}</p>
    					<p className="text-2xl text-black font-bold capitalize text-center">2,739,551 </p>
    				</div>

    				<div className="flex flex-col items-center justify-center lg:ml-5 border rounded-xl bg-blue-500 text-white p-5">
    					<p className="text-3xl font-bold capitalize">Jobs</p>
    					<p className="text-xl font-bold capitalize">{howmany}</p>
    				</div>
    			</div>
    		</div>
    	
      	<div className="flex flex-col md:flex-row w-full">
      		<div className="flex flex-col w-full lg:w-1/4 bg-white p-3">
      				<h1 className="text-2xl text-black font-bold capitalize text-center mb-10">Jobs in ethopia</h1>
      				<div className="flex flex-col h-96 lg:h-[40rem] overflow-y-scroll bg-gray-200 p-3">
	      				{locations.map((data, index) => (
	      					<button 
	      						className="flex items-center group hover:bg-white py-2 mb-5" 
	      						key={index}
	      						onClick = {()=>{
                      router.push({
                        pathname:"/JobsByLocation",
                        query:{location:data.location, howmany:data.howmany, image:data.image}
                      })
                    }}
	      					>
	      						<Image src={data.Image == null ? "/images/bgImage1.avif" : data.Image} width={50} height={50} alt="image that will be displayed" />
		      					<h1 className="font-normal text-sm md:text-lg lg:text-xl capitalize group-hover:text-orange-500 ml-5">
		                	jobs in {data.LocationName}
		                </h1>
		              </button>
	      				))}
	      			</div>
      		</div>
      		<div className="flex flex-col w-full lg:w-2/4 bg-white p-3 lg:border-l-2">
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

		      			 <Image src="/images/vercel.svg" width={100} height={100} alt="image" />
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

		      			 <Image src="/images/vercel.svg" width={100} height={100} alt="image"/>
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

			      <div className="md:max-w-7xl md:mx-auto bg-gray-200 w-full h-[40rem] border rounded-lg md:mt-10 shadow-2xl shadow-sky-200 flex flex-col overflow-y-scroll">
			        {LatestJobsList.map((data, index) => (
			          <Link href="/" key={index}>
			            <a className="flex justify-around items-center mb-5 even:bg-white px-10 py-5 group">
			              <div className="flex flex-col w-1/2">
			                <h1 className="font-bold text-lg text-blue-500 group-hover:text-orange-500">
			                  {data.job}
			                </h1>
			                <h1 className="font-light md:text-sm text-blue-500 group-hover:text-orange-500">
			                  {data.company}
			                </h1>
			              </div>
			              <div className="flex flex-col w-1/2">
			                <h1 className="font-light text-lg text-blue-500 text-right group-hover:text-orange-500">
			                  {data.createDate}
			                </h1>
			                <h1 className="font-light text-lg text-blue-500 text-right group-hover:text-orange-500">
			                  {data.location}
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
