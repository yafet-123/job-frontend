import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';

export function DashBoard() {
    const [getSearchValue,setgetSearchValue] = useState("")
    const [searchValue,setsearchValue] = useState([])
    const [type,settype] = useState()
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
                            className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
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
            { type == 1 && <div>
                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                              <th className="p-3 text-lg font-semibold tracking-wide text-left">User Id</th>
                              <th className="p-3 text-lg font-semibold tracking-wide text-left">User Name</th>
                              <th className="p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                              <th className="p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {searchValue.map((data,index)=>(
                                <tr key={index} className="bg-white">
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <p className="font-bold text-blue-500 hover:underline">{data.user_id}</p>
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        {data.UserName}
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        {moment(data.createDate).utc().format('YYYY-MM-DD')}
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        {moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                    {searchValue.map((data,index)=>(
                        <div class="bg-white space-y-3 p-4 rounded-lg shadow">
                            <div class="flex items-center justify-between text-sm">
                              <div>
                                <p class="text-lg text-blue-500 font-bold hover:underline">{data.user_id}</p>
                              </div>
                              <div class="text-lg text-gray-700 font-bold">
                                User Name : {data.UserName}
                              </div>
                            </div>
                            <div class="text-sm text-black">
                              createDate : {moment(data.createDate).utc().format('YYYY-MM-DD')}
                            </div>
                            <div class="text-sm text-black">
                              Modified Date : {moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}
                            </div>
                        </div>
                    ))}
                </div>
            </div> }


        </div>
  );
}
