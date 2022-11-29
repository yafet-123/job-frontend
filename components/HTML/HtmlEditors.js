import React, {useState} from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Editiors } from "../../data/HTML/Editiors";

export function HtmlEditors() {
	const router = useRouter();
  	return (
	    <div className="flex flex-col w-full h-full p-5 lg:p-20">
	    	<h1 className="font-bold text-3xl hover:text-orange-500 text-center px-0 lg:px-20 my-5">HTML - Editors</h1>
	    	<p className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
	    		HTML text editors are used to create and modify web pages. HTML codes can be written in any text 
	    		editors including the notepad. One just needs to write HTML in any text editor and save the file 
	    		with an extension “.html” or “.htm”
	    	</p>

	    	<div className="w-full h-full bg-gray-200 border rounded-lg">
	    		<h4 className="font-medium text-xl lg:text-3xl hover:text-orange-500 text-left my-5 px-5">Some Of the most popular Editors</h4>
	    		<ul className="mx-2 lg:mx-10 my-5 list-disc list-inside">
	    			{ Editiors.map((data,index)=>(
    					<li key={index} className="font-bold leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
    						{data.title}	
    					</li>
    				))}
	    		</ul>
	    	</div>

	    	
	    	{ Editiors.map((data,index)=>(
		    	<div key={index} className="flex flex-col mt-10">
		    		<h4 className="font-bold text-xl lg:text-3xl hover:text-orange-500 text-left my-5 px-0 lg:px-5">{data.title}</h4>
		    		<p className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
		    			{data.describe}
		    		</p>
		    		<Image src={data.image} width={500} height={500} alt="html image" />
		    	</div>
		    ))}

		    <div className="flex flex-row justify-between mt-5">
    			<button className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold">Home</button>
    			<button className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold">Next</button>
    		</div>
	    </div>
  	);
}
