import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';

export function DashBoard() {
    const [getSearchValue,setgetSearchValue] = useState("")
    const SearchList = [
        { type: 1, name: "User",},
        { type: 2, name: "Job",},
        { type: 3, name: "Category",},
        { type: 4, name: "Location",},
    ];

    // const searchaxios = axios.create({
    //     baseURL : api,
    // })
    

    async function handleSearch(e){
        const data = await axios.post(`api/searchAdmin`,{
            "searchName": getSearchValue,
            "type": e
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }
    return (
        <div className="max-w-7xl mx-auto mt-10">
            <div className="flex my-10 w-full">
                <div className="relative flex-1">
                    <input 
                        id="search" 
                        type="text" 
                        className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" " 
                        value={getSearchValue}
                        onChange={(e) => setgetSearchValue(e.target.value)}
                    />
                    <label 
                        htmlFor="floating_outlined" 
                        className="absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        Search
                    </label>
                </div>
                <div className="mx-2">
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
  );
}
