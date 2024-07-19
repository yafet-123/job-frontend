import React, {useState,useRef} from "react";
import Image from 'next/future/image'
import moment from 'moment';
import { useRouter } from 'next/router'
import 'react-quill/dist/quill.snow.css';
import { NewsSharing } from './NewsSharing';
import {Share} from '../common/Share.js'
import { AiOutlineShareAlt, AiOutlineEye } from 'react-icons/ai'
 
export function DisplayIndvidualNews({news, newsCategory,AllcategoryNews,shareUrl, quotes}) {
	const quoteRef = useRef(null)
	const router = useRouter()
	const [id, setid] = useState()
  	const [viewmodalOn, setviewModalOn] = useState(false)
  	const clickedForview = () => {
      setviewModalOn(true)
  	}
  	return (
	    <div className="flex flex-col flex-1 pb-20 w-full lg:w-[72%]">
		    <h1 className="text-lg lg:text-4xl font-extrabold dark:text-white text-black tracking-wide leading-snug mb-5 hover:text-[#009688]">
	            {news.Header}
	        </h1>

	        <div className="lg:mr-5 h-80 lg:!h-[30rem] relative ">
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
	                    	<span key={index} className="text-sm lg:text-lg font-bold dark:text-[#009688] text-slate-600 mb-1 hover:text-[#009688]">
	                      		{data.CategoryName}
	                    	</span>
	                  	))}
	                </h3>
	                <h3 className="text-left font-normal text-sm lg:text-lg dark:text-[#009688] text-slate-600 w-1/4 hover:text-[#009688]">
	                	{moment(news.CreatedDate).utc().format('MMMM, Do YYYY')}
	                </h3>
	            </div>

	            <div className="bg-transparent text-black dark:!text-white mt-5 ql-editor ql-snow" dangerouslySetInnerHTML={{ __html: news.Description }} />
	        </div>

	        <NewsSharing shareUrl={shareUrl} quotes={quotes}  />

	        <div className="flex flex-col">
	        	<h1 className="text-lg lg:text-3xl font-extrabold dark:text-white text-black tracking-wide leading-snug hover:text-[#009688]">Related Topics</h1>
	        	<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
		        	{ AllcategoryNews.map((data, index)=>(
		        		<div key={index}>
	            			<button 
	              				onClick = {()=>{
	                				router.push({
	                  					pathname:"/DisplayNews",
	                  					query:{news_id:data.news_id}
	                				})
	              				}}
	              				id={data.news_id} ref={quoteRef} className="flex flex-col w-full lg:mt-5 group pt-5"
	            			>
	            				<div className="w-full !h-52 lg:!h-72 relative">
	                				<Image src={data.Image} fill className="!bg-cover w-full !h-full border rounded-xl" alt="latest news image"/>
	              				</div>

	              				<h1 className="text-left group-hover:text-[#009688] group-hover:underline text-lg lg:text-xl font-extrabold dark:text-[#009688] text-slate-600 tracking-wide leading-snug">
	                  				{data.Header}
	                			</h1>
	                			<div  className="text-lg group-hover:text-[#009688] bg-transparent text-black dark:!text-white text-left mt-2" dangerouslySetInnerHTML={{ __html: data.ShortDescription }} />
	            			</button>

	            			<div className="flex items-center justify-between text-sm"> 
	            				<h3 className="text-left font-normal text-sm lg:text-md dark:text-white text-slate-600">
                                	{moment(data.CreatedDate).utc().format('MMMM, Do YYYY')}
                                </h3>

	              				<p className="flex flex-row items-center text-black dark:text-white hover:text-[#009688] font-bold py-2 hover:scale-110 duration-1000 ease-in-out rounded ">
	                				<AiOutlineEye size={32} />
	                				<span className="ml-3">{data.view}</span>
	              				</p>
	            			</div>
	            		</div>
		        	))}
		        </div>
	        </div>

	        {viewmodalOn && 
       			<Share setviewModalOn={setviewModalOn} shareUrl={shareUrl} id={id} />
      		}
	    </div>
  	);
}
