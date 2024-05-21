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
    const router = useRouter();

    // const classIds = updateClassId.map((classDetail) => classDetail.class_id);
    // const classIds = updateClassId.map((classDetail) => classDetail.class_id);
    
    const categorys = dataposttojob.categories
    const locationss = dataposttojob.Location
    const locationsId = locationss.map(item => item.location_id);
    const categorysId = categorys.map(cate => cate.category_id);
    const [typechange , settypechange] = useState(true)
    const [updatejobid,setupdatejobid] = useState()
    const [CompanyName, setCompanyName] = useState("")
    const [image, setImage] = useState()
    const [loading, setLoading] = useState(false);
    const [JobsName, setJobsName] = useState("")
    const [LocationId, setLocationId] = useState([])
    const [CareerLevel, setCareerLevel] = useState("")
    const [categoryId,setCategoryId] = useState([])
    const [Salary, setSalary] = useState("")
    const [DeadLine, setDeadLine] = useState("")
    const [Description , setDescription] = useState("")
    const [shortDescription , setshortDescription] = useState("")
    const [error,seterror] = useState("")
    const [active, setActive ] = useState(false)
    const { status, data } = useSession();
    const UserData = data?.user;

    useEffect(()=>{
        setupdatejobid(dataposttojob.job_id)
        setCompanyName(dataposttojob.CompanyName)
        setImage(dataposttojob.image)
        setJobsName(dataposttojob.JobsName)
        setCareerLevel(dataposttojob.CareerLevel)
        setSalary(dataposttojob.Salary)
        setDescription(dataposttojob.Descreption)
        setshortDescription(dataposttojob.shortDescreption)
        setDeadLine(dataposttojob.DeadLine)
        console.log(locations)

        
    },[dataposttojob ])
    
    const handleOKClickForupdate = async() => {
        console.log(LocationId)
        console.log(categoryId)
        // setLoading(true)
        // const data = await axios.patch(`../api/updatejob/${updatejobid}`,{
        //     "CompanyName":CompanyName,
        //     "JobsName":JobsName,
        //     "CareerLevel":CareerLevel,
        //     "Salary":Salary,
        //     "Descreption":Description,
        //     "shortDescreption":shortDescription,
        //     "DeadLine":DeadLine,
        //     "categoryId":categoryId,
        //     "LocationId":LocationId,
        //     "user_id":UserData.user_id
        // }).then(function (response) {
        //     console.log(response.data);
        //     router.reload()
        // }).catch(function (error) {
        //     console.log(error);
        //     setLoading(false)
        // });
        // setupdateModalOn(false)
        
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10 px-2">
                        <div className="relative mb-5">
                            <input 
                                id="CompanyName" 
                                type="text" 
                                required
                                className="block w-full px-3 text-md lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                value={CompanyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                            <label 
                                htmlFor="floating_outlined" 
                                className="absolute text-md lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                Company Name
                            </label>
                        </div>
                        
                        <div className="relative mb-5">
                            <input 
                                id="JobsName" 
                                type="text" 
                                required
                                className="block w-full px-3 text-md lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                value={JobsName}
                                onChange={(e) => setJobsName(e.target.value)}
                            />
                            <label 
                                htmlFor="floating_outlined" 
                               className="absolute text-md lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                Job Name
                            </label>
                        </div>  
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 my-10 px-2">
                        <div className="relative mb-5">
                            <input 
                                id="CareerLevel" 
                                type="text"
                                required 
                                className="block w-full px-3 text-md lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                value={CareerLevel}
                                onChange={(e) => setCareerLevel(e.target.value)}
                            />
                            <label 
                                htmlFor="floating_outlined" 
                                className="absolute text-md lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                Career Level
                            </label>
                        </div>

                        <div className="relative mb-5">
                            <input 
                                id="Salary" 
                                type="text" 
                                required
                                className="block w-full px-3 texxt-md lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                value={Salary}
                                onChange={(e) => setSalary(e.target.value)}
                            />
                            <label 
                                htmlFor="floating_outlined" 
                                className="absolute texxt-md lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                Salary
                            </label>
                        </div>

                        <div className="relative mb-5">
                            <input 
                                id="DeadLine" 
                                type={typechange ? "text" : "date"} 
                                required
                                className="block w-full px-3 text-md lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                value={DeadLine}
                                onChange={(e) => setDeadLine(e.target.value)}
                                onClick = {()=> settypechange(false)}
                            />
                            <label 
                                htmlFor="floating_outlined" 
                                className="absolute text-md lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                DeadLine
                            </label>
                        </div>
                    </div>

                    <div className="relative mb-5">
                        <textarea  
                            id="shortDescription" 
                            required
                            className="block w-full px-3 text-md lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={shortDescription}
                            rows="10" 
                            cols="50"
                            onChange={(e) => setshortDescription(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[10%] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Short Description
                        </label>
                    </div>

                    <div className="mb-10 ">
                        <p  
                            className="text-md lg:text-xl text-black dark:text-white mb-5 mx-5"
                        >
                            Description
                        </p>

                        <QuillNoSSRWrapper 
                            forwardedRef={quillRef} 
                            value={Description} 
                            onChange={setDescription}
                            modules={modules} 
                            className="!bg-white dark:!bg-white dark:!text-black !mx-2" theme="snow" 
                        />
                    </div>

                    <div className="mb-10 ">
                        <Multiselect
                            displayValue="LocationName"
                            placeholder = "Location"
                            className="w-full px-0 lg:px-3 text-md lg:text-xl !text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                            onKeyPressFn={function noRefCheck(){}}
                            onRemove={function noRefCheck(){}}
                            onSearch={function noRefCheck(){}}
                            onSelect={(e)=>{
                                e.map((data,index)=>(
                                   setLocationId([...LocationId, data.location_id])
                                ))
                            }}
                            selectedValues={locations.filter((option) => LocationId.includes(option.location_id))}
                            options={locations}
                        />
                    </div>

                    <div className="mb-10 ">
                        <Multiselect
                            displayValue="CategoryName"
                            placeholder = "Category"
                            className="w-full px-0 lg:px-3 text-md lg:text-xl !text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                            onKeyPressFn={function noRefCheck(){}}
                            onRemove={function noRefCheck(){}}
                            onSearch={function noRefCheck(){}}
                            onSelect={(e)=>{
                                e.map((data,index)=>(
                                   setCategoryId([...categoryId, data.category_id])
                                ))
                            }}
                            selectedValues={categories.filter((option) => categoryId.includes(option.category_id))}
                            options={categories}
                        />
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