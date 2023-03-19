import React from "react";
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import { AiOutlineEye } from 'react-icons/ai'
import axios from 'axios';
import { useRouter } from 'next/router'
import Image from 'next/image'
import {DeleteNews} from './DeleteNews'
import {UpdateNews} from './UpdateNews'

export function DisplayNews({news, categories}) {
    const router = useRouter();
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deletenewsid,setdeletenewsid] = useState()
    const [updatenewsid,setupdatenewsid] = useState()
    const [updateheader,setupdateheader] = useState("")
    const [updateShortDescription,setupdateShortDescription] = useState("")
    const [updateDescription,setupdateDescription] = useState("")
    
    const clickedFordelete = () => {
        setdeleteModalOn(true)
    }

    const clickedForupdate = () => {
        setupdateModalOn(true)
    }

    return (
        <div className="m-2 lg:m-5 pt-10">
            <div>
                <div className="overflow-auto rounded-lg shadow hidden lg:block">
                    <table className="w-full">
                        <thead className="bg-neutral-100 dark:bg-slate-800 border-b-2 border-gray-200">
                            <tr>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Id</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Image</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Header</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created By</th>
                              
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {news.map((data,index)=>(
                                <tr key={index} className="even:bg-neutral-300 odd:bg-neutral-200 even:dark:bg-gray-900 odd:dark:bg-gray-800 w-full">
                                    <td className="p-3 text-lg text-gray-700">
                                        <p className="font-bold text-blue-500 dark:text-white hover:underline">{data.news_id}</p>
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white">
                                        <Image src={data.image == "" || data.image == null ? "/images/logo2.png" : data.image} width={50} height={50} alt="image that will be displayed" />
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white">
                                        {data.Header}
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white">
                                        {moment(data.createDate).utc().format('YYYY-MM-DD')}
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white">
                                        {data.userName}
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white">
                                        <button
                                            onClick={() => {
                                                clickedForupdate()
                                                setupdatenewsid(data.news_id)
                                                setupdateheader(data.Header)
                                                setupdateShortDescription(data.ShortDescription)
                                                setupdateDescription(data.Description)

                                            }}
                                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                            Edit
                                        </button>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <button 
                                            onClick={() => {
                                                clickedFordelete()
                                                setdeletenewsid(data.news_id)
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
                    {news.map((data,index)=>(
                        <div key={index} className="bg-neutral-100 dark:bg-slate-800 space-y-3 p-2 lg:p-4 rounded-lg shadow">
                            <div className="flex justify-between items-center">
                                <p className="text-blue-500 dark:text-white font-bold hover:underline">
                                    <span className="text-lg">Id : </span> 
                                    <span className="text-sm ">{data.news_id} </span>
                                </p>

                                
                            </div>

                            <Image src={data.image == "" || data.image == null  ? "/images/logo2.png" : data.image} width={500} height={500} alt="image that will be displayed" />
                            
                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Header : </span> 
                                <span className="text-sm ">{data.Header} </span>
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
                                        clickedForupdate()
                                        setupdatenewsid(data.news_id)
                                        setupdateheader(data.Header)
                                        setupdateShortDescription(data.ShortDescription)
                                        setupdateDescription(data.Description)
                                    }}
                                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                    Edit
                                </button>

                                <button 
                                    onClick={() => {
                                        clickedFordelete()
                                        setdeletenewsid(data.news_id)
                                    }}
                                    className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {deletemodalOn && 
                <DeleteNews setdeleteModalOn={setdeleteModalOn} deletenewsid={deletenewsid} />
            }

            {updatemodalOn && 
                <UpdateNews 
                    categories = {categories}
                    updatenewsid = {updatenewsid}
                    setupdatenewsid = {setupdatenewsid}
                    updateheader = {updateheader}
                    setupdateheader = {setupdateheader}
                    updateShortDescription = {updateShortDescription}
                    setupdateShortDescription = {setupdateShortDescription}
                    updateDescription = {updateDescription}
                    setupdateDescription = {setupdateDescription}
                    setupdateModalOn= {setupdateModalOn} 
                />
            }
        </div>
    );
}
