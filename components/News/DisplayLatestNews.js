import React, {useState} from "react";
import Image from 'next/future/image'
import moment from 'moment';
import Link from "next/link";
import { useRouter } from 'next/router'

export function DisplayLatestNews({Alllatestnews}) {

  	return (
	    <div className="sticky top-0 bottom-10 grid grid-cols-1 md:grid-cold-3 gap-5 w-full lg:w-[30%] h-full lg:h-[90rem] border rounded-lg shadow-2xl shadow-sky-200 lg:overflow-y-scroll">
			{Alllatestnews.map(({news_id, CreatedDate, Header, ShortDescription, image, Category}, index) => (
			  	<Link 
			  		href={{
	     				pathname: '/DisplayNews',
	     				query:{news_id:news_id}
	    			}}
			  		key={index}
			  	>
			    	<a className="flex flex-col mb-5 even:bg-white odd:bg-gray-300 odd:dark:bg-slate-700 even:dark:bg-slate-600 px-2 py-5">
			      		<div className="w-full h-52 lg:!h-64 relative">
              				<Image
              	  				src={image}
              	  				fill
              	  				className="!bg-cover w-full !h-full border rounded-xl"
              	  				alt="latest news image"
              				/>
                  		</div>

                  		<div className="w-full flex flex-col my-5 text-left">
                  			<h1 className="text-lg lg:text-xl font-extrabold dark:text-white text-black tracking-wide leading-snug">
                     			{Header}
                    		</h1>
                    		<div className="mt-5 flex justify-between items-center">
                      			<h3 className="flex flex-col justify-between"> 
                        			{ Category.map((data,index)=>(
                          				<span key={index} className="text-lg lg:text-xl font-bold dark:text-white text-black mb-3">
                            				{data.NewsCategory.CategoryName}
                          				</span>
                        			))}
                      			</h3>
                      			<span className="font-normal text-sm lg:text-md dark:text-white text-gray-600">
                        			{moment(CreatedDate).utc().format('MMMM, Do YYYY')}
                      			</span>
                    		</div>
                  		</div>
				    </a>
				</Link>
		    ))}
		</div>
  	);
}
