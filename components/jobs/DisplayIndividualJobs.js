import axios from 'axios';
import { useRouter } from 'next/router'
import { useState } from 'react'
import moment from 'moment'

export function DisplayIndividualJobs({job,categories}) {
    
	return(
		<div className="flex flex-col bg-[#d1cbc7] p-5 pb-20 dark:bg-slate-600">
            <div className="flex justify-between items-center mt-10 mx-0 lg:mx-5">
                <div className="flex flex-col w-3/4">
                    <h1 className="text-black text-md lg:text-3xl capitalize font-bold mb-2 text-black dark:text-white">{job.JobsType}</h1>
                    <p className="text-sm lg:text-lg font-bold w-3/4 text-gray-500 dark:text-gray-400">Job by {job.CompanyName}</p>
                </div>

                <div className="flex flex-col items-center justify-center lg:ml-5 border rounded-xl bg-blue-500 text-white p-2 lg:p-5">
                    <p className="text-lg lg:text-3xl font-bold capitalize mb-3">Posted</p>
                    <p className="text-md lg:text-xl font-bold capitalize">{moment(job.ModifiedDate).utc().format('dddd, MMM Y')}</p>
                </div>
            </div>

            <ul className="mt-10 text-black dark:text-white">
                <li className="flex flex-row justify-between w-full mb-5">
                    <h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">category:</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-1/2">
                        { categories.map((data,index)=>(
                            <p key={index} className="text-xs lg:text-lg text-left ">{data.CategoryName}</p>
                        ))}
                    </div>
                </li>

                <li className="flex flex-row justify-between w-full mb-5">
                    <h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Location:</h1>
                    <p className="text-xs lg:text-lg text-left w-1/2">{job.Location}</p>
                </li>

                <li className="flex flex-row justify-between w-full mb-5">
                    <h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Career Level:</h1>
                    <p className="text-xs lg:text-lg text-left w-1/2">{job.CareerLevel}</p>
                </li>

                <li className="flex flex-row justify-between w-full mb-5">
                    <h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Employment Type:</h1>
                    <p className="text-xs lg:text-lg text-left w-1/2">{job.EmploymentType}</p>
                </li>

                <li className="flex flex-row justify-between w-full mb-5">
                    <h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Salary:</h1>
                    <p className="text-xs lg:text-lg text-left w-1/2">{job.Salary}</p>
                </li>
            </ul>

            <div className="flex flex-col justify-between mt-10 mx-2 lg:mx-5 ">
                <h1 className="text-blue-700 capitalize text-xl lg:text-3xl font-bold mb-2">job descreption</h1>
                <div dangerouslySetInnerHTML={{ __html: job.JobsDescreption }} />
            </div>

            <div className="flex flex-col justify-between mt-10 mx-2 lg:mx-5">
                <h1 className="text-blue-700 capitalize text-xl lg:text-3xl font-bold mb-2">job requirement</h1>
                <div dangerouslySetInnerHTML={{ __html: job.JobsRequirement }} />
            </div>

            <div className="flex flex-col justify-between mt-10 mx-2 lg:mx-5">
                <h1 className="text-blue-700 capitalize text-xl lg:text-3xl font-bold mb-2">How to Apply</h1>
                <div  dangerouslySetInnerHTML={{ __html: job.Apply }} />
            </div>
        </div>
	)
}