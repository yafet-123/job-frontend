import React, { useMemo, useRef } from "react"
import { useState,useEffect, useContext} from 'react'
import Multiselect from 'multiselect-react-dropdown';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useSession } from "next-auth/react";
import dynamic from 'next/dynamic'
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-quill/dist/quill.snow.css'
import SyncLoader from "react-spinners/SyncLoader";

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
 
export function AddJob({categories, locations}) {
    const router = useRouter();
    const [typechange , settypechange] = useState(true)
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
    const quillRef = useRef(null)

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
        setLoading(true)
        const data = await axios.post(`../api/addjob`,{
            "CompanyName":CompanyName,
            "Image":imageData,
            "JobsName":JobsName,
            "CareerLevel":CareerLevel,
            "Salary":Salary,
            "Descreption":Description,
            "shortDescreption":shortDescription,
            "DeadLine":DeadLine,
            "categoryId":categoryId,
            "LocationId":LocationId,
            "user_id":UserData.user_id
        }).then(function (response) {
            console.log(response.data);
            router.reload()
        }).catch(function (error) {
            seterror("Creating Job Failed")
            setLoading(false)
        });
    }

    console.log(Description)

    async function addJob(e){
        e.preventDefault()
        addJobData()
    }

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
    

    return (
        <div className="px-0 lg:px-10 pt-20">
            <form className="max-w-7xl lg:mx-auto mt-10" onSubmit={addJob}>
                <h1 className="text-xl lg:text-4xl font-bold text-center italic">Add Job</h1>
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

                <div className="mb-10 ">
                    <p  
                        className="text-md lg:text-xl text-black dark:text-white mb-5 mx-5"
                    >
                        Short Description
                    </p>

                    <QuillNoSSRWrapper 
                        forwardedRef={quillRef} 
                        value={shortDescription} 
                        onChange={setshortDescription} 
                        modules={modules} 
                        className="!bg-white dark:!bg-white dark:!text-black !mx-2" theme="snow" 
                    />
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
                    <p  
                        className="text-md lg:text-xl text-black dark:text-white mb-5 mx-5"
                    >
                        Short Description
                    </p>

                    <QuillNoSSRWrapper 
                        forwardedRef={quillRef} 
                        value={shortDescription} 
                        onChange={setshortDescription} 
                        modules={modules} 
                        className="!bg-white dark:!bg-white dark:!text-black !mx-2" theme="snow" 
                    />
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
                        options={categories}
                    />
                </div>

                <div className="flex items-center justify-center w-full px-2">
                    <label 
                        htmlFor="dropzone-file" 
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-black border rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 hover:bg-gray-100 dark:border-black dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <p className="text-sm lg:text-lg text-black mb-5">Upload Company Image</p>
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-xs lg:text-sm text-black"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
                    </label>
                </div>
                

                <div className={image == null ? "hidden" : "flex justify-center items-center mb-10"}>
                    <Image 
                        src={image == null ? "/images/bgImage1.avif" :URL.createObjectURL(image)} 
                        width={500} height={200} 
                        alt="image that will be displayed" 
                        className="w-full"
                    />
                </div>

                <div className="my-5 flex flex-col lg:flex-row justify-between px-5">
                    <h1 className="text-red-600 dark:text-red-400 text-md lg:text-2xl font-bold text-left mb-5 lg:mb-0">
                        {error}
                    </h1>

                    <button 
                        disabled={loading}
                        className={`mx-2 mb-10 float-right text-white font-medium text-md lg:text-xl rounded-lg px-4 py-4 text-center inline-flex items-center
                            ${loading ? "bg-gray-200" : "bg-[#009688] hover:bg-[#009688] focus:ring-4 focus:ring-[#009688]" }`}
                    >
                        Submit
                    </button>
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
            </form>
        </div>
    );
}
