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
            <h1 className="text-black dark:text-white text-4xl font-bold text-center italic">Add Job</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
                <div className="relative mb-5">
                    <input 
                        id="CompanyName" 
                        type="text" 
                        className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={CompanyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <label 
                        htmlFor="floating_outlined" 
                        className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        Company Name
                    </label>
                </div>
                
                <div className="relative mb-5">
                    <input 
                        id="JobsType" 
                        type="text" 
                        className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={JobsType}
                        onChange={(e) => setJobsType(e.target.value)}
                    />
                    <label 
                        htmlFor="floating_outlined" 
                       className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        Jobs Type
                    </label>
                </div>

                <div className="relative mb-5">
                    <input 
                        id="Location" 
                        type="text" 
                        className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={Location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <label 
                        htmlFor="floating_outlined" 
                        className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        Location
                    </label>
                </div>

                <div className="relative mb-5">
                    <input 
                        id="CareerLevel" 
                        type="text" 
                        className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={CareerLevel}
                        onChange={(e) => setCareerLevel(e.target.value)}
                    />
                    <label 
                        htmlFor="floating_outlined" 
                        className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        Career Level
                    </label>
                </div>

                <div className="relative mb-5">
                    <input 
                        id="EmploymentType" 
                        type="text" 
                        className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={EmploymentType}
                        onChange={(e) => setEmploymentType(e.target.value)}
                    />
                    <label 
                        htmlFor="floating_outlined" 
                        className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        Employment Type
                    </label>
                </div>

                <div className="relative mb-5">
                    <input 
                        id="Salary" 
                        type="text" 
                        className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={Salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                    <label 
                        htmlFor="floating_outlined" 
                        className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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
                        className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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

                <div 
x-data="{
        search: '',
        open: false,
        items: ['Bitcoin', 'Ethereum', 'Siacoin'],
 
        get filteredItems() {
            return this.items.filter(
                i => i.toLowerCase().startsWith(this.search.toLowerCase())
            )
        }
    }"
    class="min-h-screen bg-gray-50 py-6 flex flex-col items-center justify-center relative overflow-hidden sm:py-12">
  <input x-on:click="open = !open" type="search" x-model="search" placeholder="Search Here..." class="py-3 px-4 w-1/2 rounded shadow font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-200 duration-100 shadow-gray-100">

  
  <ul x-show="open" x-on:onclick.outside="open = !open"  x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 translate"
        x-transition:enter-end="opacity-100 translate"
        x-transition:leave="transition ease-in duration-300"
        x-transition:leave-start="opacity-100 translate"
        x-transition:leave-end="opacity-0 translate"  class="w-1/2">
        <template x-for="item in filteredItems" :key="item">
            <li class="w-full text-gray-700 p-4 mt-2 bg-white" x-text="item"></li>
        </template>
    </ul>
  
</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-10">
                <div className="flex items-center justify-center w-full">
                    <label 
                        htmlFor="dropzone-file" 
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-black border rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-gray-100 dark:border-black dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <p className="text-lg text-black dark:text-white mb-5">Upload Jobs Descreption</p>
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-black dark:text-white"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div>

                <div className="flex items-center justify-center w-full">
                    <label 
                        htmlFor="dropzone-file" 
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-black border rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-gray-100 dark:border-black dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <p className="text-lg text-black dark:text-white mb-5">Upload Jobs Requirement</p>
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-black dark:text-white"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div>
            </div>

            <button 
                className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-xl rounded-lg px-4 py-4 text-center inline-flex items-center"
            >
                Submit
            </button>
        </div>
  );
}
