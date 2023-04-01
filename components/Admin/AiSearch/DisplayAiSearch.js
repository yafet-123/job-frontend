import React from "react";
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import {DeleteAiSearch} from './DeleteAiSearch'
import {UpdateAiSearch} from './UpdateAiSearch'

export function DisplayAiSearch({categories,allaiserachdata}) {
    console.log(allaiserachdata)
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deleteaisearchid,setdeleteaisearchid] = useState()
    const [updateaisearchid,setupdateaisearchid] = useState()
    const [updateHeader,setupdateHeader] = useState("")
    const [updatelink,setupdatelink] = useState("")
    const [updatedescription,setupdatedescription] = useState("")
    const [updateservice,setupdateservice] = useState([])
    const [updatelike,setupdatelike] = useState("")
    const [updatecategory,setupdatecategory] = useState([])
    const clickedFordelete = () => {
        setdeleteModalOn(true)
    }

    const clickedForupdate = () => {
        setupdateModalOn(true)
    }
    return (
        <div className="px-5 mb-10">
            <div className="">
                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-neutral-100 dark:bg-slate-800 border-b-2 border-gray-200">
                            <tr>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Id</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Header</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Link</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created By</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {allaiserachdata.map(({description,detail_id,Header,link,like,service,createdAt,updatedAt,userName, Category},index)=>(
                                <tr key={index} className="even:bg-neutral-300 odd:bg-neutral-200 even:dark:bg-gray-900 odd:dark:bg-gray-800 w-full">
                                    <td className="py-3 px-1 text-lg text-gray-700">
                                        <p className="font-bold text-[#009688] dark:text-white hover:underline">{detail_id}</p>
                                    </td>
                                    <td className="py-3 px-1 text-lg text-gray-700 dark:text-white">
                                        {Header}
                                    </td>
                                    <td className="py-3 px-1 text-lg text-gray-700 dark:text-white">
                                        {link}
                                    </td>

                                    <td className="py-3 px-1 text-lg text-gray-700 dark:text-white">
                                        {moment(createdAt).utc().format('YYYY-MM-DD')}
                                    </td>
                                    <td className="py-3 px-1 text-lg text-gray-700 dark:text-white">
                                        {moment(updatedAt).utc().format('YYYY-MM-DD')}
                                    </td>

                                    <td className="py-3 px-1 text-lg text-gray-700 dark:text-white">
                                        {userName}
                                    </td>

                                    <td className="py-3 px-1 text-lg text-gray-700 dark:text-white">
                                        <button
                                            onClick={() => {
                                                clickedForupdate()
                                                setupdateaisearchid(detail_id)
                                                setupdateHeader(Header)
                                                setupdatelink(link)
                                                setupdatedescription(description)
                                                setupdateservice(service)
                                                setupdatelike(like)
                                                setupdatecategory(Category)
                                            }}
                                            className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                            Edit
                                        </button>
                                    </td>

                                    <td className="py-3 px-1 text-lg text-gray-700 dark:text-white">
                                        <button 
                                            onClick={() => {
                                                clickedFordelete()
                                                setdeleteaisearchid(detail_id)
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
                    {allaiserachdata.map(({description,detail_id,Header,link,service,like,createdAt,updatedAt,userName,Category},index)=>(
                        <div key={index} className="bg-neutral-200 dark:bg-slate-800 space-y-3 p-2 lg:p-4 rounded-lg shadow">
                            <div>
                                <p className="text-[#009688] dark:text-white font-bold hover:underline">
                                    <span className="text-lg">Id : </span> 
                                    <span className="text-sm ">{detail_id}</span>
                                </p>
                            </div>
                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Header : </span>
                                <span className="text-sm ">{Header}</span>
                            </div>

                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Link : </span>
                                <span className="text-sm ">{link}</span>
                            </div>

                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Service : </span>
                                <span className="text-sm ">
                                    { service.map((data,index)=>(
                                        <p key={index}>{data}</p>
                                    ))}
                                </span>
                            </div>

                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Created By : </span>
                                <span className="text-sm ">{userName}</span>
                            </div>
                            <div className="text-gray-700 font-bold dark:text-white">
                                <span className="text-lg">createDate : </span>
                                <span className="text-sm ">{moment(createdAt).utc().format('YYYY-MM-DD')}</span>
                            </div>
                            <div className="text-gray-700 font-bold dark:text-white">
                                <span className="text-lg">Modified Date : </span>
                                <span className="text-sm">{moment(updatedAt).utc().format('YYYY-MM-DD')}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <button
                                    onClick={() => {
                                        clickedForupdate()
                                        setupdateaisearchid(detail_id)
                                        setupdateHeader(Header)
                                        setupdatelink(link)
                                        setupdatedescription(description)
                                        setupdateservice(service)
                                        setupdatelike(like)
                                        setupdatecategory(Category)

                                    }} 
                                    className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        clickedFordelete()
                                        setdeleteaisearchid(detail_id)
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
                <DeleteAiSearch setdeleteModalOn={setdeleteModalOn} deleteaisearchid={deleteaisearchid}/>
            }

            {updatemodalOn && 
                <UpdateAiSearch 
                    categories={categories}
                    setupdateModalOn={setupdateModalOn} 
                    updateaisearchid = {updateaisearchid}
                    setupdateaisearchid = {setupdateaisearchid}
                    updateHeader = {updateHeader}
                    setupdateHeader = {setupdateHeader}
                    updatelink = {updatelink}
                    setupdatelink = {setupdatelink}
                    updatedescription = {updatedescription}
                    setupdatedescription = {setupdatedescription}
                    updateservice = {updateservice}
                    updatelike = {updatelike}
                    setupdatelike = {setupdatelike}
                    updatecategory = {updatecategory}
                />
            }
        </div>
  );
}
