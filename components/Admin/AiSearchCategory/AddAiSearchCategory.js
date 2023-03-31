import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import RiseLoader from "react-spinners/RiseLoader";

export function AddAiSearchCategory({categories}) {
    const router = useRouter();
    const [category, setcategory] = useState("")
    const [loading, setLoading] = useState(false);
    const { status, data } = useSession();
    const [error,seterror] = useState("")
    const UserData = data?.user;
    async function registerCategory(e){
        e.preventDefault()
        setLoading(true)
        const data = await axios.post(`../api/addAisearchCategory`,{
            "CategoryName": category,
            "user_id": UserData.user_id,
        }).then(function (response) {
            console.log(response.data);
            router.reload()
        }).catch(function (error) {
            seterror("Creating Category Failed")
            setLoading(false)
        });
       
    }


    return (
        <div className="px-0 lg:px-10 pt-20">
            <form className="max-w-7xl mx-auto mt-10" onSubmit={registerCategory}>
                <h1 className="text-black dark:text-white text-xl lg:text-4xl font-bold text-center italic">Category</h1>
                <div className="flex flex-col my-10 w-full px-2">
                    <div className="relative flex-1">
                        <input 
                            id="Category" 
                            type="text" 
                            required
                            className="block w-full px-3 text-md lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={category}
                            onChange={(e) => setcategory(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Categories
                        </label>
                    </div>
                    <div className="my-5 flex flex-col lg:flex-row justify-between">
                        <h1 className="text-red-600 dark:text-red-400 text-md lg:text-2xl font-bold text-left mb-5 lg:mb-0">
                            {error}
                        </h1>

                        <button
                            disabled={loading} 
                            className={`float-right mx-2 flex justify-between rounded-xl w-32 text-white font-medium text-xl px-4 py-4 text-center inline-flex items-center
                                ${loading ? "bg-gray-200" : "bg-[#009688] hover:bg-[#009688] focus:ring-4 focus:ring-[#009688]" }`}
                        >
                            Submit
                        </button>
                    </div>

                    <div className="flex justify-center items-center my-5">
                        <RiseLoader 
                            color="#36d7b7"
                            loading={loading}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </div>
            </form>
        </div>
  );
}
