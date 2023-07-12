import React, {useState} from "react";
import Image from 'next/future/image'
import moment from 'moment';
import Link from "next/link";
import { useRouter } from 'next/router'


export function DisplayLatestentertainment({Alllatestentertainment}) {

  	return (
	    <div className="lg:sticky top-0 bottom-10 flex flex-col w-full lg:w-[28%] h-full lg:h-[90rem] border rounded-lg shadow-2xl shadow-sky-200 scroll_width">
			{Alllatestentertainment.map(({entertainment_id, CreatedDate, Header, ShortDescription, image, Category}, index) => (
			  	<Link 
			  		href={{
	     				pathname: '/Entertemiment/Display',
	     				query:{entertainment_id:entertainment_id}
	    			}}
			  		key={index}
			  	>
			    	<a className="flex flex-col px-2 py-3 hover:bg-[#009688] group hover:rounded-3xl">
			      		<div className="w-full h-52 lg:!h-64 relative">
              				<Image
              	  				src={image}
              	  				fill
              	  				className="!bg-cover w-full !h-full"
              	  				alt="latest news image"
              				/>
                  		</div>

                  		<div className="w-full flex flex-col mt-5 text-left">
                  			<h1 className="text-lg lg:text-xl font-extrabold dark:text-white text-black tracking-wide leading-snug group-hover:text-white">
                     			{Header}
                    		</h1>
                    		<div className="mt-5 flex justify-between items-center">
                      			<h3 className="flex flex-col justify-between"> 
                        			{ Category.map((data,index)=>(
                          				<span key={index} className="group-hover:text-white text-xs lg:text-sm font-bold dark:text-white text-slate-600 mb-1">
                            				{data.EntertainmentCategory.CategoryName}
                          				</span>
                        			))}
                      			</h3>
                      			<span className="font-normal text-sm lg:text-md dark:text-white text-gray-600 group-hover:text-white">
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
