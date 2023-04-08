import React , { useState } from "react";
import Link from "next/link";
import { AiOutlineClockCircle } from 'react-icons/ai'
import moment from 'moment';
import Image from 'next/image'

export function GroupLatestJobs({Alllatestjobs}) {
  	return (
	    <div className="flex flex-col w-full h-[50rem] p-10 border rounded-lg mt-10">
		    <div className="flex justify-between items-center p-2 md:p-0">
				<div className="flex items-center font-bold text-md lg:text-xl text-black dark:text-white capitalize">
					<AiOutlineClockCircle size={20} />
					<span className="ml-2 lg:ml-5">Latest Jobs</span>
				</div>
				<Link href="">
				  <a className="font-bold text-sm md:text-md lg:text-lg text-white p-4 bg-[#009688] capitalize border rounded-2xl">
				    view all jobs
				  </a>
				</Link>
		     </div>

			<div className="md:max-w-7xl md:mx-auto bg-neutral-200 dark:bg-slate-700 w-full h-[40rem] border rounded-lg md:mt-10 shadow-2xl shadow-sky-200 flex flex-col overflow-y-scroll">
				<div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">
					{Alllatestjobs.map((data, index) => (
					  	<Link 
						  	href={{
				     			pathname: '/DisplayJobs',
				     			query:{job_id:data.job_id}
				    		}}
						  	key={index}
					  	>
						    <a className="flex justify-around items-center mb-5 px-2 py-5 group hover:bg-[#009688]">
							    <div className="flex flex-row w-full">
					                <Image src={data.image == "" || data.image == null ? "/images/bgImage1.avif" : data.image} width={100} height={100} alt="image" required className="my-5" />
					                <div className="flex flex-col pt-2 lg:pt-0 ml-2 lg:ml-5">
					                  <h1 className="text-left font-bold text-sm md:text-lg lg:text-xl text-[#009688] dark:text-white group-hover:text-white">
					                    {data.JobsName}
					                  </h1>
					                  <h1 className="text-left font-light text-xs md:text-sm lg:text-lg text-[#009688] dark:text-white group-hover:text-white">
					                    {data.CompanyName}
					                  </h1>
					                  <h1 className="font-light text-xs md:text-sm lg:text-lg text-[#009688] dark:text-white text-left group-hover:text-white">
					                    {moment(data.createDate).utc().format('YYYY-MM-DD')}
					                  </h1>
					                </div>
	              				</div>
							</a>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
