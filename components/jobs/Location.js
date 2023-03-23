import Link from "next/link";
import moment from 'moment';
import { useState, useEffect, useRef} from 'react'
import { AiOutlineShareAlt, AiOutlineEye, AiOutlineMenu, AiOutlineClockCircle } from 'react-icons/ai'
import Image from 'next/image'

export function Location({locations}) {
  	return (
	   <div className="flex flex-col overflow-y-scroll scroll_width p-3">
			{locations.map((data, index) => (
			    <button 
			    	className="flex items-center group hover:bg-white py-2 mb-5" 
			    	key={index}
			    	onClick = {()=>{
		                router.push({
		                    pathname:"/JobsByLocation",
		                    query:{location:data.LocationName, howmany:data._count.Job, image:data.Image, location_id:data.location_id}
		                })
		            }}
			    >
			    	<Image src={data.Image == null ? "/images/bgImage1.avif" : data.Image} width={25} height={25} alt="image that will be displayed" />
				   	<h1 className="text-left font-normal text-sm md:text-lg lg:text-xl capitalize group-hover:text-orange-500 ml-5">
				          jobs in {data.LocationName}
				    </h1>
				</button>
			))}
		</div>
	);
}
