import React, {useState,useEffect} from "react";
import moment from 'moment';
import { useRouter } from 'next/router'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios';

export function Content({indvidualCourses}) {
    const router = useRouter();
    const { CategoryName } = router.query
    const { id } = router.query
    const homebutton =  { type:4 , name: "Home"}
    const nexttbutton =  { type:2 , name: "Next"} 
    const prevbutton =  { type:1 , name: "Previous" }

    const [getSearchValue,setgetSearchValue] = useState("")
    const [type,settype] = useState("")
    console.log(getSearchValue)
    
    async function submitbuttondata(){
        setgetSearchValue(id)
        const data = await axios.post(`../api/courseNextHomePrevioushtml`,{
            "searchName": getSearchValue,
            "type": type,
            "Category" : CategoryName
        }).then(function (response) {
           console.log(response.data);
           setgetSearchValue("")
           settype("")
        }).catch(function (error) {
            console.log(error)
        });
    }

    return (
            <div className="w-full h-full mt-10 lg:mt-0 px-3 lg:px-5 ">
                <h1 className="text-center pt-3 lg:pt-10 group-hover:underline text-3xl lg:text-4xl font-extrabold dark:text-slate-300 text-slate-600 tracking-wide leading-snug my-10">
                    {indvidualCourses[0]?.title}
                </h1>

                <div className="flex flex-row justify-between">
                    { id == 1 ? 
                        <button
                            onClick={() => {
                                settype(homebutton.type)
                            }}  
                            className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold"
                        >{homebutton.name}</button>
                    :

                        <button
                            onClick={() => {
                                settype(prevbutton.type)

                                submitbuttondata()
                            }}  
                            className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold"
                        >{prevbutton.name}</button>
                    }
                        <button 
                            onClick={() => {
                                settype(nexttbutton.type)

                                submitbuttondata()
                            }} 
                            className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold"
                        >
                            {nexttbutton.name}
                        </button>

                </div>

                <div className="ql-snow">
                    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: indvidualCourses[0]?.content }} />
                </div>

                <div className="flex flex-row justify-between">
                    { id == 1 ? 
                        <button
                            onClick={() => {
                                settype(homebutton.type)
                            }}  
                            className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold"
                        >
                            {homebutton.name}
                        </button>
                    :

                        <button
                            onClick={() => {

                                settype(prevbutton.type)

                                submitbuttondata()
                                
                            }}  
                            className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold"
                        >
                            {prevbutton.name}
                        </button>
                    }
                    <button 
                        onClick={() => {
                            settype(nexttbutton.type)
                            submitbuttondata()
                        }} 
                        className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold"
                    >
                        {nexttbutton.name}
                    </button>
                </div>
            </div>
     )
}
     