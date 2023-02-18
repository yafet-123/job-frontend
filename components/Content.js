import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import React, {useState,useEffect} from "react";
import moment from 'moment';

export function Content({entertainments}) {
     const [getSearchValue,setgetSearchValue] = useState("")
     return (
          <div className="w-full h-full">
               <div className="w-full px-3 lg:px-20 mb-5">
                     <div className="flex flex-col lg:flex-row w-full">
                         <div className="relative flex-1">
                             <input 
                                 id="search" 
                                 type="text" 
                                 className="block w-full px-2 lg:px-3 text-md lg:text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                 value={getSearchValue}
                                 onChange={(e) => setgetSearchValue(e.target.value)}
                             />
                             <label 
                                 htmlFor="floating_outlined" 
                                 className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-300 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                             >
                                 Search
                             </label>
                         </div>
                         <div className="lg:mx-2 mt-5 lg:mt-0 flex items-center justify-center">
                             <div className="dropdown inline-block relative">
                                 <button className="flex justify-between rounded-xl w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-md lg:text-xl px-2 lg:px-4 py-4 text-center inline-flex items-center">
                                     <span className="mr-1">Search</span>
                                     <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                                 </button>
                             </div>
                         </div>
                     </div>  
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 !pt-5 px-2 lg:px-5">
                    {entertainments.map(({Header,Category,CreatedDate}, index) => (
                         <div key={index} className="!flex !flex-col !w-full !h-full !mb-5 lg:!mb-0">
                              <ReactPlayer className="!w-full !h-full !object-fit lg:!mb-5" url='https://www.facebook.com/100060800040546/videos/383129830691075/' />
                              <h1 className="group-hover:underline text-lg lg:text-2xl font-extrabold dark:text-slate-300 text-slate-600 tracking-wide leading-snug mb-5">
                                   {Header}
                              </h1>
                              <div className="flex flex-row justify-between mb-5">
                                   <h3 className="flex flex-col justify-between">
                                        { Category.map((data,index)=>(
                                             <span key={index} className="text-lg lg:text-xl font-bold dark:text-white text-black mb-3">
                                                  {data.EntertainmentCategory.CategoryName}
                                             </span>
                                        ))}
                                   </h3>
                                   <h3 className="font-normal text-sm lg:text-md dark:text-slate-300 text-slate-600">
                                       {moment(CreatedDate).utc().format('YYYY-MM-DD')}
                                   </h3>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     )
}
     