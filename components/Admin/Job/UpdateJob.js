import axios from 'axios';
import React, { useMemo, useRef } from "react"
import { useRouter } from 'next/router'
import { useState , useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown';
import { useSession } from "next-auth/react";
import SyncLoader from "react-spinners/SyncLoader";
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'


const QuillNoSSRWrapper = dynamic(
  async () => {
    const QuillNoSSRWrapper = (await import("react-quill")).default
    function Imagehandle({ forwardedRef, ...rest }){
        return <QuillNoSSRWrapper ref={forwardedRef} {...rest} />
    }
    return Imagehandle
  },
  {
    ssr: false,
  },
)

export function UpdateJob({setupdateModalOn ,dataposttojob ,categories, locations}){
    const [typechange , settypechange] = useState(true)
    const router = useRouter();
    const [updatejobid,setupdatejobid] = useState()
    const [CompanyName, setCompanyName] = useState("")
    const [Image, setImage] = useState("")
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
    const [loading, setLoading] = useState(false);
    const { status, data } = useSession();
    const UserData = data.user;

    useEffect(()=>{
        const category = []
        console.log(dataposttojob)
        category.push(dataposttojob.categories)
        setupdatejobid(dataposttojob.job_id)
        setCompanyName(dataposttojob.CompanyName)
        setJobsType(dataposttojob.JobsType)
        setLocation(dataposttojob.location_id)
        setCareerLevel(dataposttojob.CareerLevel)
        setEmploymentType(dataposttojob.EmploymentType)
        setSalary(dataposttojob.Salary)
        setDescription(dataposttojob.JobsDescreption)
        setRequirement(dataposttojob.JobsRequirement)
        setDeadLine(dataposttojob.DeadLine)
        setApply(dataposttojob.Apply)
        // for(var i=0; i<category.length;i++){
        //     console.log(category[i].Category)
        //     setCategoryId(category => [...categoryId,category[i].Category])
        // } 
        
        
    },[dataposttojob ])
    
    const handleOKClickForupdate = async() => {
        setLoading(true)
        const data = await axios.patch(`../api/updatejob/${updatejobid}`,{
            "CompanyName":CompanyName,
            "Image":Image,
            "JobsType":JobsType,
            "CareerLevel":CareerLevel,
            "EmploymentType":EmploymentType,
            "Salary":Salary,
            "JobsDescreption":Description,
            "JobsRequirement":Requirement,
            "DeadLine":new Date(DeadLine).toISOString(),
            "Apply":Apply,
            "categoryId":categoryId,
            "LocationId": Location,
            "user_id":UserData.user_id,
        }).then(function (response) {
            console.log(response.data);
            router.reload()
        }).catch(function (error) {
            console.log(error);
            setLoading(false)
        });
        setupdateModalOn(false)
        
    }

    const handleCancelClickForupdate = () => {
        setupdateModalOn(false)
        setCategoryId([])
    }

    const quillRef = useRef(null)
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote', 'code-block'],

                    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                    [{ 'direction': 'rtl' }],                         // text direction
            
                    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    [{ 'font': [] }],
                    [{ 'align': [] }],

                    ["link","image", "video"],
                ],
            handlers: {
                image: imageHandler,
            },
        },

        clipboard: {
            matchVisual: false,
        },
    }),[])

    function imageHandler() {
        console.log(quillRef)
        if (!quillRef.current) return
        
        const editor = quillRef.current.getEditor()
        const range = editor.getSelection()
        const value = prompt("Please enter the image URL")
        console.log(value)
        console.log(range)
        console.log(editor)
        if (value && range) {
          editor.insertEmbed(range.index, "image", value, "user")
        }
    }


    return(
        <div className="bg-neutral-100 dark:bg-slate-800 fixed inset-0 z-50 h-full">
            <div className="flex h-full justify-center items-center">
                <div className="overflow-y-scroll lg:overflow-none flex-col w-full h-full mx-2 lg:mx-20 justify-center bg-neutral-200 dark:bg-slate-500 py-5 px-5 lg:px-10 border-4 border-sky-500 rounded-xl ">
                    <h1 className="text-xl lg:text-2xl text-zinc-600 font-bold mb-10 dark:text-white text-center">Update Job</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-3">
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
                                className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-200 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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
                               className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-200 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                Jobs Type
                            </label>
                        </div>

                        <div className="relative mb-5">
                            <select
                                id="Location" 
                                name="select"
                                value={Location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            >
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
                                className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-200 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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
                                className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-200 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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
                                className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-200 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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
                                className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-200 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                Salary
                            </label>
                        </div>

                        <div className="relative mb-5">
                            <input 
                                id="DeadLine" 
                                type={typechange ? "text" : "date"} 
                                className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                value={DeadLine}
                                onChange={(e) => setDeadLine(e.target.value)}
                                onClick = {()=> settypechange(false)}
                            />
                            <label 
                                htmlFor="floating_outlined" 
                                className="absolute text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-200 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                DeadLine
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
                        <div className="mb-10 ">
                            <p  className="text-md lg:text-xl text-black dark:text-white mb-5 mx-5">
                                Requirement
                            </p>
                            <QuillNoSSRWrapper value={Requirement} onChange={setRequirement} modules={modules} className="!bg-white dark:!bg-white dark:!text-black !mx-2" theme="snow" />
                        </div>
                        <div className="mb-10 ">
                            <p  className="text-md lg:text-xl text-black dark:text-white mb-5 mx-5">
                                Description
                            </p>
                            <QuillNoSSRWrapper value={Description} onChange={setDescription} modules={modules} className="!bg-white dark:!bg-white dark:!text-black !mx-2" theme="snow" />
                        </div>

                        <div className="mb-10 ">
                            <p  className="text-md lg:text-xl text-black dark:text-white mb-5 mx-5">
                                Apply
                            </p>
                            <QuillNoSSRWrapper value={Apply} onChange={setApply} modules={modules} className="!bg-white dark:!bg-white dark:!text-black !mx-2" theme="snow" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
                        <Multiselect
                            displayValue="CategoryName"
                            
                            placeholder = "updated Category"
                            className="w-full px-3 text-xl text-black h-64 bg-neutral-200 py-4 border-2 border-black rounded-xl appearance-none dark:text-black dark:bg-slate-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
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

                        <div className="flex items-center justify-center w-full">
                            <label 
                                htmlFor="dropzone-file" 
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-black border rounded-lg cursor-pointer bg-neutral-200 dark:hover:bg-bray-800 dark:bg-slate-500 hover:bg-gray-100 dark:border-black dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <p className="text-lg text-black dark:text-white mb-5">Upload Company Image</p>
                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-black dark:text-white"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div>
                    </div>

                    <div className="flex">
                        <button 
                            disabled={loading}
                            onClick={handleOKClickForupdate} 
                            className={`rounded px-4 py-4  ${loading ? "text-black bg-gray-200" : "text-white  bg-green-400 hover:bg-green-600"}`}
                        >
                            Yes
                        </button>
                        <button onClick={handleCancelClickForupdate} className="rounded px-4 py-4 ml-4 text-white bg-blue-400 hover:bg-blue-600">No</button>
                    </div>

                    <div className="flex justify-center items-center mt-5">
                        <SyncLoader 
                            color="#36d7b7"
                            loading={loading}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}