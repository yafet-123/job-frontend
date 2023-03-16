import React, {useState} from "react";
import Image from 'next/future/image'
import moment from 'moment';
import { useRouter } from 'next/router'
import 'react-quill/dist/quill.snow.css';
import { NewsSharing } from './NewsSharing';

export function DisplayIndvidualNews({news, newsCategory,shareUrl}) {

  	return (
	    <div className="flex flex-col flex-1 p-5 pb-20 w-full lg:w-[70%] px-1 lg:pr-6 lg:pl-32">
		    <h1 className="text-lg lg:text-2xl font-extrabold dark:text-white text-black tracking-wide leading-snug mb-5">
	            {news.Header}
	        </h1>

	        <div className="lg:mr-20 h-52 lg:!h-96 relative ">
	          	<Image
	            	src={news.Image == "" || news.Image == null ? "/images/logo2.png" : news.Image}
	            	fill
	            	className="!bg-cover w-full !h-full border rounded-xl "
	            	alt="latest news image"
	          	/>
	        </div>

	        <div className="w-full flex flex-col my-5">
	            <div className="flex flex-row justify-between lg:mb-5 px-1 lg:px-2 w-full">
	                <h3 className="flex flex-col justify-between w-2/4">
	                  	{ newsCategory.map((data,index)=>(
	                    	<span key={index} className="text-sm lg:text-xl font-bold dark:text-white text-black mb-1 lg:mb-5">
	                      		{data.NewsCategory.CategoryName}
	                    	</span>
	                  	))}
	                </h3>
	                <h3 className="text-left font-normal text-sm lg:text-lg dark:text-white text-gray-600 w-1/4">
	                	{moment(news.CreatedDate).utc().format('MMMM, Do YYYY')}
	                </h3>
	            </div>

	            <div className="ql-editor ql-snow ql-video " dangerouslySetInnerHTML={{ __html: news.Description }} />
	        </div>

	        <NewsSharing shareUrl={shareUrl}/>
	    </div>
  	);
}
