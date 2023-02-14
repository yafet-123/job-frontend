import React, { useMemo, useRef } from "react"
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import Image from 'next/image'
import {DeleteLocation} from './DeleteLocation'
import {UpdateLocation} from './UpdateLocation'
import Multiselect from 'multiselect-react-dropdown';
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(
  async () => {
    const QuillNoSSRWrapper = (await import("react-quill")).default

    return ({
      forwardedRef,
      ...rest
    }) => <QuillNoSSRWrapper ref={forwardedRef} {...rest} />
  },
  {
    ssr: false,
  },
)


export default function AddNews({categories}) {
    const router = useRouter();
    
    const [Header, setHeader] = useState("")
    const [ShortDescription, setShortDescription] = useState("")
    const [Description, setDescription] = useState("")
    const [categoryId, setCategoryId] = useState([])
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deletenewsid,setdeletenewsid] = useState()
    const [updatenewsid,setupdatenewsid] = useState()
    const [updatelocationname,setupdatelocationname] = useState("")
    const [images, setImage] = useState()
    const [saveUpload, setsaveUpload] = useState(false)
    const { status, data } = useSession();
    const [error,seterror] = useState("")
    const UserData = data.user;
    const [active, setActive] = useState(false)

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


    async function imageUploadData() {
        const formData = new FormData();
        let imagesecureUrl = ""
        formData.append('file', images)

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

    async function addnews(){
        const imageData = await imageUploadData()
        seterror("")
        const data = await axios.post(`api/addNews`,{
            "Header": Header,
            "ShortDescription" : ShortDescription,
            "Description" : Description,
            "user_id": UserData.user_id,
            "Image":imageData,
            "categoryId" : categoryId
        }).then(function (response) {
            console.log(response.data);
            router.reload()
        }).catch(function (error) {
            seterror("Creating Location Failed")
        });
    }

    function registerNews(e){
        e.preventDefault()
        addnews()
    }

    const clickedFordelete = () => {
        setdeleteModalOn(true)
    }

    const clickedForupdate = () => {
        setupdateModalOn(true)
    }

    return (
        <div className="px-0 lg:px-10 h-full">
            <form className="max-w-7xl mx-auto my-10" onSubmit={registerNews}>
                <h1 className="text-black dark:text-white text-xl lg:text-4xl font-bold text-center italic">Add News</h1>
                <div className="flex flex-col my-10 w-full px-2">
                    <div className="relative flex-1">
                        <input 
                            id="Header" 
                            type="text" 
                            required
                            className="block w-full px-3 text-md lg:text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={Header}
                            onChange={(e) => setHeader(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Header
                        </label>
                    </div>
                </div>

                <div className="my-10">
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

                    <div className="mb-10 ">
                        <p  
                            className="text-md lg:text-xl text-black dark:text-white mb-5 mx-5"
                        >
                            Short Description
                        </p>

                        <QuillNoSSRWrapper value={ShortDescription} onChange={setShortDescription} modules={modules} className="dark:!bg-white dark:!text-black !mx-2" theme="snow" />
                    </div>

                    <div className="mb-10 ">
                        <p  
                            className="text-md lg:text-xl text-black dark:text-white mb-5 mx-5"
                        >
                            Description
                        </p>

                        <QuillNoSSRWrapper forwardedRef={quillRef} value={Description} onChange={setDescription} modules={modules} className="dark:!bg-white dark:!text-black !mx-2" theme="snow" />
                    </div>

                    <div className="grid grid-cols-1 gap-5 my-10">
                        <div className="flex items-center justify-center w-full">
                            <label 
                                htmlFor="dropzone-file" 
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-black border rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-gray-100 dark:border-black dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <p className="text-sm lg:text-lg text-black dark:text-white mb-5">Upload News Image</p>
                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-xs lg:text-sm text-black dark:text-white"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
                            </label>
                        </div>
                    </div>

                    <div className={images == null ? "hidden" : "flex justify-center items-center mb-10"}>
                        <Image 
                            src={images == null ? "/images/bgImage1.avif" :URL.createObjectURL(images)} 
                            width={500} height={200} 
                            alt="image that will be displayed" 
                            className="w-full"
                        />
                    </div>
                    
                    <div className="mx-2 my-5 lg:my-0 flex flex-col lg:flex-row justify-between">
                        <h1 className="text-red-600 dark:text-red-400 text-md lg:text-2xl font-bold text-left mb-5 lg:mb-0">
                            {error}
                        </h1>

                        <button 
                            onClick={()=> setActive(!active) }
                            className="float-right mx-2 flex justify-between rounded-xl w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-xl px-4 py-4 text-center inline-flex items-center"
                        >
                            Submit
                        </button>     
                    </div>
            </form>

            
        </div>
  );
}
