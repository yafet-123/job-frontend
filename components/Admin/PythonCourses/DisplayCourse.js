import React from "react";
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import { useRouter } from 'next/router'
import Image from 'next/image'
import {Deletecourse} from './Deletecourse'
import {UpdateCourse} from './UpdateCourse'

export function DisplayCourse({courses}) {
    const router = useRouter();
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deletecourseid,setdeletecourseid] = useState()
    const [updatecourseid,setupdatecourseid] = useState()
    const [updatetitle,setupdatetitle] = useState("")
    const [updatecontent, setupdatecontent] = useState("")
    const clickedFordelete = () => {
        setdeleteModalOn(true)
    }

    const clickedForupdate = () => {
        setupdateModalOn(true)
    }

    return (
        <div className="px-0 lg:px-10">
            <div className="m-2 lg:m-5">
                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-neutral-100 dark:bg-slate-800 border-b-2 border-gray-200">
                            <tr>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Id</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Title</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created By</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {courses.map(({course_id, title, createDate, ModifiedDate, userName, content},index)=>(
                                <tr key={index} className="even:bg-neutral-300 odd:bg-neutral-200 even:dark:bg-gray-900 odd:dark:bg-gray-800 w-full">
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <p className="font-bold text-[#009688] dark:text-white hover:underline">{course_id}</p>
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {title}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {moment(createDate).utc().format('YYYY-MM-DD')}
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {moment(ModifiedDate).utc().format('YYYY-MM-DD')}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {userName}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                clickedForupdate()
                                                setupdatecourseid(course_id)
                                                setupdatetitle(title)
                                                setupdatecontent(content)
                                            }}
                                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                            Edit
                                        </button>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <button 
                                            onClick={() => {
                                                clickedFordelete()
                                                setdeletecourseid(course_id)
                                            }}
                                            className="bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:scale-110 duration-1000 ease-in-out rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                    {courses.map(({course_id, title, createDate, ModifiedDate, userName, content},index)=>(
                        <div key={index} className="bg-neutral-100 dark:bg-slate-800 space-y-3 p-2 lg:p-4 rounded-lg shadow">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-[#009688] dark:text-white font-bold hover:underline">
                                        <span className="text-lg">Id : </span> 
                                        <span className="text-sm ">{course_id}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="font-bold text-gray-700 dark:text-white">
                                <span className="text-lg">Title : </span> 
                                <span className="text-sm ">{title}</span>
                            </div>

                            <div className="font-bold text-gray-700 dark:text-white">
                                <span className="text-lg">Created By : </span> 
                                <span className="text-sm ">{userName}</span>
                            </div>
                            <div className="font-bold text-black dark:text-white">
                                <span className="text-lg">createDate : </span> 
                                <span className="text-sm ">{moment(createDate).utc().format('YYYY-MM-DD')}</span>
                            </div>
                            <div className="font-bold text-black dark:text-white">
                                <span className="text-lg">Modified Date : </span> 
                                <span className="text-sm ">{moment(ModifiedDate).utc().format('YYYY-MM-DD')}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <button 
                                    onClick={() => {
                                        clickedForupdate()
                                        setupdatecourseid(course_id)
                                        setupdatetitle(title)
                                        setupdatecontent(content)
                                    }}
                                    className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                    Edit
                                </button>

                                <button 
                                    onClick={() => {
                                        clickedFordelete()
                                        setdeletecourseid(course_id)
                                    }}
                                    className="bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:scale-110 duration-1000 ease-in-out rounded">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {deletemodalOn && 
                <Deletecourse setdeleteModalOn={setdeleteModalOn} deletecourseid={deletecourseid} />
            }

            {updatemodalOn && 
                <UpdateCourse updatecourseid={updatecourseid} setupdateModalOn={setupdateModalOn} updatetitle={updatetitle} setupdatetitle={setupdatetitle} updatecontent={updatecontent} setupdatecontent={setupdatecontent} />
            }
        </div>
  );
}
