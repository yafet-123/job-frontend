import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';
import Image from 'next/image'
import { AiOutlineEye } from 'react-icons/ai'

export function DashBoard({categories}) {
    const [getSearchValue,setgetSearchValue] = useState("")
    const [dataposttojob, setdataposttojob] = useState()
    const [viewmodalOnforjob, setviewModalOnforjob] = useState(false);
    const [searchValue,setsearchValue] = useState([])
    const [error , seterror] = useState("")
    const [type,settype] = useState()
    const [deletemodalOnforcategory, setdeleteModalOnforcategory] = useState(false);
    const [updatemodalOnforcategory, setupdateModalOnforcategory] = useState(false);
    const [deletecategoryid,setdeletecategoryid] = useState()
    const [updatecategoryid,setupdatecategoryid] = useState()
    const [deletelocationid,setdeletelocationid] = useState()
    const [updatelocationid,setupdatelocationid] = useState()
    const [updatelocationname,setupdatelocationname] = useState("")
    const [updatecategoryname,setupdatecategoryname] = useState("")
    const [deletemodalOnforlocation, setdeleteModalOnforlocation] = useState(false);
    const [updatemodalOnforlocation, setupdateModalOnforlocation] = useState(false);
    const [deleteuserid,setdeleteuserid] = useState()
    const [updateuserid,setupdateuserid] = useState()
    const [updateemail, setupdateemail] = useState("")
    const [updateusername,setupdateusername] = useState("")
    const [deletemodalOnforuser, setdeleteModalOnforuser] = useState(false);
    const [updatemodalOnforuser, setupdateModalOnforuser] = useState(false);
    const SearchList = [
        { type: 1, name: "User",},
        { type: 2, name: "Category",},
        { type: 3, name: "Job",},
        { type: 4, name: "Location",},
    ];

    // const searchaxios = axios.create({
    //     baseURL : api,
    // })
     
    const clickedForview = () => {
        setviewModalOnforjob(true)
    }   

    async function handleSearch(e){
        settype(e)
        if(getSearchValue == ""){
            seterror("Please Insert a Value")
        }else{
            const data = await axios.post(`api/searchAdmin`,{
                "searchName": getSearchValue,
                "type": e
            }).then(function (response) {
                const objOneData = response.data
                if(Array.isArray(objOneData)){
                    setsearchValue(objOneData)
                }else{
                    const values = []
                    values.push(objOneData)
                    setsearchValue(values)
                }
                seterror("")
                
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    const clickedFordeleteforuser = () => {
        setdeleteModalOnforuser(true)
    }

    const clickedForupdateforuser = () => {
        setupdateModalOnforuser(true)
    }

    const clickedFordelete = () => {
        setdeleteModalOnforcategory(true)
    }

    const clickedForupdate = () => {
        setupdateModalOnforcategory(true)
    }

    const clickedFordeleteforlocation = () => {
        setdeleteModalOnforlocation(true)
    }

    const clickedForupdateforlocation = () => {
        setupdateModalOnforlocation(true)
    }

    return (
        <div className="mt-10 mx-1 lg:mx-3 lg:mx-10 h-full">
            <div className="max-w-7xl mx-auto ">
                <div className="flex flex-col lg:flex-row my-10 w-full">
                    <div className="relative flex-1">
                        <input 
                            id="search" 
                            type="text" 
                            className="block w-full px-2 lg:px-3 text-md lg:text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={getSearchValue}
                            onChange={(e) => setgetSearchValue(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-300 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Search
                        </label>
                    </div>
                    <div className="lg:mx-2 mt-5 lg:mt-0 flex items-center justify-center">
                        <div className="dropdown inline-block relative">
                            <button className="flex justify-between rounded-xl w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-md lg:text-xl px-2 lg:px-4 py-4 text-center inline-flex items-center">
                                <span className="mr-1">Search</span>
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                            </button>
                            <ul className="dropdown-menu absolute hidden text-black pt-1">
                                {SearchList.map((search, index) => (
                                    <li className="" key={index}>
                                        <button onClick={()=> handleSearch(search.type)} className="text-left text-md lg:text-xl w-32 bg-white hover:bg-gray-400 py-2 px-2">
                                            By {search.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>  
            </div>

            { error == "" ? 
                <div>
                    { searchValue == "" ? 
                        <h1 className="text-black dark:text-white text-md lg:text-xl font-bold text-center italic">
                            No data can be found
                        </h1>
                        :
                        <div>
                            { type == 1 && 
                                <div className="my-5">
                                    <div className="overflow-auto rounded-lg shadow hidden md:block">
                                        <table className="w-full">
                                            <thead className="bg-neutral-100 dark:bg-slate-800 border-b-2 border-gray-200">
                                                <tr>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">User Id</th>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">User Name</th>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {searchValue.map((data,index)=>(
                                                    <tr key={index} className="even:bg-neutral-100 odd:bg-neutral-300 even:dark:bg-gray-900 odd:dark:bg-gray-800 w-full">
                                                        <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                                            <p className="font-bold text-blue-500 dark:text-white hover:underline">{data.user_id}</p>
                                                        </td>
                                                        <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                                            {data.UserName}
                                                        </td>
                                                        <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                                            {moment(data.createDate).utc().format('YYYY-MM-DD')}
                                                        </td>
                                                        <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                                            {moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}
                                                        </td>
                                                        <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                                            <button
                                                                onClick={() => {
                                                                    clickedForupdateforuser()
                                                                    setupdateuserid(data.user_id)
                                                                    setupdateusername(data.UserName)
                                                                    setupdateemail(data.email)
                                                                }} 
                                                                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                                                Edit
                                                            </button>
                                                        </td>

                                                        <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                                            <button 
                                                                onClick={() => {
                                                                    clickedFordeleteforuser()
                                                                    setdeleteuserid(data.user_id)
                                                                }}
                                                                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                                        {searchValue.map((data,index)=>(
                                            <div key={index} className="bg-neutral-100 dark:bg-slate-800 space-y-3 p-2 lg:p-4 rounded-lg shadow overflow-scroll">
                                                <div>
                                                    <p className="text-blue-500 dark:text-white font-bold hover:underline">
                                                        <span className="text-lg">Id : </span> 
                                                        <span className="text-sm ">{data.user_id}</span>
                                                    </p>
                                                </div>
                                                <div className="text-gray-700 dark:text-white font-bold">
                                                    <span className="text-lg">User Name : </span>
                                                    <span className="text-md">{data.UserName} </span>
                                                </div>

                                                <div className="text-md lg:text-lg text-gray-700 dark:text-white font-bold break-words ">
                                                    Email : <span className={ `font-normal font-medium ${data.email ? " " : "text-red-800"}`}>
                                                        { data.email ? data.email : "No Email Address" }
                                                    </span>
                                                </div>

                                                <div className="text-black font-bold dark:text-white">
                                                  <span className="text-lg">createDate : </span>
                                                  <span className="text-sm">{moment(data.createDate).utc().format('YYYY-MM-DD')}</span>
                                                </div>
                                                <div className="text-black font-bold dark:text-white">
                                                  <span className="text-lg">Modified Date : </span>
                                                  <span className="text-sm">{moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <button
                                                        onClick={() => {
                                                            clickedForupdateforuser()
                                                            setupdateuserid(data.user_id)
                                                            setupdateusername(data.UserName)
                                                            setupdateemail(data.email)
                                                        }}  
                                                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            clickedFordeleteforuser()
                                                            setdeleteuserid(data.user_id)
                                                        }} 
                                                        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div> 
                            }

                            { type == 2 && 
                                <div className="my-5">
                                    <div className="overflow-auto rounded-lg shadow hidden md:block">
                                        <table className="w-full">
                                            <thead className="bg-neutral-100 dark:bg-slate-800 border-b-2 border-gray-200">
                                                <tr>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Id</th>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Category Name</th>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created By</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {searchValue.map((data,index)=>(
                                                    <tr key={index} className="even:bg-neutral-300 odd:bg-neutral-200 even:dark:bg-gray-900 odd:dark:bg-gray-800 w-full">
                                                        <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                                            <p className="font-bold text-blue-500 dark:text-white hover:underline">{data.category_id}</p>
                                                        </td>
                                                        <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                                            {data.CategoryName}
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

                                                        <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                                            <button 
                                                                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                                                Edit
                                                            </button>
                                                        </td>

                                                        <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                                            <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                                        {searchValue.map((data,index)=>(
                                            <div key={index} className="bg-neutral-100 dark:bg-slate-800 space-y-3 p-2 lg:p-4 rounded-lg shadow">
                                                <div>
                                                    <p className="text-blue-500 dark:text-white font-bold hover:underline">
                                                        <span className="text-lg">Id : </span> 
                                                        <span className="text-sm ">{data.category_id}</span>
                                                    </p>
                                                </div>
                                                <div className="text-gray-700 dark:text-white font-bold">
                                                    <span className="text-lg">Category Name : </span>
                                                    <span className="text-sm ">{data.CategoryName}</span>
                                                </div>
                                                <div className="text-gray-700 dark:text-white font-bold">
                                                    <span className="text-lg">Created By : </span>
                                                    <span className="text-sm ">{data.userName}</span>
                                                </div>
                                                <div className="text-black font-bold dark:text-white">
                                                    <span className="text-lg">createDate : </span>
                                                    <span className="text-sm ">{moment(data.createDate).utc().format('YYYY-MM-DD')}</span>
                                                </div>
                                                <div className="text-black font-bold dark:text-white">
                                                    <span className="text-lg">Modified Date : </span>
                                                    <span className="text-sm">{moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}</span>
                                                </div>

                                                <div className="flex items-center justify-between text-sm">
                                                    <button
                                                        onClick={() => {
                                                            clickedForupdate()
                                                            setupdatecategoryid(data.category_id)
                                                            setupdatecategoryname(data.CategoryName) 
                                                        }}
                                                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            clickedFordelete()
                                                            setdeletecategoryid(data.category_id)
                                                        }} 
                                                        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div> 
                            }

                            { type == 3 && 
                                <div className="my-5">
                                    <div className="overflow-auto rounded-lg shadow hidden md:block">
                                        <table className="w-full">
                                            <thead className="bg-neutral-100 dark:bg-slate-800 border-b-2 border-gray-200">
                                                <tr>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Id</th>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Company Name</th>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Jobs Type</th>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">DeadLine</th>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created By</th>
                                                  
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {searchValue.map((data,index)=>(
                                                    <tr key={index} className="even:bg-neutral-300 odd:bg-neutral-200 even:dark:bg-gray-900 odd:dark:bg-gray-800 w-full">
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
                                                            {moment(data.DeadLine).utc().format('YYYY-MM-DD')}
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
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                                        {searchValue.map((data,index)=>(
                                            <div key={index} className="bg-neutral-100 dark:bg-slate-800 space-y-3 p-4 rounded-lg shadow">
                                                <div>
                                                    <p className="text-blue-500 dark:text-white font-bold hover:underline">
                                                        <span className="text-lg">Id : </span> 
                                                        <span className="text-sm ">{data.job_id} </span>
                                                    </p>
                                                </div>
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
                            }

                            { type == 4 && 
                                <div className="my-5">
                                    <div className="overflow-auto rounded-lg shadow hidden md:block">
                                        <table className="w-full">
                                            <thead className="bg-neutral-100 dark:bg-slate-800 border-b-2 border-gray-200">
                                                <tr>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Id</th>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Location Name</th>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Image</th>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                                                  <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created By</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {searchValue.map((data,index)=>(
                                                    <tr key={index} className="even:bg-neutral-300 odd:bg-neutral-200 even:dark:bg-gray-900 odd:dark:bg-gray-800 w-full">
                                                        <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                                            <p className="font-bold text-blue-500 dark:text-white hover:underline">{data.location_id}</p>
                                                        </td>
                                                        <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                                            {data.LocationName}
                                                        </td>

                                                        <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                                            <Image src={data.Image == null ? "/images/bgImage1.avif" : data.Image} width={50} height={50} alt="image that will be displayed" />
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

                                                        <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                                            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                                                Edit
                                                            </button>
                                                        </td>

                                                        <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                                            <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                                        {searchValue.map((data,index)=>(
                                            <div key={index} className="bg-neutral-100 dark:bg-slate-800 space-y-3 p-2 lg:p-4 rounded-lg shadow">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-blue-500 dark:text-white font-bold hover:underline">
                                                            <span className="text-lg">Id : </span> 
                                                            <span className="text-sm ">{data.location_id}</span>
                                                        </p>
                                                    </div>

                                                    <Image src={data.Image == null ? "/images/bgImage1.avif" : data.Image} width={50} height={50} alt="image that will be displayed" />
                                                </div>

                                                <div className="font-bold text-gray-700 dark:text-white">
                                                    <span className="text-lg">Category Name : </span> 
                                                    <span className="text-sm ">{data.LocationName}</span>
                                                </div>
                                                <div className="font-bold text-gray-700 dark:text-white">
                                                    <span className="text-lg">Created By : </span> 
                                                    <span className="text-sm ">{data.userName}</span>
                                                </div>
                                                <div className="font-bold text-black dark:text-white">
                                                    <span className="text-lg">createDate : </span> 
                                                    <span className="text-sm ">{moment(data.createDate).utc().format('YYYY-MM-DD')}</span>
                                                </div>
                                                <div className="font-bold text-black dark:text-white">
                                                    <span className="text-lg">Modified Date : </span> 
                                                    <span className="text-sm ">{moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}</span>
                                                </div>

                                                <div className="flex items-center justify-between text-sm">
                                                    <button 
                                                        onClick={() => {
                                                            clickedForupdateforlocation()
                                                            setupdatelocationid(data.location_id)
                                                            setupdatelocationname(data.LocationName)
                                                        }}
                                                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                                        Edit
                                                    </button>

                                                    <button 
                                                        onClick={() => {
                                                            clickedFordeleteforlocation()
                                                            setdeletelocationid(data.location_id)
                                                        }}
                                                        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div> 
                            }
                        </div>
                    }
                </div>
                :
                <h1 className="text-black dark:text-white text-md lg:text-xl font-bold text-center italic">{error}</h1>
            }
        </div>
  );
}
