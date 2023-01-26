import React from "react";
import { LatestJobsList } from "../data/LatestJobs";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { useState } from "react";
import { JobsByLocation } from "../data/JobsByLocation";
import Image from 'next/image'
import { useRouter } from 'next/router'

export function SearchJobs({categories, locations}) {
  const [jobs, setJobs] = useState("category");
  const router = useRouter();
  return (
    <div className="flex flex-col w-full h-full py-20 px-0 md:px-32 bg-white dark:bg-slate-700">
      <h1 className="font-light text-2xl md:text-3xl lg:text-4xl capitalize mb-5 text-center md:text-left px-7 md:px-0">
        Search and Find Jobs in Ethiopia
      </h1>
      <hr className="w-full bg-gray-200 mb-5" />
      <div className="flex w-full h-[30rem] lg:h-[45rem] p-2">
        <div className="w-[75%] flex-1 border rounded-xl shadow-2xl shadow-sky-200 border-slate-300 p-5 bg-white dark:bg-slate-800">
          <div className="w-full h-full overflow-y-scroll">
            {jobs == "category" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
                {categories.map((data, index) => (
                  <button
                    className="flex justify-between items-center mb-3 group hover:bg-gray-200 px-2 lg:px-4 py-2 w-full"
                    key={index}
                    type = "button"
                    onClick = {()=>{
                      router.push({
                        pathname:"/JobsByCategory",
                        query:{category: data.CategoryName, howmany:"89", category_id: data.category_id}
                      })
                    }}
                  >
                    <h1 className="w-2/4 lg:w-3/4 text-left text-black dark:text-white font-normal text-xs md:text-lg lg:text-xl capitalize group-hover:text-orange-500">
                      {data.CategoryName}
                    </h1>
                    <h1 className="w-1/4 px-2 lg:px-5 py-2 text-black dark:text-white border rounded-xl border-gray-200 text-blue-800 font-bold text-xs md:text-lg lg:text-xl group-hover:text-orange-500 group-hover:border-orange-200">
                      {data._count.JobCategory}
                    </h1>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
                {locations.map((data, index) => (
                  <button
                    className="w-full flex items-center mb-3 group hover:bg-gray-200 px-2 lg:px-4 py-2"
                    key={index}
                    type = "button"
                    onClick = {()=>{
                      router.push({
                        pathname:"/JobsByLocation",
                        query:{location:data.LocationName, howmany:78, image:data.Image, location_id:data.location_id}
                      })
                    }}
                  >
                    <Image src={data.Image == null ? "/images/bgImage1.avif" : data.Image} width={50} height={50} alt="image that will be displayed" />
                    <div className="flex flex-col ml-5 lg:ml-10">
                      <h1 className="text-black dark:text-white font-normal text-xs md:text-lg lg:text-xl capitalize group-hover:text-orange-500 mb-5">
                        jobs in {data.LocationName}
                      </h1>
                      <h1 className="text-black dark:text-white text-left text-blue-800 font-bold text-xs md:text-lg lg:text-xl group-hover:text-orange-500 group-hover:border-orange-200">
                        {data._count.Job}
                      </h1>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <ul className="mt-5">
          <li
            onClick={(e) => setJobs("category")}
            className={
              jobs == "category"
                ? "py-3 bg-white dark:bg-slate-800 px-6 border border-slate-300 flex items-center hover:text-blue-400 border-x-white dark:border-none -ml-1"
                : "py-3 bg-gray-200 dark:bg-slate-600 px-6 border border-slate-300 dark:border-slate-700 flex items-center hover:bg-white hover:text-blue-400"
            }
          >
            <span className="font-bold text-md lg:text-lg">
              <BiCategory />
            </span>
            <span className="hidden lg:inline-flex text-xl ml-2 lg:ml-3">
              Jobs by Category
            </span>
          </li>
          <li
            onClick={(e) => setJobs("location")}
            className={
              jobs == "location"
                ? "py-3 bg-white dark:bg-slate-800 px-6 border border-slate-300 flex items-center hover:text-blue-400 border-x-white dark:border-none -ml-1"
                : "py-3 bg-gray-200 dark:bg-slate-600 px-6 border border-slate-300 dark:border-slate-700 flex items-center hover:bg-white hover:text-blue-400"
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
