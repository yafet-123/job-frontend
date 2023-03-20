import React from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MainHeader } from '../components/MainHeader';
import { CourseHeadData } from '../data/courseHead'

export default function Courses() {
	const router = useRouter()
  return (
  	<React.Fragment>
      <MainHeader title="Courses" />
	    <section className="flex flex-col w-full h-full px-1 lg:px-64 py-10 lg:py-32 bg-[#e6e6e6] dark:bg-[#02201D]">
	    	<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 pt-20">
	    		{ CourseHeadData.map((data,index)=>(
		    		<div 
		    			className={`flex flex-col justify-center items-center mb-10 mx-2 p-10 rounded-xl hover:scale-110 duration-1000 ease-in-out ${data.backgroundColor}`} 
		    			key ={index}
		    		>
		    			<h1 className="text-black text-5xl capitalize font-bold mb-5">{data.title}</h1>
		    			<p className="text-black text-xl font-normal mb-5">{data.description}</p>
		    			<button 
		    				onClick = {()=>{
	                router.push({
	                  pathname:data.link,
	                  query:{CategoryName:data.title , id:1}


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
	  </React.Fragment>
  );
}
