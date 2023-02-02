import React from "react";
import { useState,useEffect, useContext} from 'react'
import Multiselect from 'multiselect-react-dropdown';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useSession } from "next-auth/react";

export function AddJob({categories, locations}) {
    const router = useRouter();
    const [typechange , settypechange] = useState(true)
    const [CompanyName, setCompanyName] = useState("")
    const [image, setImage] = useState()

    const [JobsType, setJobsType] = useState("")
    const [Location, setLocation] = useState("")
    const [CareerLevel, setCareerLevel] = useState("")
    const [categoryId,setCategoryId] = useState([])
    const [EmploymentType, setEmploymentType] = useState("")
    const [Salary, setSalary] = useState("")
    const [Apply, setApply] = useState("")
    const [DeadLine, setDeadLine] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [Description , setDescription] = useState("")
    const [Requirement , setRequirement] = useState("")
    const [error,seterror] = useState("")
    const [active, setActive ] = useState(false)
    const { status, data } = useSession();
    const UserData = data.user;
    async function imageUploadData() {
        const formData = new FormData();
        let imagesecureUrl = ""
        formData.append('file', image)

        formData.append('upload_preset', 'my_upload')

        const imageUpload = await fetch(`https://api.cloudinary.com/v1_1/df7hlpjcj/image/upload`,{
            method:'POST',
            body: formData
        }).then(r=>
            r.json()
            
        )
        imagesecureUrl = imageUpload.secure_url
        return imagesecureUrl
    }

    async function addJobData(){
        const imageData = await imageUploadData()
        seterror("")
        const data = await axios.post(`api/addjob`,{
            "CompanyName":CompanyName,
            "Image":imageData,
            "JobsType":JobsType,
            "CareerLevel":CareerLevel,
            "EmploymentType":EmploymentType,
            "Salary":Salary,
            "JobsDescreption":Description,
            "JobsRequirement":Requirement,
            "DeadLine":new Date(DeadLine).toISOString(),
            "Apply":Apply,
            "user_id":UserData.user_id,
            "categoryId":categoryId,
            "LocationId":Location
        }).then(function (response) {
            console.log(response.data);
            
        }).catch(function (error) {
            seterror("Creating Job Failed")
        });
    }

    async function addJob(e){
        e.preventDefault()
        addJobData()
    }

    return (
        <div className="px-0 lg:px-10">
            <form className="max-w-7xl mx-auto mt-10" onSubmit={addJob}>
                <h1 className="text-black dark:text-white text-xl lg:text-4xl font-bold text-center italic">Add Job</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 mx-2">
                    <div className="relative mb-5">
                        <input 
                            id="CompanyName" 
                            type="text" 
                            required
                            className="block w-full px-3 text-md lg:text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={CompanyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Company Name
                        </label>
                    </div>
                    
                    <div className="relative mb-5">
                        <input 
                            id="JobsType" 
                            type="text" 
                            required
                            className="block w-full px-3 text-md lg:text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={JobsType}
                            onChange={(e) => setJobsType(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                           className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Jobs Type
                        </label>
                    </div>

                    <div className="relative mb-5">
                        <select
                            id="Location" 
                            name="select"
                            required
                            onChange={(e) => setLocation(e.target.value)}
                            className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        >
                            <option
                                className="bg-gray-50 dark:bg-slate-500 text-black dark:text-white" 
                            >
                         
                                Insert A Location
                            </option>
                            { locations.map((data,index) => (
                                <option
                                    key={index} 
                                    className="bg-gray-50 dark:bg-slate-500 text-black dark:text-white" 
                                    value={data.location_id}
                                >
                                    {data.LocationName}
                                </option>
                            ))}
                        </select>
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Location
                        </label>
                    </div>

                    <div className="relative mb-5">
                        <input 
                            id="CareerLevel" 
                            type="text"
                            required 
                            className="block w-full px-3 text-md lg:text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={CareerLevel}
                            onChange={(e) => setCareerLevel(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Career Level
                        </label>
                    </div>

                    <div className="relative mb-5">
                        <input 
                            id="EmploymentType" 
                            type="text"
                            required 
                            className="block w-full px-3 texxt-md lg:text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={EmploymentType}
                            onChange={(e) => setEmploymentType(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute texxt-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Employment Type
                        </label>
                    </div>

                    <div className="relative mb-5">
                        <input 
                            id="Salary" 
                            type="text" 
                            required
                            className="block w-full px-3 texxt-md lg:text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={Salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute texxt-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Salary
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-10 mx-2">
                    <div className="relative mb-5">
                        <input 
                            id="Apply" 
                            type="text"
                            required 
                            className="block w-full px-3 text-md lg:text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={Apply}
                            onChange={(e) => setApply(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Apply
                        </label>
                    </div>

                    <div className="relative mb-5">
                        <input 
                            id="DeadLine" 
                            type={typechange ? "text" : "date"} 
                            required
                            className="block w-full px-3 text-md lg:text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={DeadLine}
                            onChange={(e) => setDeadLine(e.target.value)}
                            onClick = {()=> settypechange(false)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            DeadLine
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-10 mx-2">
                    <div className="relative mb-5">
                        <textarea 
                            id="Description" 
                            rows="10" 
                            cols="33"
                            required
                            className="block w-full px-3 text-md lg:text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-10 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Job Description
                        </label>
                    </div>

                    <div className="relative mb-5">
                        <textarea 
                            id="Requirement"
                            rows="10" 
                            cols="33"
                            required 
                            className="block w-full px-3 text-md lg:text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={Requirement}
                            onChange={(e) => setRequirement(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-10 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Jobs Requirement
                        </label>
                    </div>
                </div>

                <div className="mx-2">
                    <Multiselect
                        displayValue="CategoryName"
                        placeholder = "Category"
                        className="w-full px-1 lg:px-3 text-md lg:text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-black dark:bg-slate-700 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
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

                <div className="grid grid-cols-1 gap-5 my-10 mx-2">
                    <div className="flex items-center justify-center w-full">
                        <label 
                            htmlFor="dropzone-file" 
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-black border rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-gray-100 dark:border-black dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <p className="text-sm lg:text-lg text-black dark:text-white mb-5">Upload Company Image</p>
                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-xs lg:text-sm text-black dark:text-white"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
                        </label>
                    </div>
                </div>

                <div className={image == null ? "hidden" : "flex justify-center items-center mb-10"}>
                    <Image 
                        src={image == null ? "/images/bgImage1.avif" :URL.createObjectURL(image)} 
                        width={500} height={200} 
                        alt="image that will be displayed" 
                        className="w-full"
                    />
                </div>

                <div className="my-5 flex flex-col lg:flex-row justify-between">
                    <h1 className="text-red-600 dark:text-red-400 text-md lg:text-2xl font-bold text-left mb-5 lg:mb-0">
                        {error}
                    </h1>

                    <button 
                        className="mx-2 mb-10 float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-md lg:text-xl rounded-lg px-4 py-4 text-center inline-flex items-center"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
  );
}
