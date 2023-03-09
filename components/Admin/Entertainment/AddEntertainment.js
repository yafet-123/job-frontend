import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import Multiselect from 'multiselect-react-dropdown';
import {DeleteEntertainment} from './DeleteEntertainment' 
import {UpdateEntertainment} from './UpdateEntertainment'
import RingLoader from "react-spinners/RingLoader";

export function AddEntertainment({categories}) {
    const router = useRouter();
    const [Header, setHeader] = useState("")
    const [link, setlink] = useState("")
    const [loading, setLoading] = useState(false);
    const { status, data } = useSession();
    const [error,seterror] = useState("");
    const [categoryId,setCategoryId] = useState([])
    const [ShortDescription, setShortDescription] = useState("")
    const UserData = data?.user;
    async function registerEntertainment(e){
        e.preventDefault()
        setLoading(true)
        const data = await axios.post(`../api/addEntertainment`,{
            "Header": Header,
            "link":link,
            "ShortDescription":ShortDescription,
            "user_id": UserData.user_id,
            "categoryId": categoryId
        }).then(function (response) {
            console.log(response.data);
            router.reload()
        }).catch(function (error) {
            seterror("Creating Entertainment Failed")
            setLoading(false)
        });
       
    }


    return (
        <div className="px-0 lg:px-10 pt-20">
            <form className="max-w-7xl mx-auto mt-10" onSubmit={registerEntertainment}>
                <h1 className="text-black dark:text-white text-xl lg:text-4xl font-bold text-center italic">Entertainment</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10 px-2">
                    <div className="relative mb-5">
                        <input 
                            id="Header" 
                            type="text"
                            required 
                            className="block w-full px-3 text-md lg:text-xl text-black dark:text-white bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={Header}
                            onChange={(e) => setHeader(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Header
                        </label>
                    </div>

                    <div className="relative mb-5">
                        <input 
                            id="link" 
                            type="text"
                            required 
                            className="block w-full px-3 text-md lg:text-xl text-black dark:text-white bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={link}
                            onChange={(e) => setlink(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Link
                        </label>
                    </div>
                </div>

                <div className="mb-10 ">
                    <Multiselect
                        displayValue="CategoryName"
                        placeholder = "Category"
                        className="z-50 w-full px-0 lg:px-3 text-md lg:text-xl !text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:bg-slate-700 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
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
                </div>

               <div className="relative mb-5">
                    <textarea  
                        id="ShortDescription" 
                        rows="7" 
                        cols="50"
                        required 
                        className="block w-full px-3 text-md lg:text-xl text-black dark:text-white bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={ShortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                    />
                    <label 
                        htmlFor="floating_outlined" 
                        className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/4 peer-placeholder-shown:top-1/4 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        ShortDescription
                    </label>
                </div>

                <div className="my-5 flex flex-col lg:flex-row justify-between">
                    <h1 className="text-red-600 dark:text-red-400 text-md lg:text-2xl font-bold text-left mb-5 lg:mb-0">
                        {error}
                    </h1>

                    <button
                        disabled={loading} 
                        className={`float-right mx-2 flex justify-between rounded-xl w-32 text-white font-medium text-xl px-4 py-4 text-center inline-flex items-center
                            ${loading ? "bg-gray-200" : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300" }`}
                    >
                        Submit
                    </button>
                </div>

                <div className="flex justify-center items-center mt-5">
                    <RingLoader 
                        color="#36d7b7"
                        loading={loading}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </form>
        </div>
  );
}
