import Link from "next/link";
import moment from 'moment';
import { useState, useEffect, useRef} from 'react'
import { AiOutlineShareAlt, AiOutlineEye, AiOutlineMenu, AiOutlineClockCircle } from 'react-icons/ai'
import Image from 'next/image'
import { useRouter } from 'next/router'

export function Location({locations}) {
	const router = useRouter();
	const location = router.query.location

  	return (
	   <div className="flex flex-col overflow-y-scroll scroll_width p-3">
			{locations.map((data, index) => (
			    <button 
			    	className={` ${data.LocationName == location ? "bg-[#009688] dark:bg-[#009688] text-white" : "hover:bg-neutral-500 group-hover:text-white" } flex items-center group hover:bg-white px-4 py-3 mb-5`} 
			    	key={index}
			    	onClick = {()=>{
		                router.push({
		                    pathname:"/Jobs/Location",
		                    query:{location:data.LocationName, howmany:data._count.Job, image:data.Image, location_id:data.location_id}
		                })
		            }}
			    >
			    	<Image src={data.Image == null ? "/images/bgImage1.avif" : data.Image} width={25} height={25} alt="image that will be displayed" />
				   	<h1 className="text-left font-normal text-sm md:text-lg lg:text-xl capitalize group-hover:text-white ml-5 dark:text-white">
				          jobs in {data.LocationName}
				    </h1>
				</button>
			))}
		</div>
	);
}
