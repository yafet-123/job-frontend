import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import { Advantagecss } from "../../data/CSS/Advantagecss";

export function CssHome() {

  return (
    <div className="flex flex-col w-full h-full p-5 lg:p-20">
    	<h1 className="font-bold text-3xl hover:text-orange-500 text-center px-0 lg:px-20 my-5">CSS Tutorial</h1>
    	<p className="font-medium leading-loose text-lg capitalize font-serif subpixel-antialiased not-italic">
    		<span className="font-bold text-xl"> CSS (Cascading Style Sheet) </span> is a style sheet language which 
        is used to describe the look and formatting of a document written in markup language. It provides an 
        additional feature to HTML. It is generally used with HTML to change the style of web pages and user 
        interfaces. It can also be used with any kind of XML documents including plain XML, SVG and XUL.
    	</p>

    	<h3 className="font-bold text-2xl hover:text-orange-500 text-left my-5">Applications of CSS</h3>
    	<p className="font-medium leading-loose text-lg capitalize font-serif subpixel-antialiased not-italic">
    		CSS is widely used style language. Here are some of the advantage of CSS
    	</p>
    	<ul className="mx-2 lg:mx-10 mt-5 list-disc list-inside">
    		{ Advantagecss.map((data,index)=>(
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
