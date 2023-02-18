import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import Multiselect from 'multiselect-react-dropdown';
import {DeleteEntertainment} from './DeleteEntertainment' 
import {UpdateEntertainment} from './UpdateEntertainment'

export function AddEntertainment({categories, Allentertainment}) {
    const router = useRouter();
    const [Header, setHeader] = useState("")
    const [link, setlink] = useState("")
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deleteentertainmentid,setdeleteentertainmentid] = useState()
    const [updateentertainmentid,setupdateentertainmentid] = useState()
    const [updateheader,setupdateheader] = useState("")
    const [updatelink,setupdatelink] = useState("")
    const { status, data } = useSession();
    const [error,seterror] = useState("")
    const UserData = data.user;
    async function registerEntertainment(e){
        e.preventDefault()
        const data = await axios.post(`api/addEntertainment`,{
            "Header": Header,
            "link":link,
            "user_id": UserData.user_id,
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            seterror("Creating Entertainment Failed")
        });
       
    }

    const clickedFordelete = () => {
        setdeleteModalOn(true)
    }

    const clickedForupdate = () => {
        setupdateModalOn(true)
    }

    return (
        <div className="px-0 lg:px-10 h-full">
            <form className="max-w-7xl mx-auto mt-10" onSubmit={registerEntertainment}>
                <h1 className="text-black dark:text-white text-xl lg:text-4xl font-bold text-center italic">Entertainment</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10 px-2">
                    <div className="relative mb-5">
                        <input 
                            id="Header" 
                            type="text"
                            required 
                            className="block w-full px-3 text-md lg:text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={Header}
                            onChange={(e) => setHeader(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-300 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Header
                        </label>
                    </div>

                    <div className="relative mb-5">
                        <input 
                            id="link" 
                            type="text"
                            required 
                            className="block w-full px-3 texxt-md lg:text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={link}
                            onChange={(e) => setlink(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute texxt-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-300 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Link
                        </label>
                    </div>
                </div>

                <div className="mb-10 ">
                    <Multiselect
                        displayValue="CategoryName"
                        placeholder = "Category"
                        className="w-full px-0 lg:px-3 text-md lg:text-xl !text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:bg-slate-700 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                        onKeyPressFn={function noRefCheck(){}}
                        onRemove={function noRefCheck(){}}
                        onSearch={function noRefCheck(){}}
                        onSelect={(e)=>{
                            e.map((data,index)=>(
                               setCategoryId([...categoryId, data.entertainment_id])
                            ))
                        }}
                        options={categories}
                    />
                </div>

                <div className="my-5 flex flex-col lg:flex-row justify-between">
                    <h1 className="text-red-600 dark:text-red-400 text-md lg:text-2xl font-bold text-left mb-5 lg:mb-0">
                        {error}
                    </h1>

                        <button 
                        className="mx-2 flex justify-between rounded-xl w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-xl px-4 py-4 text-center inline-flex items-center"
                    >
                        Submit
                    </button>
                </div>
            </form>

            <div className="m-2 lg:m-5">
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
                            {Allentertainment.map((data,index)=>(
                                <tr key={index} className="even:bg-neutral-300 odd:bg-neutral-200 even:dark:bg-gray-900 odd:dark:bg-gray-800 w-full">
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <p className="font-bold text-blue-500 dark:text-white hover:underline">{data.entertainment_id}</p>
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {data.Header}
                                    </td>
                                     <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {data.link}
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
                                                setupdateentertainmentid(data.entertainment_id)
                                                setupdateheader(data.Header)
                                                setupdatelink(data.link)
                                            }}
                                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                            Edit
                                        </button>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <button 
                                            onClick={() => {
                                                clickedFordelete()
                                                setdeleteentertainmentid(data.entertainment_id)
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
                    {Allentertainment.map((data,index)=>(
                        <div key={index} className="bg-neutral-200 dark:bg-slate-800 space-y-3 p-2 lg:p-4 rounded-lg shadow">
                            <div>
                                <p className="text-blue-500 dark:text-white font-bold hover:underline">
                                    <span className="text-lg">Id : </span> 
                                    <span className="text-sm ">{data.entertainment_id}</span>
                                </p>
                            </div>
                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Header : </span>
                                <span className="text-sm ">{data.Header}</span>
                            </div>

                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Link : </span>
                                <span className="text-sm ">{data.link}</span>
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
                                        setupdateentertainmentid(data.entertainment_id)
                                        setupdateheader(data.Header)
                                        setupdatelink(data.link)
                                    }} 
                                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        clickedFordelete()
                                        setdeleteentertainmentid(data.entertainment_id)
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
                <DeleteEntertainment setdeleteModalOn={setdeleteModalOn} deleteentertainmentid={deleteentertainmentid}/>
            }

            {updatemodalOn && 
                <UpdateEntertainment setupdateModalOn={setupdateModalOn} updateentertainmentid={updateentertainmentid} updateheader={updateheader} setupdateentertainmentid={setupdateentertainmentid} updatelink={updatelink} setupdatelink={setupdatelink}/>
            }
        </div>
  );
}
