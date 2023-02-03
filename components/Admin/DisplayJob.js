import React from "react";
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import { AiOutlineEye } from 'react-icons/ai'
import axios from 'axios';
import { useRouter } from 'next/router'
import {ViewIndividualjob} from './ViewIndividualjob'
import Image from 'next/image'

export function DisplayJob({jobs, categories, locations}) {
    const router = useRouter();
    const [viewmodalOn, setviewModalOn] = useState(false);
    const [dataposttojob, setdataposttojob] = useState()
    const [view,setview] = useState()

    const clickedForview = () => {
        setviewModalOn(true)
    }

    return (
        <div className="m-2 lg:m-5">
            <div>
                <div className="overflow-auto rounded-lg shadow hidden lg:block">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-slate-800 border-b-2 border-gray-200">
                            <tr>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Id</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Company Logo</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Company Name</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Jobs Type</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created By</th>
                              
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {jobs.map((data,index)=>(
                                <tr key={index} className="even:bg-white odd:bg-gray-200 even:dark:bg-gray-900 odd:dark:bg-gray-800 w-full">
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <p className="font-bold text-blue-500 dark:text-white hover:underline">{data.job_id}</p>
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <Image src={data.Image == null ? "/images/bgImage1.avif" : data.Image} width={50} height={50} alt="image that will be displayed" />
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {data.CompanyName}
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white">
                                        <p className="w-full overflow-hidden">
                                            {data.JobsType}
                                        </p>
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {moment(data.createDate).utc().format('YYYY-MM-DD')}
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {data.userName}
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap flex justify-center">
                                        <button
                                            onClick={() => {
                                                clickedForview()
                                                setdataposttojob(data)
                                            }}
                                            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                                            <AiOutlineEye size={30} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
                    {jobs.map((data,index)=>(
                        <div key={index} className="bg-white dark:bg-slate-800 space-y-3 p-2 lg:p-4 rounded-lg shadow">
                            <div className="flex justify-between items-center">
                                <p className="text-blue-500 dark:text-white font-bold hover:underline">
                                    <span className="text-lg">Id : </span> 
                                    <span className="text-sm ">{data.job_id} </span>
                                </p>

                                
                            </div>

                            <Image src={data.Image == null ? "/images/bgImage1.avif" : data.Image} width={500} height={500} alt="image that will be displayed" />
                            
                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Company Name : </span> 
                                <span className="text-sm ">{data.CompanyName} </span>
                            </div>
                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Job Type : </span> 
                                <span className="text-sm ">{data.JobsType} </span> 
                            </div>
                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Employment Type : </span> 
                                <span className="text-sm ">{data.EmploymentType} </span>
                            </div>
                            <div className="text-black dark:text-white font-bold">
                                <span className="text-lg">DeadLine : </span> 
                                <span className="text-sm ">{moment(data.DeadLine).utc().format('YYYY-MM-DD')} </span>
                            </div>
                            <div className="text-lg text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Created By : </span> 
                                <span className="text-sm ">{data.userName} </span> 
                            </div>
                            <div className="text-black font-bold dark:text-white">
                                <span className="text-lg">createDate : </span> 
                                <span className="text-sm ">{moment(data.createDate).utc().format('YYYY-MM-DD')} </span> 
                            </div>
                            <div className="text-black font-bold dark:text-white">
                                <span className="text-lg">Modified Date : </span> 
                                <span className="text-sm ">{moment(data.ModifiedDate).utc().format('YYYY-MM-DD')} </span>   
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <button
                                    onClick={() => {
                                        clickedForview()
                                        setdataposttojob(data)
                                    }} 
                                    className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-blue-500 rounded">
                                    <AiOutlineEye size={30} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {viewmodalOn && 
                <ViewIndividualjob dataposttojob={dataposttojob} setviewModalOn={setviewModalOn} categories={categories} locations={locations} />
            }

            

        </div>
    );
}
