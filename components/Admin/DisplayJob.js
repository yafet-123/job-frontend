import React from "react";
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import { AiOutlineEye } from 'react-icons/ai'
import axios from 'axios';
import { useRouter } from 'next/router'
import Multiselect from 'multiselect-react-dropdown';


export function DisplayJob({jobs, categories}) {
    const router = useRouter();
    const [viewmodalOn, setviewModalOn] = useState(false);
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deletejobid,setdeletejobid] = useState()
    const [updatejobid,setupdatejobid] = useState()
    const [dataposttojob, setdataposttojob] = useState()
    const [view,setview] = useState()

    const [typechange , settypechange] = useState(true)
    const [CompanyName, setCompanyName] = useState("")
    const [Image, setImage] = useState("")
    const [JobsType, setJobsType] = useState("")
    const [Location, setLocation] = useState("")
    const [CareerLevel, setCareerLevel] = useState("")
    const [categoryId,setCategoryId] = useState([])
    const [EmploymentType, setEmploymentType] = useState("")
    const [Salary, setSalary] = useState("")
    const [Apply, setApply] = useState("")
    const [DeadLine, setDeadLine] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [Description , setDescription] = useState("")
    const [Requirement , setRequirement] = useState("")

    const clickedForview = () => {
        setviewModalOn(true)
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

    const handleOKClickFordelete = async() => {
        const data = await axios.delete(`api/deletejob/${deletejobid}`,{
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
        setdeleteModalOn(false)
        router.reload()
    }

    const handleOKClickForupdate = async() => {
        const data = await axios.patch(`api/updatejob/${updatejobid}`,{
            "CategoryName": updatecategoryname
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
        setupdateModalOn(false)
        router.reload()
    }

    const handleCancelClickFordelete = () => {
        setdeleteModalOn(false)
    }

    const handleCancelClickForupdate = () => {
        setupdateModalOn(false)
        setCategoryId([])
    }


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

    console.log(categoryId)
    
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

            {updatemodalOn && 
                <div className="bg-gray-200 dark:bg-slate-800 opacity-95 fixed inset-0 z-50 h-full  ">
                    <div className="flex h-full justify-center items-center">
                        <div className="flex-col w-full h-full mx-20 justify-center bg-gray-50 dark:bg-slate-500 py-5 px-24 border-4 border-sky-500 rounded-xl ">
                            <h1 className="text-2xl text-zinc-600 font-bold mb-3 dark:text-white text-center">Update Job</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-3">
                                <div className="relative mb-5">
                                    <input 
                                        id="CompanyName" 
                                        type="text" 
                                        className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                        value={CompanyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                    />
                                    <label 
                                        htmlFor="floating_outlined" 
                                        className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                    >
                                        Company Name
                                    </label>
                                </div>
                                
                                <div className="relative mb-5">
                                    <input 
                                        id="JobsType" 
                                        type="text" 
                                        className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                        value={JobsType}
                                        onChange={(e) => setJobsType(e.target.value)}
                                    />
                                    <label 
                                        htmlFor="floating_outlined" 
                                       className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                    >
                                        Jobs Type
                                    </label>
                                </div>

                                <div className="relative mb-5">
                                    <input 
                                        id="Location" 
                                        type="text" 
                                        className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                        value={Location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                    <label 
                                        htmlFor="floating_outlined" 
                                        className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                    >
                                        Location
                                    </label>
                                </div>

                                <div className="relative mb-5">
                                    <input 
                                        id="CareerLevel" 
                                        type="text" 
                                        className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                        value={CareerLevel}
                                        onChange={(e) => setCareerLevel(e.target.value)}
                                    />
                                    <label 
                                        htmlFor="floating_outlined" 
                                        className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                    >
                                        Career Level
                                    </label>
                                </div>

                                <div className="relative mb-5">
                                    <input 
                                        id="EmploymentType" 
                                        type="text" 
                                        className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                        value={EmploymentType}
                                        onChange={(e) => setEmploymentType(e.target.value)}
                                    />
                                    <label 
                                        htmlFor="floating_outlined" 
                                        className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                    >
                                        Employment Type
                                    </label>
                                </div>

                                <div className="relative mb-5">
                                    <input 
                                        id="Salary" 
                                        type="text" 
                                        className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                        value={Salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                    />
                                    <label 
                                        htmlFor="floating_outlined" 
                                        className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                    >
                                        Salary
                                    </label>
                                </div>

                                <div className="relative mb-5">
                                    <input 
                                        id="Apply" 
                                        type="text" 
                                        className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                        value={Apply}
                                        onChange={(e) => setApply(e.target.value)}
                                    />
                                    <label 
                                        htmlFor="floating_outlined" 
                                        className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                    >
                                        Apply
                                    </label>
                                </div>

                                <div className="relative mb-5">
                                    <input 
                                        id="DeadLine" 
                                        type={typechange ? "text" : "date"} 
                                        className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                        value={DeadLine}
                                        onChange={(e) => setDeadLine(e.target.value)}
                                        onClick = {()=> settypechange(false)}
                                    />
                                    <label 
                                        htmlFor="floating_outlined" 
                                        className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                    >
                                        DeadLine
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
                                <div className="relative mb-5">
                                    <textarea 
                                        id="Description" 
                                        rows="5" 
                                        cols="10"
                                        className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                        value={Description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <label 
                                        htmlFor="floating_outlined" 
                                        className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-10 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                    >
                                        Job Description
                                    </label>
                                </div>

                                <div className="relative mb-5">
                                    <textarea 
                                        id="Requirement"
                                        rows="5" 
                                        cols="10" 
                                        className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                        value={Requirement}
                                        onChange={(e) => setRequirement(e.target.value)}
                                    />
                                    <label 
                                        htmlFor="floating_outlined" 
                                        className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-10 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                    >
                                        Jobs Requirement
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
                                <Multiselect
                                    displayValue="CategoryName"
                                    placeholder = "updated Category"
                                    className="w-full px-3 text-xl text-black h-64 bg-gray-50 py-4 border-2 border-black rounded-xl appearance-none dark:text-black dark:bg-slate-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                                    onKeyPressFn={function noRefCheck(){}}
                                    onRemove={function noRefCheck(){}}
                                    onSearch={function noRefCheck(){}}
                                    onSelect={(e)=>{
                                        e.map((data,index)=>(
                                           setCategoryId([...categoryId, data.category_id])
                                        ))
                                    }}
                                    options={categories}
                                />

                                <div className="flex items-center justify-center w-full">
                                    <label 
                                        htmlFor="dropzone-file" 
                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-black border rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-slate-500 hover:bg-gray-100 dark:border-black dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <p className="text-lg text-black dark:text-white mb-5">Upload Company Image</p>
                                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                            <p className="mb-2 text-sm text-black dark:text-white"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div>
                            </div>

                            <div className="flex">
                                <button onClick={handleOKClickForupdate} className=" rounded px-4 py-4 text-white  bg-green-400 hover:bg-green-600">Yes</button>
                                <button onClick={handleCancelClickForupdate} className="rounded px-4 py-4 ml-4 text-white bg-blue-400 hover:bg-blue-600">No</button>
                            </div>
                         </div>
                    </div>
                </div>
            }

        </div>
    );
}
