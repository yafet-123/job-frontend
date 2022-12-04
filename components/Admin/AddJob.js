import React from "react";
import { useState,useEffect, useContext} from 'react'

export function AddJob({categories}) {
    return (
        <div className="max-w-7xl mx-auto mt-10">
            <h1 className="text-black text-4xl font-bold text-center italic">Add Job</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
                <input 
                    className="shadow appearance-none border rounded w-full py-4 px-3 text-xl text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="CompanyName" 
                    type="text"
                    placeholder="Company Name"
                />

                <input 
                    className="shadow appearance-none border rounded w-full py-4 px-3 text-xl text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="JobsType" 
                    type="text"
                    placeholder="Jobs Type"
                />

                <input 
                    className="shadow appearance-none border rounded w-full py-4 px-3 text-xl text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="Location" 
                    type="text"
                    placeholder="Location"
                />

                <input 
                    className="shadow appearance-none border rounded w-full py-4 px-3 text-xl text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="CareerLevel" 
                    type="text"
                    placeholder="Career Level"
                />

                <input 
                    className="shadow appearance-none border rounded w-full py-4 px-3 text-xl text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="EmploymentType" 
                    type="text"
                    placeholder="Employment Type"
                />

                <input 
                    className="shadow appearance-none border rounded w-full py-4 px-3 text-xl text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="Salary" 
                    type="text"
                    placeholder="Salary"
                />

                <input 
                    className="bg-white shadow appearance-none border rounded w-full py-4 px-3 text-xl text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="DeadLine" 
                    type="date"
                    placeholder="Dead Line"
                />

                <input 
                    className="bg-white shadow appearance-none border rounded w-full py-4 px-3 text-xl text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="Apply" 
                    type="text"
                    placeholder="Apply"
                />

                <div className="dropdown inline-block relative">
                    <button className="flex justify-between w-full text-black bg-white focus:ring-4 focus:ring-blue-300 font-medium text-xl p-4 text-center inline-flex items-center">
                        <span className="mr-1">Search</span>
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                    </button>
                    <ul className="w-full dropdown-menu absolute hidden text-black pt-1">
                        {categories.map((category, index) => (
                            <li className="" key={index}>
                                <button className="text-left text-xl w-full bg-white hover:bg-gray-400 py-2 px-2">
                                    By {category.CategoryName}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-10">

                <input 
                    className="bg-white shadow appearance-none border rounded w-full py-4 px-3 text-xl text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="JobsDescreption" 
                    type="file"
                    placeholder="JobsDescreption"
                />

                <input 
                    className="bg-white shadow appearance-none border rounded w-full py-4 px-3 text-xl text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="JobsRequirement" 
                    type="file"
                    placeholder="JobsRequirement"
                />
            </div>

            <button 
                className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-xl rounded-lg px-4 py-4 text-center inline-flex items-center"
            >
                Submit
            </button>
        </div>
  );
}
