import React from "react";
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import { AiOutlineEye } from 'react-icons/ai'

export function DisplayJob({jobs}) {
    console.log(jobs)
    return (
        <div className="m-5">
            <div className="overflow-auto rounded-lg shadow hidden lg:block">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-slate-800 border-b-2 border-gray-200">
                        <tr>
                          <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Id</th>
                          <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Company Name</th>
                          <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Jobs Type</th>
                          <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                          <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                          <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created By</th>
                          
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {jobs.map((data,index)=>(
                            <tr key={index} className="even:bg-white odd:bg-gray-100 even:dark:bg-gray-900 odd:dark:bg-gray-800 w-full">
                                <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                    <p className="font-bold text-blue-500 dark:text-white hover:underline">{data.job_id}</p>
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
                                    {moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}
                                </td>
                                <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                    {data.userName}
                                </td>
                                <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap flex justify-center">
                                    <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
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
                    <div key={index} className="bg-white dark:bg-slate-800 space-y-3 p-4 rounded-lg shadow">
                        <div>
                            <p className="text-lg text-blue-500 dark:text-white font-bold hover:underline">{data.job_id}</p>
                        </div>
                        <div className="text-lg text-gray-700 dark:text-white font-bold">
                            Company Name : {data.CompanyName}
                        </div>
                        <div className="text-lg text-gray-700 dark:text-white font-bold">
                            Job Type : {data.JobsType}
                        </div>
                        <div className="text-lg text-gray-700 dark:text-white font-bold">
                            Employment Type : {data.EmploymentType}
                        </div>
                        <div className="text-lg text-black dark:text-white font-bold">
                          DeadLine : {moment(data.DeadLine).utc().format('YYYY-MM-DD')}
                        </div>
                        <div className="text-lg text-gray-700 dark:text-white font-bold">
                            Created By : {data.userName}
                        </div>
                        <div className="text-sm text-black dark:text-white">
                          createDate : {moment(data.createDate).utc().format('YYYY-MM-DD')}
                        </div>
                        <div className="text-sm text-black dark:text-white">
                          Modified Date : {moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-blue-500 rounded">
                                <AiOutlineEye size={30} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  );
}
