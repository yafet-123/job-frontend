import axios from 'axios';
import { useRouter } from 'next/router'
import { useState } from 'react'
import moment from 'moment'
import Image from 'next/image'
import 'react-quill/dist/quill.snow.css';

export function DisplayIndividualJobs({job,categories}) {
    const location = job.Location;
	return(
		<div className="flex flex-col bg-neutral-300 dark:bg-slate-700 p-5 pb-20">
            <div className="flex justify-between items-center mt-10 mx-0 lg:mx-5">
                <div className="flex flex-col w-3/4">
                    <h1 className="text-black text-md lg:text-3xl capitalize font-bold mb-2 text-black dark:text-white">{job.JobsName}</h1>
                    <p className="text-sm lg:text-lg font-bold w-3/4 text-gray-500 dark:text-gray-400">Job by {job.CompanyName}</p>
                </div>

                <div className="flex flex-col items-center justify-center lg:ml-5 border rounded-xl bg-[#009688] text-white p-2 lg:p-5">
                    <p className="text-lg lg:text-3xl font-bold capitalize mb-3">Posted</p>
                    <p className="text-md lg:text-xl font-bold capitalize">{moment(job.ModifiedDate).utc().format('dddd, MMM Y')}</p>
                </div>
            </div>

            <ul className="mt-10 text-black dark:text-white">
                <li className="flex flex-row justify-between w-full mb-5">
                    <h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Company Image:</h1>
                    <div className="w-1/2">
                        <Image src={job.image == "" || job.image == null ? "/images/bgImage1.avif" : job.image} width={100} height={100} alt="image" required className="my-5 w-1/2" />
                    </div>
                </li>

                <li className="flex flex-row justify-between w-full mb-5">
                    <h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">category:</h1>
                    <div className="flex flex-col gap-5 w-1/2">
                        { categories.map((data,index)=>(
                            <p key={index} className="text-xs lg:text-lg text-left ">{data.CategoryName}</p>
                        ))}
                    </div>
                </li>

                <li className="flex flex-row justify-between w-full mb-5">
                    <h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Location:</h1>
                    <div className="flex flex-col gap-5 w-1/2">
                        { location.map((data,index)=>(
                            <p key={index} className="text-xs lg:text-lg text-left ">{data.Location.LocationName}</p>
                        ))}
                    </div>
                </li> 

                <li className="flex flex-row justify-between w-full mb-5">
                    <h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Career Level:</h1>
                    <p className="text-xs lg:text-lg text-left w-1/2">{job.CareerLevel}</p>
                </li>

                <li className="flex flex-row justify-between w-full mb-5">
                    <h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Salary:</h1>
                    <p className="text-xs lg:text-lg text-left w-1/2">{job.Salary}</p>
                </li>
            </ul>

            <div className="flex flex-col justify-between mt-10">
                <div className="fontSize ql-snow ql-editor !bg-transparent dark:!text-white mt-5 w-full" dangerouslySetInnerHTML={{ __html: job.Descreption }} />
            </div>
        </div>
	)
}