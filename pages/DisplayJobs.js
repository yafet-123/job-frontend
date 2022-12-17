import React from "react";
import Link from "next/link";
import { JobRequirement } from "../data/JobRequirement";
import { TopAndBottomOfDisplayJobs } from "../components/TopAndBottomOfDisplayJobs";
export default function DisplayJobs() {
  return (
    <section className="flex flex-col w-full h-full px-0 md:px-32 bg-gray-200">
      	<TopAndBottomOfDisplayJobs />
      	<div className="flex flex-col bg-white p-5 pb-20">
      		<div className="flex justify-between items-center mt-10 mx-5">
		      	<div className="flex flex-col w-3/4">
		      		<h1 className="text-black text-3xl capitalize font-bold mb-2">Sales Officer</h1>
		      		<p className="text-gray-500 text-lg font-bold w-3/4">Job by Vittorio Chemical Industries PLC</p>
		      	</div>

		      	<div className="flex flex-col border rounded-xl p-5 text-black text-lg font-bold">
		      		<p>Posted</p>
		      		<p>02 November</p>
		      	</div>
      		</div>

	      	<ul className="mx-20 mt-10">
	      		<li className="flex flex-row justify-between w-full mb-5">
	      			<h1 className="text-xl font-bold capitalize text-left w-1/2">category:</h1>
	      			<p className="text-lg text-left w-1/2"> Development and Project Management</p>
	      		</li>

	      		<li className="flex flex-row justify-between w-full mb-5">
	      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Location:</h1>
	      			<p className="text-lg text-left w-1/2">Diredawa (Siti Zone, Somali region) </p>
	      		</li>

	      		<li className="flex flex-row justify-between w-full mb-5">
	      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Career Level:</h1>
	      			<p className="text-lg text-left w-1/2"> Mid Level ( 2+ - 5 years experience)</p>
	      		</li>

	      		<li className="flex flex-row justify-between w-full mb-5">
	      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Employment Type:</h1>
	      			<p className="text-lg text-left w-1/2"> Full time</p>
	      		</li>

	      		<li className="flex flex-row justify-between w-full mb-5">
	      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Salary:</h1>
	      			<p className="text-lg text-left w-1/2">Negotiable</p>
	      		</li>
	      	</ul>

	      	<div className="flex flex-col justify-between mt-10 mx-5">
	      		<h1 className="text-blue-700 capitalize text-3xl font-bold mb-2">job descreption</h1>
	      		<div dangerouslySetInnerHTML={{ __html: JobRequirement }} />
	      	</div>

	      	<div className="flex flex-col justify-between mt-10 mx-5">
	      		<h1 className="text-blue-700 capitalize text-3xl font-bold mb-2">job requirement</h1>
	      		<div dangerouslySetInnerHTML={{ __html: JobRequirement }} />
	      	</div>

	      	<div className="flex flex-col justify-between mt-10 mx-5">
	      		<h1 className="text-blue-700 capitalize text-3xl font-bold mb-2">How to Apply</h1>
	      		<div dangerouslySetInnerHTML={{ __html: JobRequirement }} />
	      	</div>
      	</div>
      	
      	
    </section>
  );
}
