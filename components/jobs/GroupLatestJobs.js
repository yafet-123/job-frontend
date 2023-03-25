import React , { useState } from "react";
import Link from "next/link";
import { AiOutlineClockCircle } from 'react-icons/ai'
import moment from 'moment';

export function GroupLatestJobs({Alllatestjobs}) {
  	return (
	    <div className="flex flex-col w-full lg:w-4/12 h-[50rem] p-3 border rounded-lg sticky top-32">
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

			<div className="md:max-w-7xl md:mx-auto bg-neutral-200 dark:bg-slate-700 w-full h-[40rem] border rounded-lg md:mt-10 shadow-2xl shadow-sky-200 flex flex-col overflow-y-scroll scroll_width">
				{Alllatestjobs.map((data, index) => (
				  	<Link 
					  	href={{
			     			pathname: '/DisplayJobs',
			     			query:{job_id:data.job_id}
			    		}}
					  	key={index}
				  	>
					    <a className="flex justify-around items-center mb-5 px-2 py-5 group hover:bg-[#009688]">
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
	);
}
