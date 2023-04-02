import React, {useState} from "react";
import Image from 'next/future/image'
import moment from 'moment';
import Link from "next/link";
import { useRouter } from 'next/router'

export function DisplayLatestentertainment({Alllatestentertainment}) {

  	return (
	    <div className="sticky top-0 bottom-10 grid grid-cols-1 md:grid-cold-3 gap-5 w-full lg:w-[30%] h-full lg:h-[90rem] border rounded-lg shadow-2xl shadow-sky-200 scroll_width">
			{Alllatestentertainment.map(({entertainment_id, CreatedDate, Header, ShortDescription, image, Category}, index) => (
			  	<Link 
			  		href={{
	     				pathname: '/DisplayNews',
	     				query:{entertainment_id:entertainment_id}
	    			}}
			  		key={index}
			  	>
			    	<a className="flex flex-col mb-5 px-2 py-5 hover:bg-[#009688] group">
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
                          				<span key={index} className="text-xs lg:text-sm font-bold dark:text-white group-hover:text-black text-slate-600 mb-2">
                            				{data.EntertainmentCategory.CategoryName}
                          				</span>
                        			))}
                      			</h3>
                      			<span className="font-normal text-sm lg:text-md dark:text-white text-gray-600 group-hover:text-black">
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
