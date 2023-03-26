import React, {useState} from "react";
import Image from 'next/future/image'
import moment from 'moment';
import { useRouter } from 'next/router'
import 'react-quill/dist/quill.snow.css';
import { BlogsSharing } from './BlogsSharing';

export function DisplayIndvidualBlogs({blogs, blogsCategory,shareUrl}) {

  	return (
	    <div className="flex flex-col flex-1 p-5 pb-20 w-full lg:w-[70%] px-1 lg:pr-6 lg:pl-32">
		    <h1 className="text-lg lg:text-2xl font-extrabold dark:text-white text-black tracking-wide leading-snug mb-5">
	            {blogs.Header}
	        </h1>

	        <div className="lg:mr-20 h-52 lg:!h-96 relative ">
	          	<Image
	            	src={blogs.Image == "" || blogs.Image == null ? "/images/logo2.png" : blogs.Image}
	            	fill
	            	className="!bg-cover w-full !h-full border rounded-xl "
	            	alt="latest blogs image"
	          	/>
	        </div>

	        <div className="w-full flex flex-col my-5">
	            <div className="flex flex-row justify-between lg:mb-5 px-1 lg:px-2 w-full">
	                <h3 className="flex flex-col justify-between w-2/4">
	                  	{ blogsCategory.map((data,index)=>(
	                    	<span key={index} className="text-sm lg:text-xl font-bold dark:text-[#009688] text-slate-600 mb-1 lg:mb-5">
	                      		{data.BlogsCategory.CategoryName}
	                    	</span>
	                  	))}
	                </h3>
	                <h3 className="text-left font-normal text-sm lg:text-lg dark:text-[#009688] text-slate-600 w-1/4">
	                	{moment(blogs.CreatedDate).utc().format('MMMM, Do YYYY')}
	                </h3>
	            </div>

	            <div className="bg-transparent text-black dark:!text-white mt-5 ql-editor ql-snow ql-video" dangerouslySetInnerHTML={{ __html: blogs.Description }} />
	        </div>

	        <BlogsSharing shareUrl={shareUrl}/>
	    </div>
  	);
}
