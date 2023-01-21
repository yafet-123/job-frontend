import moment from 'moment';
import {DeleteJob} from './DeleteJob'
import React from "react";
import { useState,useEffect, useContext} from 'react'

export function ViewIndividualjob({dataposttojob, setviewModalOn}) {
	const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deletejobid,setdeletejobid] = useState()
    const [updatejobid,setupdatejobid] = useState()

	function handleingUpdateChange(dataposttojob){
        let categories = [] 
        console.log(dataposttojob)
        categories = dataposttojob.categories
        clickedForupdate()
        setupdatejobid(dataposttojob.job_id)
        setCompanyName(dataposttojob.CompanyName)
        setJobsType(dataposttojob.JobsType)
        setLocation(dataposttojob.Location)
        setCareerLevel(dataposttojob.CareerLevel)
        setEmploymentType(dataposttojob.EmploymentType)
        setSalary(dataposttojob.Salary)
        setDescription(dataposttojob.JobsDescreption)
        setRequirement(dataposttojob.JobsRequirement)
        setDeadLine(dataposttojob.DeadLine)
        setApply(dataposttojob.Apply)

        for (let j = 0; j < categories.length; j++) {
            setCategoryId(categoryId => [...categoryId, categories[j].category_id])
        }
        
    }

    const handleCancelClickForview = () => {
        setviewModalOn(false)
    }

    const clickedFordelete = () => {
        setdeleteModalOn(true)
    }

    const clickedForupdate = () => {
        setupdateModalOn(true)
    }

	return(
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
                        <button 
                            onClick={
                                () => { 
                                    handleingUpdateChange(dataposttojob) 
                                    setupdatejobid(dataposttojob.job_id)
                                }
                            }
                            className="rounded px-4 py-4 ml-4 text-white bg-green-400 hover:bg-green-600"
                       	>
                            Edit
                       	</button>
                       	<button onClick={() => {
                       	        clickedFordelete()
                       	        setdeletejobid(dataposttojob.job_id)
                       	    }} 
                       	    className="rounded px-4 py-4 ml-4 text-white bg-red-400 hover:bg-red-600"
                       	>
                       	    Delete
                       	</button>
                       	<button onClick={handleCancelClickForview} className="rounded px-4 py-4 ml-4 text-white bg-blue-400 hover:bg-blue-600">Cancel</button>
                    </div>
                </div>
            </div>

            {deletemodalOn && 
                <DeleteJob setdeleteModalOn={setdeleteModalOn} deletejobid={deletejobid}/>
            }

            {updatemodalOn && 
                mhb
            }

        </div>
	)
}