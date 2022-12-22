import React from "react";
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import { AiOutlineEye } from 'react-icons/ai'

export function DisplayJob({jobs}) {
    const [viewmodalOn, setviewModalOn] = useState(false);
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [deletejobid,setdeletejobid] = useState()
    const [dataposttojob, setdataposttojob] = useState()
    const [view,setview] = useState()

    const clickedForview = () => {
        setviewModalOn(true)
    }

    const handleCancelClickForview = () => {
        setviewModalOn(false)
    }

    const clickedFordelete = () => {
        setdeleteModalOn(true)
    }

    const handleOKClickFordelete = async() => {
        const data = await axios.delete(`api/deletelocation/${deletelocationid}`,{
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
        setdeleteModalOn(false)
        router.reload()
    }

    const handleCancelClickFordelete = () => {
        setdeleteModalOn(false)
    }
    return (
        <div className="m-5">
            <div>
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
                                <tr key={index} className="even:bg-white odd:bg-gray-200 even:dark:bg-gray-900 odd:dark:bg-gray-800 w-full">
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
                <div className="bg-gray-200 dark:bg-slate-800 opacity-96 fixed inset-0 z-50">
                    <div className="flex h-screen justify-center items-center ">
                        <div className="flex-col w-full h-full mx-10 justify-center bg-gray-50 dark:bg-slate-500 py-5 px-24 border-4 border-sky-500 rounded-xl ">
                            <h1 className="text-2xl text-zinc-600 font-bold mb-10 dark:text-white text-center">Detail Job</h1>
                            <div className="flex flex-col justify-between">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
                                    <h1 className="flex flex-col font-bold hover:underline">
                                        <span className="text-left text-xl text-blue-500 dark:text-blue-500 mb-3">Id</span>
                                        <span className="text-lg text-black dark:text-white">{dataposttojob.job_id}</span>
                                    </h1>

                                    <h1 className="flex flex-col font-bold hover:underline">
                                        <span className="text-left text-xl text-blue-500 dark:text-blue-500 mb-3">Created Date</span>
                                        <span className="text-lg text-black dark:text-white">{moment(dataposttojob.CreatedDate).utc().format('YYYY-MM-DD')}</span>
                                    </h1>

                                    <h1 className="flex flex-col font-bold hover:underline">
                                        <span className="text-left text-xl text-blue-500 dark:text-blue-500 mb-3">Modified Date</span>
                                        <span className="text-lg text-black dark:text-white">{moment(dataposttojob.ModifiedDate).utc().format('YYYY-MM-DD')}</span>
                                    </h1>
                                    
                                    <h1 className="flex flex-col font-bold hover:underline">
                                        <span className="text-left text-xl text-blue-500 dark:text-blue-500 mb-3 text-right">Created By</span>
                                        <span className="text-lg text-black dark:text-white text-right">{dataposttojob.userName}</span>
                                    </h1>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
                                    <h1 className="flex flex-col font-bold hover:underline">
                                        <span className="text-left text-xl text-blue-500 dark:text-blue-500 mb-3">Company Name</span>
                                        <span className="text-lg text-black dark:text-white">{dataposttojob.CompanyName}</span>
                                    </h1>

                                    <h1 className="flex flex-col font-bold hover:underline">
                                        <span className="text-left text-xl text-blue-500 dark:text-blue-500 mb-3">Career Level</span>
                                        <span className="text-lg text-black dark:text-white">{dataposttojob.CareerLevel}</span>
                                    </h1>

                                    <h1 className="flex flex-col font-bold hover:underline">
                                        <span className="text-left text-xl text-blue-500 dark:text-blue-500 mb-3">Employment Type</span>
                                        <span className="text-lg text-black dark:text-white">{dataposttojob.EmploymentType}</span>
                                    </h1>
                                    
                                    <h1 className="flex flex-col font-bold hover:underline">
                                        <span className="text-left text-xl text-blue-500 dark:text-blue-500 mb-3 text-right">Jobs Type</span>
                                        <span className="text-lg text-black dark:text-white text-right">{dataposttojob.JobsType}</span>
                                    </h1>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
                                    <h1 className="flex flex-col font-bold hover:underline">
                                        <span className="text-left text-xl text-blue-500 dark:text-blue-500 mb-3">Salary</span>
                                        <span className="text-lg text-black dark:text-white">{dataposttojob.Salary}</span>
                                    </h1>

                                    <h1 className="flex flex-col font-bold hover:underline">
                                        <span className="text-left text-xl text-blue-500 dark:text-blue-500 mb-3">DeadLine</span>
                                        <span className="text-lg text-black dark:text-white">{moment(dataposttojob.DeadLine).utc().format('YYYY-MM-DD')}</span>
                                    </h1>

                                    <h1 className="flex flex-col font-bold hover:underline">
                                        <span className="text-left text-xl text-blue-500 dark:text-blue-500 mb-3">Apply</span>
                                        <span className="text-lg text-black dark:text-white">{dataposttojob.Apply}</span>
                                    </h1>
                                    
                                    <h1 className="flex flex-col font-bold hover:underline">
                                        <span className="text-left text-xl text-blue-500 dark:text-blue-500 mb-3 text-right">Location</span>
                                        <span className="text-lg text-black dark:text-white text-right">{dataposttojob.Location}</span>
                                    </h1>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-5">
                                    <h1 className="flex flex-col font-bold">
                                        <span className="text-left text-xl text-blue-500 dark:text-blue-500 mb-3">JobsDescreption</span>
                                        <div 
                                            className="h-52 w-full text-lg text-black dark:text-white overflow-y-scroll" 
                                            dangerouslySetInnerHTML={{ __html: dataposttojob.JobsRequirement }} 
                                        />
                                    </h1>

                                    <h1 className="flex flex-col font-bold">
                                        <span className="text-left text-xl text-blue-500 dark:text-blue-500 mb-3">JobsRequirement</span>
                                        <div 
                                            className="h-52 w-full text-lg text-black dark:text-white overflow-y-scroll" 
                                            dangerouslySetInnerHTML={{ __html: dataposttojob.JobsDescreption }} 
                                        />
                                    </h1>
                                </div>
                            </div>
                            <div className="flex float-right">
                                <button onClick={handleCancelClickForview} className="rounded px-4 py-4 ml-4 text-white bg-green-400 hover:bg-green-600">Edit</button>
                                <button onClick={handleCancelClickForview} className="rounded px-4 py-4 ml-4 text-white bg-red-400 hover:bg-red-600">Delete</button>
                                <button onClick={handleCancelClickForview} className="rounded px-4 py-4 ml-4 text-white bg-blue-400 hover:bg-blue-600">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {deletemodalOn && 
                <div className="bg-gray-200 dark:bg-slate-800 opacity-90 fixed inset-0 z-50   ">
                    <div className="flex h-screen justify-center items-center ">
                        <div className="flex-col justify-center bg-white dark:bg-slate-500 py-24 px-24 border-4 border-sky-500 rounded-xl ">
                            <div className="flex text-xl text-zinc-600 font-bold mb-10 dark:text-white" >Are you sure You want to delete Category Name ?</div>
                            <div className="flex">
                                <button onClick={handleOKClickFordelete} className=" rounded px-4 py-4 text-white  bg-green-400 hover:bg-green-600">Yes</button>
                                <button onClick={handleCancelClickFordelete} className="rounded px-4 py-4 ml-4 text-white bg-blue-400 hover:bg-blue-600">No</button>
                            </div>
                         </div>
                    </div>
                </div>
            }

        </div>
    );
}
