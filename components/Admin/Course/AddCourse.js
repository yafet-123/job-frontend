import React, { useMemo, useRef } from "react"
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import Image from 'next/image'
import Multiselect from 'multiselect-react-dropdown';
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

export function AddCourse({categorie}) {
    const router = useRouter();
    const [title, settitle] = useState("")
    const [content, setcontent] = useState("")
    const [categoryId,setCategoryId] = useState([])
    const { status, data } = useSession();
    const [error,seterror] = useState("")
    const UserData = data?.user;
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


    async function registercourse(e){
        e.preventDefault()
        const data = await axios.post(`../api/addcourse`,{
            "title": title,
            "content":content,
            "user_id": UserData.user_id,
            "categoryId":categoryId,
        }).then(function (response) {
            console.log(response.data);
            router.reload()
        }).catch(function (error) {
            seterror("Creating Location Failed")
        });
    }

    return (
        <div className="px-0 lg:px-10 pt-20">
            <form className="max-w-7xl mx-auto mt-10" onSubmit={registercourse}>
                <h1 className="text-black dark:text-white text-xl lg:text-4xl font-bold text-center italic">Course</h1>
                <div className="flex flex-col my-10 w-full px-2">
                    <div className="relative flex-1 my-5">
                        <input  
                            id="title" 
                            type="text" 
                            required
                            className="block w-full px-3 text-md lg:text-xl text-black dark:text-white bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={title}
                            onChange={(e) => settitle(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Title
                        </label>
                    </div>

                    <div className="mb-10 my-5">
                        <Multiselect
                            displayValue="CategoryName"
                            placeholder = "Category"
                            className="w-full px-0 lg:px-3 text-md lg:text-xl !text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:bg-slate-700 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                            onKeyPressFn={function noRefCheck(){}}
                            onRemove={function noRefCheck(){}}
                            onSearch={function noRefCheck(){}}
                            onSelect={(e)=>{
                                e.map((data,index)=>(
                                   setCategoryId([...categoryId, data.category_id])
                                ))
                            }}
                            options={categorie}
                        />
                    </div>

                    <QuillNoSSRWrapper 
                        value={content} 
                        onChange={setcontent} 
                        modules={modules} className="!bg-white dark:!bg-white dark:!text-black !mx-2 !my-5" 
                        theme="snow" 
                    />
                    
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
                </div>
            </form>
        </div>
  );
}
