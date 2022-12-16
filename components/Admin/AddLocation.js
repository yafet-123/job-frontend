import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router'

export function AddLocation({locations}) {
    const router = useRouter();
    const [LocationName, setLocationName] = useState("")
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deletecategoryid,setdeletecategoryid] = useState()
    const [updatecategoryid,setupdatecategoryid] = useState()
    const [updatecategoryname,setupdatecategoryname] = useState("")

    async function registerCategory(){
        const data = await axios.post(`api/addCtegory`,{
            "CategoryName": category,
            "user_id": 20
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
        router.reload()
    }

    const clickedFordelete = () => {
        setdeleteModalOn(true)
    }

    const clickedForupdate = () => {
        setupdateModalOn(true)
    }

    const handleOKClickFordelete = async() => {
        const data = await axios.delete(`api/deletecategory/${deletecategoryid}`,{
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
        setdeleteModalOn(false)
        router.reload()
    }
    
    const handleOKClickForupdate = async() => {
        const data = await axios.patch(`api/updateCategory/${updatecategoryid}`,{
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
    }

    return (
        <div className="">
            <div className="max-w-7xl mx-auto mt-10">
                <h1 className="text-black dark:text-white text-4xl font-bold text-center italic">Location</h1>
                <div className="flex flex-col my-10 w-full px-2">
                    <div className="relative flex-1">
                        <input 
                            id="LocationName" 
                            type="text" 
                            className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={LocationName}
                            onChange={(e) => setLocationName(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-2xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Location Name
                        </label>
                    </div>

                    <div className="grid grid-cols-1 gap-5 my-10">
                        <div className="flex items-center justify-center w-full">
                            <label 
                                htmlFor="dropzone-file" 
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-black border rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-gray-100 dark:border-black dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <p className="text-lg text-black dark:text-white mb-5">Upload Location Image</p>
                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-black dark:text-white"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div>
                    </div>

                    
                    <button 
                        onClick={()=> registerCategory() }
                        className="float-right mx-2 flex justify-between rounded-xl w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-xl px-4 py-4 text-center inline-flex items-center"
                    >
                        Submit
                    </button>
                    
                </div>
            </div>

            <div className="m-5">
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
                            {locations.map((data,index)=>(
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
                                        <button
                                            onClick={() => {
                                                clickedForupdate()
                                                setupdatecategoryid(data.category_id)
                                                setupdatecategoryname(data.CategoryName)
                                            }}
                                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                            Edit
                                        </button>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <button 
                                            onClick={() => {
                                                clickedFordelete()
                                                setdeletecategoryid(data.category_id)
                                            }}
                                            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                    {categories.map((data,index)=>(
                        <div key={index} className="bg-white dark:bg-slate-800 space-y-3 p-4 rounded-lg shadow">
                            <div>
                                <p className="text-lg text-blue-500 dark:text-white font-bold hover:underline">{data.category_id}</p>
                            </div>
                            <div className="text-lg text-gray-700 dark:text-white font-bold">
                                Category Name : {data.CategoryName}
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
            </div>

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
                <div className="bg-gray-200 dark:bg-slate-800 opacity-95 fixed inset-0 z-50   ">
                    <div className="flex h-screen justify-center items-center ">
                        <div className="flex-col justify-center bg-white dark:bg-slate-500 py-24 px-24 border-4 border-sky-500 rounded-xl ">
                            <div className="flex text-center text-xl text-zinc-600 font-bold mb-10 dark:text-white" >Update Category</div>
                            <div className="flex flex-col justify-between items-center">
                                <div className="relative mb-10">
                                    <input 
                                        id="username" 
                                        type="text" 
                                        className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                        value={updatecategoryname}
                                        onChange={(e) => setupdatecategoryname(e.target.value)}
                                    />
                                    <label 
                                        htmlFor="floating_outlined" 
                                        className="absolute text-2xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                    >
                                        Category Name
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
