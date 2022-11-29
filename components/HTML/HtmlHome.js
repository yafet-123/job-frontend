import React from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ApplicationOfHtml } from "../../data/HTML/ApplicationOfHtml";

export function HtmlHome() {
	const router = useRouter();
  const { title } = router.query
  return (
    <div className="flex flex-col w-full h-full p-5 lg:p-20">
    	<h1 className="font-bold text-3xl hover:text-orange-500 text-center px-0 lg:px-20 my-5">HTML Tutorial</h1>
    	<p className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
    		<span className="font-bold text-xl"> HTML (HyperText Markup Language) </span> is the most basic 
    		building block of the Web. It defines the meaning and structure of web content.Each individual 
    		piece markup code (which would fall between {"<"} and {">"} characters) is referred to as an element, 
    		though many people also refer to it as a tag. Some elements come in pairs that indicate 
    		when some display effect is to begin and when it is to end.
    	</p>

    	<p className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
    		HTML was created by Berners-Lee in late 1991 but {"HTML 2.0"} was the first standard HTML 
    		specification which was published in 1995. HTML 4.01 was a major version of HTML and it 
    		was published in late 1999. Though HTML 4.01 version is widely used but currently we are 
    		having HTML-5 version which is an extension to HTML 4.01, and this version was published 
    		in 2012.
    	</p>

    	<h3 className="font-bold text-2xl hover:text-orange-500 text-left my-5">Applications of HTML</h3>
    	<p className="font-medium leading-loose text-lg capitalize font-serif subpixel-antialiased not-italic">
    		Html is widely used language. Here are some of the application of HTML
    	</p>
    	<ul className="mx-0 lg:mx-10 my-5 list-disc list-inside">
    		{ ApplicationOfHtml.map((data,index)=>(
    			<li key={index} className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
    				<span className="font-bold text-xl">{data.header}</span> - {data.description}	
    			</li>
    		))}
    	</ul>

    	<div className="flex flex-row justify-between">
    		<button className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold">Home</button>
    		<button className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold">Next</button>
    	</div>
    </div>
  );
}
