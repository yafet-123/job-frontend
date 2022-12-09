import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';

export function AddCategory() {
    const [category, setcategory] = useState("")

    async function registerCategory(){
        const data = await axios.post(`api/addCtegory`,{
            "CategoryName": category,
            "user_id": 20
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="max-w-7xl mx-auto mt-10">
            <h1 className="text-black dark:text-white text-4xl font-bold text-center italic">Add Category</h1>
            <div className="flex flex-col lg:flex-row my-10 w-full">
                <div className="relative flex-1">
                    <input 
                        id="Category" 
                        type="text" 
                        className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={category}
                        onChange={(e) => setcategory(e.target.value)}
                    />
                    <label 
                        htmlFor="floating_outlined" 
                        className="absolute text-2xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        Category
                    </label>
                </div>
                <div className="mx-2 mt-5 lg:mt-0 flex items-center justify-center">
                    <button 
                        onClick={()=> registerCategory() }
                        className="mx-2 flex justify-between rounded-xl w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-xl px-4 py-4 text-center inline-flex items-center"
                    >
                        Submit
                    </button>
                </div>
            </div>

            
        </div>
  );
}
