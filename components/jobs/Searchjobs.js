import React, {useState} from "react";
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { BiCategory } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { FaClock } from "react-icons/fa";
import moment from 'moment';

export function Searchjobs({categories,locations,latestjobs}) {
  const router = useRouter();
  const [jobs, setJobs] = useState("latest");
  return (
    <div className="px-0 md:px-24 bg-[#e6e6e6] dark:bg-[#02201D] pt-5 pb-10">
      <div className="flex flex-row justify-between items-center h-full lg:h-16 w-full mb-5 px-2 lg:px-0">
        <h1 className="font-semibold text-[#009688] dark:text-white text-md md:text-3xl lg:text-4xl capitalize w-full">
          Search and Find Jobs in Ethiopia
        </h1>
      </div>
      
      <hr className="w-full bg-gray-200 mb-5" />

      <div className="flex w-full h-[25rem] lg:h-[45rem] bg-neutral-100 dark:bg-[#1B2637] border rounded-xl p-2 lg:p-5">
        <div className="flex-1 border rounded-xl shadow-2xl shadow-zinc-900 border-slate-800 dark:border-slate-800 lg:p-5">
          <div className="w-full h-full overflow-y-scroll">
            {jobs == "latest" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5 py-10">
                {latestjobs.map((data, index) => (
                  <button
                    className="flex justify-between items-center mb-3 group hover:bg-[#009688] px-2 lg:px-4 py-2 w-full"
                    key={index}
                    type = "button"
                    onClick = {()=>{
                      router.push({
                        pathname:"/DisplayJobs",
                        query:{job_id:data.job_id}
                      })
                    }}
                  >
                    <div className="flex flex-col w-2/4 lg:w-3/4">
                      <h1 className="font-normal text-sm lg:text-lg text-[#009688] group-hover:text-white text-left">
                        {data.JobsType}
                      </h1>
                      <h1 className="font-light text-xs lg:text-sm text-black dark:text-white group-hover:text-white text-left">
                        {data.CompanyName}
                      </h1>
                    </div>
                    <div className="flex flex-col items-center justify-center w-1/4 lg:w-1/4">
                      <h1 className="font-light text-xs text-black dark:text-white md:text-lg text-right group-hover:text-white">
                        {moment(data.createDate).utc().format('YYYY-MM-DD')}
                      </h1>
                      <h1 className="font-light text-xs text-black dark:text-white md:text-lg text-right group-hover:text-white">
                        {data.Location}
                      </h1>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {jobs == "location" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
                {locations.map((data, index) => (
                  <button
                    className="w-full flex items-center mb-3 group hover:bg-[#009688] px-2 lg:px-4 py-2"
                    key={index}
                    type = "button"
                    onClick = {()=>{
                      router.push({
                        pathname:"/JobsByLocation",
                        query:{location:data.LocationName, howmany:data._count.Job, image:data.Image, location_id:data.location_id}
                      })
                    }}
                  >
                    <Image src={data.Image == null ? "/images/bgImage1.avif" : data.Image} width={50} height={50} alt="image that will be displayed" />
                    <div className="flex flex-col ml-10">
                      <h1 className="text-black dark:text-white font-normal text-xs md:text-lg lg:text-xl capitalize group-hover:text-white mb-5">
                        jobs in {data.LocationName}
                      </h1>
                      <h1 className="text-black dark:text-white text-left text-[#009688] font-bold text-xs md:text-lg lg:text-xl group-hover:text-white group-hover:border-white">
                        {data._count.Job}
                      </h1>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {jobs == "category" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
                {categories.map((data, index) => (
                  <button
                    className="flex justify-between items-center mb-3 group hover:bg-[#009688] px-2 lg:px-4 py-2 w-full"
                    key={index}
                    type = "button"
                    onClick = {()=>{
                      router.push({
                        pathname:"/JobsByCategory",
                        query:{category: data.CategoryName, howmany:data._count.JobCategory, category_id: data.category_id}
                      })
                    }}
                  >
                    <h1 className="w-2/4 lg:w-3/4 text-left text-black dark:text-white font-normal text-xs md:text-lg lg:text-xl capitalize group-hover:text-white">
                      {data.CategoryName}
                    </h1>
                    <h1 className="w-1/4 px-2 lg:px-5 py-2 text-black dark:text-white border rounded-xl border-[#009688] text-[#009688] font-bold text-xs md:text-lg lg:text-xl group-hover:text-white group-hover:border-white">
                      {data._count.JobCategory}
                    </h1>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <ul className="mt-5">
          <li
            onClick={(e) => setJobs("latest")}
            className={
              jobs == "latest"
                ? "py-3 bg-[#009688] px-6 border border-slate-300 flex items-center text-white dark:border-none hover:font-bold -ml-1"
                : "py-3 bg-gray-200 dark:bg-slate-600 border-4 border-y-white dark:border-slate-700 flex items-center hover:bg-white hover:text-black"
            }
          >
            <span className="font-bold text-md lg:text-lg">
              <FaClock />
            </span>
            <span className="hidden lg:inline-flex text-xl ml-3 capitalize">
              View latest jobs
            </span>
          </li>

          <li
            onClick={(e) => setJobs("category")}
            className={
              jobs == "category"
                ? "py-3 bg-[#009688] px-6 border border-slate-300 flex items-center text-white dark:border-none hover:font-bold -ml-1"
                : "py-3 bg-gray-200 dark:bg-slate-600 border-4 border-y-white dark:border-slate-700 flex items-center hover:bg-white hover:text-black"
            }
          >
            <span className="font-bold text-md lg:text-lg">
              <BiCategory />
            </span>
            <span className="hidden lg:inline-flex text-xl ml-3">
              Jobs by Category
            </span>
          </li>
          <li
            onClick={(e) => setJobs("location")}
            className={
              jobs == "location"
                ? "py-3 bg-[#009688] px-6 border border-slate-300 flex items-center text-white dark:border-none hover:font-bold -ml-1"
                : "py-3 bg-gray-200 dark:bg-slate-600 border-4 border-y-white dark:border-slate-700 flex items-center hover:bg-white hover:text-black"
            }
          >
            <span className="font-bold text-md lg:text-lg">
              <GoLocation />
            </span>
            <span className="hidden lg:inline-flex text-xl ml-3">
              Jobs by Location
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
