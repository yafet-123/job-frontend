import React from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import {CourseHead} from '../data/courseHead'
export default function Courses() {
	const router = useRouter()
  return (
    <section className="flex flex-col w-full h-full px-0 md:px-32  bg-gray-300 dark:bg-slate-700">
    	<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white dark:bg-slate-800 pt-20">
    		{ CourseHead.map((data,index)=>(
	    		<div 
	    			className={`flex flex-col justify-center items-center mb-10 mx-2 lg:m-20 p-10 rounded-xl ${data.backgroundColor}`} 
	    			key ={index}
	    		>
	    			<h1 className="text-black text-5xl capitalize font-bold mb-5">{data.title}</h1>
	    			<p className="text-black text-xl font-normal mb-5">{data.description}</p>
	    			<button 
	    				onClick = {()=>{
                router.push({
                  pathname:"/Course",
                  query:{title:data.title}
                })
              }}
	    				className="py-3 border rounded-3xl w-52 text-xl font-bold bg-white text-black"
	    			>
	    				Learn {data.title}
	    			</button>
	    		</div>
    		))}
    	</div>
    </section>
  );
}
