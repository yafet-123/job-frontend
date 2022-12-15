import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';
import Image from 'next/image'
import { AiOutlineEye } from 'react-icons/ai'

export function DashBoard() {
    const [getSearchValue,setgetSearchValue] = useState("")
    const [searchValue,setsearchValue] = useState([])
    const [type,settype] = useState()
    const SearchList = [
        { type: 1, name: "User",},
        { type: 2, name: "Category",},
        { type: 3, name: "Job",},
        { type: 4, name: "Location",},
    ];

    // const searchaxios = axios.create({
    //     baseURL : api,
    // })
    

    async function handleSearch(e){
        settype(e)
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
        }).catch(function (error) {
            console.log(error);
        });
    }
    console.log(searchValue)
    return (
        <div className="mt-10 mx-10">
            <div className="max-w-7xl mx-auto ">
                <div className="flex flex-col lg:flex-row my-10 w-full">
                    <div className="relative flex-1">
                        <input 
                            id="search" 
                            type="text" 
                            className="block w-full px-3 text-xl text-black dark:text-white bg-gray-200 py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={getSearchValue}
                            onChange={(e) => setgetSearchValue(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-2xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Search
                        </label>
                    </div>
                    <div className="mx-2 mt-5 lg:mt-0 flex items-center justify-center">
                        <div className="dropdown inline-block relative">
                            <button className="flex justify-between rounded-xl w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-xl px-4 py-4 text-center inline-flex items-center">
                                <span className="mr-1">Search</span>
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                            </button>
                            <ul className="dropdown-menu absolute hidden text-black pt-1">
                                {SearchList.map((search, index) => (
                                    <li className="" key={index}>
                                        <button onClick={()=> handleSearch(search.type)} className="text-left text-xl w-32 bg-white hover:bg-gray-400 py-2 px-2">
                                            By {search.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>  
            </div>
            { type == 1 && <div className="my-5">
                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-slate-800 border-b-2 border-gray-200">
                            <tr>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">User Id</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">User Name</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {searchValue.map((data,index)=>(
                                <tr key={index} className="bg-white dark:bg-slate-900">
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                    {searchValue.map((data,index)=>(
                        <div class="bg-white dark:bg-slate-800 space-y-3 p-4 rounded-lg shadow">
                            <div class="flex items-center justify-between text-sm">
                              <div>
                                <p class="text-lg text-blue-500 dark:text-white font-bold hover:underline">{data.user_id}</p>
                              </div>
                              <div class="text-lg text-gray-700 dark:text-white font-bold">
                                User Name : {data.UserName}
                              </div>
                            </div>
                            <div class="text-sm text-black dark:text-white">
                              createDate : {moment(data.createDate).utc().format('YYYY-MM-DD')}
                            </div>
                            <div class="text-sm text-black dark:text-white">
                              Modified Date : {moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}
                            </div>
                        </div>
                    ))}
                </div>
            </div> }

            { type == 2 && <div className="my-5">
                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-slate-800 border-b-2 border-gray-200">
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
                                <tr key={index} className="bg-white dark:bg-slate-900">
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
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                    {searchValue.map((data,index)=>(
                        <div class="bg-white dark:bg-slate-800 space-y-3 p-4 rounded-lg shadow">
                            <div>
                                <p class="text-lg text-blue-500 dark:text-white font-bold hover:underline">{data.category_id}</p>
                            </div>
                            <div class="text-lg text-gray-700 dark:text-white font-bold">
                                Category Name : {data.CategoryName}
                            </div>
                            <div class="text-lg text-gray-700 dark:text-white font-bold">
                                Created By : {data.userName}
                            </div>
                            <div class="text-sm text-black dark:text-white">
                              createDate : {moment(data.createDate).utc().format('YYYY-MM-DD')}
                            </div>
                            <div class="text-sm text-black dark:text-white">
                              Modified Date : {moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}
                            </div>

                            <div class="flex items-center justify-between text-sm">
                                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                    Edit
                                </button>

                                <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div> }

            { type == 3 && <div className="my-5">
                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-slate-800 border-b-2 border-gray-200">
                            <tr>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Id</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Company Name</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Jobs Type</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Employment Type</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">DeadLine</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created By</th>
                              
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {searchValue.map((data,index)=>(
                                <tr key={index} className="bg-white dark:bg-slate-900">
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <p className="font-bold text-blue-500 dark:text-white hover:underline">{data.job_id}</p>
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {data.CompanyName}
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {data.JobsType}
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {data.EmploymentType}
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
                                        <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
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
            </div> }

            { type == 4 && <div className="my-5">
                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-slate-800 border-b-2 border-gray-200">
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
                                <tr key={index} className="bg-white dark:bg-slate-900">
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <p className="font-bold text-blue-500 dark:text-white hover:underline">{data.location_id}</p>
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {data.LocationName}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <Image src={data.Image} width={50} height={50} alt="image that will be displayed" />
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
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                    {searchValue.map((data,index)=>(
                        <div class="bg-white dark:bg-slate-800 space-y-3 p-4 rounded-lg shadow">
                            <div class="flex items-center justify-between text-sm">
                                <div>
                                    <p class="text-lg text-blue-500 dark:text-white font-bold hover:underline">{data.location_id}</p>
                                </div>
                                <Image src={data.Image} width={50} height={50} alt="image that will be displayed" />
                            </div>

                            <div class="text-lg text-gray-700 dark:text-white font-bold">
                                Category Name : {data.LocationName}
                            </div>

                            <div class="text-lg text-gray-700 dark:text-white font-bold">
                                Created By : {data.userName}
                            </div>
                            <div class="text-sm text-black dark:text-white">
                              createDate : {moment(data.createDate).utc().format('YYYY-MM-DD')}
                            </div>
                            <div class="text-sm text-black dark:text-white">
                              Modified Date : {moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}
                            </div>

                            <div class="flex items-center justify-between text-sm">
                                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                    Edit
                                </button>

                                <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div> }


        </div>
  );
}
