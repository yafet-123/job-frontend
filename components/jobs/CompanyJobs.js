import Link from "next/link";
import moment from 'moment';
import { useState, useEffect, useRef} from 'react'
import { AiOutlineShareAlt, AiOutlineEye, AiOutlineMenu, AiOutlineClockCircle } from 'react-icons/ai'
import Image from 'next/image'

export function CompanyJobs({jobs,setviewModalOn}) {
	const quoteRef = useRef(null)
  	const quote = quoteRef.current?.textContent ?? "";
  	const [quotes, setquotes] = useState()
  	console.log(quote)

  	const clickedForview = () => {
      setviewModalOn(true)
  	}
  	return (
	   <div>
			{ jobs.map((data,index)=>(
				<div id={index} key={index} ref={quoteRef} className="flex flex-col w-full bg-neutral-300 dark:bg-slate-800 mb-10 p-3 border rounded-lg">
					<div className="flex justify-between items-center mb-5">
						<Link href="/DisplayJobs">
							<a className="text-sm lg:text-2xl text-[#009688] font-bold">Job Type: {data.JobsType} </a>
						</Link>
						<p className="text-xs lg:text-lg text-[#009688]">Posted: {moment(data.ModifiedDate).utc().format('MMM DD')}</p>
					</div>

					<div className="flex flex-col-reverse md:flex-row items-center">
						<ul className="mt-10 w-full lg:w-3/4">
					  		<li className="flex flex-row justify-between items-center w-full mb-5">
					  			<h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Company Name:</h1>
					  			<p className="text-xs lg:text-lg text-left w-1/2">{data.CompanyName}</p>
					  		</li>

					  		<li className="flex flex-row justify-between items-center w-full mb-5">
					  			<h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Location:</h1>
					  			<p className="text-xs lg:text-lg text-left w-1/2">{data.Location}</p>
					  		</li>

					  		<li className="flex flex-row justify-between items-center w-full mb-5">
					  			<h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Career Level:</h1>
					  			<p className="text-xs lg:text-lg text-left w-1/2">{data.CareerLevel}</p>
					  		</li>

					  		<li className="flex flex-row justify-between items-center w-full mb-5">
					  			<h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Dead Line</h1>
					  			<p className="text-xs lg:text-lg text-left w-1/2">{moment(data.DeadLine).utc().format('MMM DD')}</p>
					  		</li>
						</ul>

						<Image src={data.image == "" || data.image == null ? "/images/bgImage1.avif" : data.image} width={100} height={100} alt="image" required className="my-5" />
					</div>

					<div className="!bg-transparent !text-black dark:!text-white mt-5 w-full" dangerouslySetInnerHTML={{ __html: data.JobsDescreption }} />

					<div className="flex items-center justify-between text-sm my-5"> 
						<p className="flex flex-row items-center text-black dark:text-white hover:text-[#009688] font-bold py-2 px-4 hover:scale-110 duration-1000 ease-in-out rounded ">
						  	<AiOutlineEye size={32} />
						  	<span className="ml-3">12</span>
						</p>

						<Link 
							href={{
					     		pathname: '/DisplayJobs',
					     		query:{job_id:data.job_id}
					        }}
						>
							<a className="font-bold text-white text-md lg:text-xl bg-[#009688] p-4 border rounded-2xl hover:bg-white hover:text-[#009688]">
								view detail
							</a>
						</Link>

						<button
						    onClick={() => {
						        clickedForview()
						        setid(index)
						        setquotes(quote)
						    }} 
						    className="text-black dark:text-white hover:text-[#009688] font-bold py-2 px-4 hover:scale-110 duration-1000 ease-in-out rounded ">
						    <AiOutlineShareAlt size={32} />
						</button>
            		</div>
				</div>
			))}
		</div>
	);
}
