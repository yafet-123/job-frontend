import Link from "next/link";
import moment from 'moment';
import { useState, useEffect, useRef} from 'react'
import { AiOutlineShareAlt, AiOutlineEye, AiOutlineMenu, AiOutlineClockCircle } from 'react-icons/ai'
import Image from 'next/image'

export function Company({categories}) {
  	return (
	   <div className="flex flex-col overflow-y-scroll scroll_width p-3">
			{categories.map((data, index) => (
				<button 
					className="flex items-center group hover:bg-neutral-500 py-2 mb-5" 
					key={index}
					onClick = {()=>{
			           	router.push({
			                pathname:"/JobsByCategory",
			                query:{category:data.CategoryName, howmany:data._count.JobCategory, category_id: data.category_id}
			            })
		        	}}
			    >
				   	<h1 className="group-hover:text-white text-left font-normal text-sm md:text-lg lg:text-xl capitalize px-2">
				        {data.CategoryName}
				    </h1>
				</button>
			))}
		</div>
	);
}
