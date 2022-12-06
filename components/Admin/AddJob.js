import React from "react";
import { useState,useEffect, useContext} from 'react'

export function AddJob({categories}) {
    const [CompanyName, setCompanyName] = useState("")
    const [JobsType, setJobsType] = useState("")
    const [Location, setLocation] = useState("")
    const [CareerLevel, setCareerLevel] = useState("")
    const [EmploymentType, setEmploymentType] = useState("")
    const [Salary, setSalary] = useState("")
    const [Apply, setApply] = useState("")

    return (
        <div className="max-w-7xl mx-auto mt-10">
            <h1 className="text-black text-4xl font-bold text-center italic">Add Job</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
                <div className="relative mb-5">
                    <input 
                        id="CompanyName" 
                        type="text" 
                        className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={CompanyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <label 
                        htmlFor="floating_outlined" 
                        className="absolute text-xl text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        Company Name
                    </label>
                </div>
                
                <div className="relative mb-5">
                    <input 
                        id="JobsType" 
                        type="text" 
                        className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={JobsType}
                        onChange={(e) => setJobsType(e.target.value)}
                    />
                    <label 
                        htmlFor="floating_outlined" 
                        className="absolute text-xl text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        Jobs Type
                    </label>
                </div>

                <div className="relative mb-5">
                    <input 
                        id="Location" 
                        type="text" 
                        className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={Location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <label 
                        htmlFor="floating_outlined" 
                        className="absolute text-xl text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        Location
                    </label>
                </div>

                <div className="relative mb-5">
                    <input 
                        id="CareerLevel" 
                        type="text" 
                        className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={CareerLevel}
                        onChange={(e) => setCareerLevel(e.target.value)}
                    />
                    <label 
                        htmlFor="floating_outlined" 
                        className="absolute text-xl text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        Career Level
                    </label>
                </div>

                <div className="relative mb-5">
                    <input 
                        id="EmploymentType" 
                        type="text" 
                        className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={EmploymentType}
                        onChange={(e) => setEmploymentType(e.target.value)}
                    />
                    <label 
                        htmlFor="floating_outlined" 
                        className="absolute text-xl text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        Employment Type
                    </label>
                </div>

                <div className="relative mb-5">
                    <input 
                        id="Salary" 
                        type="text" 
                        className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={Salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                    <label 
                        htmlFor="floating_outlined" 
                        className="absolute text-xl text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        Salary
                    </label>
                </div>

                <div className="relative mb-5">
                    <input 
                        id="Apply" 
                        type="text" 
                        className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={Apply}
                        onChange={(e) => setApply(e.target.value)}
                    />
                    <label 
                        htmlFor="floating_outlined" 
                        className="absolute text-xl text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        Apply
                    </label>
                </div>

                <input 
                    className="bg-white shadow appearance-none border rounded w-full py-4 px-3 text-xl text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="DeadLine" 
                    type="date"
                    placeholder="Dead Line"
                />

                <div className="dropdown inline-block relative">
                    <button className="flex justify-between w-full text-black bg-white focus:ring-4 focus:ring-blue-300 font-medium text-xl p-4 text-center inline-flex items-center">
                        <span className="mr-1">Search</span>
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                    </button>
                    <ul className="w-full h-10 dropdown-menu absolute hidden text-black pt-1">
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
