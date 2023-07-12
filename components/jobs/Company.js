import Link from "next/link";
import moment from 'moment';
import { useState, useEffect, useRef} from 'react'
import { AiOutlineShareAlt, AiOutlineEye, AiOutlineMenu, AiOutlineClockCircle } from 'react-icons/ai'
import Image from 'next/image'
import { useRouter } from 'next/router'

export function Company({categories}) {
	const router = useRouter();
	const category = router.query.category
	console.log(category)
  	return (
	   <div className="flex flex-col overflow-y-scroll scroll_width p-3">
			{categories.map((data, index) => (
				<button 
					className="flex items-center group py-2 mb-5" 
					key={index}
					onClick = {()=>{
			           	router.push({
			                pathname:"/Jobs?/Category",
			                query:{category:data.CategoryName, howmany:data._count.JobCategory, category_id: data.category_id}
			            })
		        	}}
			    >
				   	<h1 className={`${data.CategoryName == category ? "bg-[#009688] dark:bg-[#009688] text-white":"hover:bg-neutral-500  group-hover:text-white" } rounded-xl dark:text-white text-black text-left font-normal text-sm md:text-lg lg:text-xl capitalize py-4 px-5 w-full`}>
				        {data.CategoryName}
				    </h1>
				</button>
			))}
		</div>
	);
}
