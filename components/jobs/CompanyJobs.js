import Link from "next/link";
import moment from 'moment';
import { useState, useEffect, useRef} from 'react'
import { AiOutlineShareAlt, AiOutlineEye, AiOutlineMenu, AiOutlineClockCircle } from 'react-icons/ai'
import Image from 'next/image'
import {Share} from '../common/Share.js'
export function CompanyJobs({jobs,shareUrl}) {
	console.log(jobs)
	const quoteRef = useRef(null)
  	const quote = quoteRef.current?.textContent ?? "";
  	const [quotes, setquotes] = useState()
  	const [viewmodalOn, setviewModalOn] = useState(false)
 	const [id, setid] = useState()
 

  	const clickedForview = () => {
      setviewModalOn(true)
  	}

  	return (
	   <div>
			{ jobs.map(({job_id,JobsName,ModifiedDate,CompanyName,Location,CareerLevel,DeadLine,image,shortDescreption,view},index)=>(
				<div id={index} key={index} ref={quoteRef} className="flex flex-col w-full bg-neutral-300 dark:bg-slate-800 mb-10 p-3 border rounded-lg">
					<div className="flex justify-between items-center mb-5">
						<Link href="/Jobs/Display">
							<a className="text-sm lg:text-2xl text-[#009688] font-bold">Job Name: {JobsName} </a>
						</Link>
					</div>

					<div className="flex flex-col-reverse md:flex-row items-center">
						<ul className="mt-10 w-full lg:w-3/4">
					  		<li className="flex flex-row justify-between items-center w-full mb-5">
					  			<h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Company Name:</h1>
					  			<p className="text-xs lg:text-lg text-left w-1/2">{CompanyName}</p>
					  		</li>

					  		<li className="flex flex-row justify-between items-center w-full mb-5">
					  			<h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Location:</h1>
			                    <div className="flex flex-col w-1/2">
			                        { Location.map((data,index)=>(
			                            <p key={index} className="text-xs lg:text-lg text-left mb-2">{data.Location.LocationName}</p>
			                        ))}
			                    </div>
					  		</li>

					  		<li className="flex flex-row justify-between items-center w-full mb-5">
					  			<h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Career Level:</h1>
					  			<p className="text-xs lg:text-lg text-left w-1/2">{CareerLevel}</p>
					  		</li>

					  		<li className="flex flex-row justify-between items-center w-full mb-5">
					  			<h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Dead Line</h1>
					  			<p className="text-xs lg:text-lg text-left w-1/2">{moment(DeadLine).utc().format('MMM DD')}</p>
					  		</li>
						</ul>

						<Image src={image == "" || image == null ? "/images/bgImage1.avif" : image} width={100} height={100} alt="image" required className="my-5" />
					</div>

					<div className="!bg-transparent !text-black dark:!text-white mt-5 w-full" dangerouslySetInnerHTML={{ __html: shortDescreption }} />

					<div className="flex flex-col lg:flex-row items-center justify-between text-md my-5"> 
						<h3 className="text-left font-normal text-md lg:text-lg dark:text-white text-slate-600">
                    		{moment(ModifiedDate).utc().format('MMM DD')}
                  		</h3>

						<Link 
							href={{
					     		pathname: '/Jobs/Display',
					     		query:{job_id:job_id}
					        }}
						>
							<a className="text-center font-bold text-white text-md lg:text-xl bg-[#009688] py-4 px-7 border rounded-2xl hover:bg-white hover:text-[#009688]">
								Read More
							</a>
						</Link>

						<p className="flex flex-row items-center text-black dark:text-white hover:text-[#009688] font-bold py-2 hover:scale-110 duration-1000 ease-in-out rounded ">
                    		<AiOutlineEye size={20} />
                    		<span className="ml-3 text-md">{view}</span>
                  		</p>
            		</div>
				</div>
			))}
		</div>
	);
}
