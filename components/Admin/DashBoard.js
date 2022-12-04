import React from "react";
import { useState,useEffect, useContext} from 'react'

export function DashBoard() {
    const [getSearchValue,setgetSearchValue] = useState("")
    const SearchList = [
        { type: 1, name: "User",},
        { type: 2, name: "Job",},
        { type: 3, name: "Category",},
    ];
    return (
        <div className="">
            <div className="flex items-center justify-center mt-10">
                <input 
                    className="shadow appearance-none border w-5/12 py-4 px-3 text-xl text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="username" 
                    type="text"
                    placeholder="Search"
                />
                <div className="">
                    <div className="dropdown inline-block relative">
                        <button className="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-xl px-4 py-4 text-center inline-flex items-center">
                            <span className="mr-1">Search</span>
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                        </button>
                        <ul className="dropdown-menu absolute hidden text-black pt-1">
                            {SearchList.map((search, index) => (
                                <li className="" key={index}>
                                    <button className="text-left text-xl w-32 bg-white hover:bg-gray-400 py-2 px-2">
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
