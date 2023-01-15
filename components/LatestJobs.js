import Link from "next/link";
import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import moment from 'moment'
import { useRouter } from 'next/router' 

export function LatestJobs({latestjobs}) {
  const router = useRouter()
  return (
    <section className="w-full h-[50rem] md:p-20 bg-gray-100 dark:bg-slate-800 flex flex-col brightness-100">
      <div className="flex justify-between items-center py-10 px-2 lg:px-0">
        <div className="flex items-center font-bold text-md md:text-2xl lg:text-3xl text-black dark:text-white capitalize">
          <AiOutlineClockCircle size={30} />
          <span className="ml-5">Latest Jobs</span>
        </div>
        <Link href="/Jobs">
          <a className="font-bold text-sm md:text-xl lg:text-2xl text-white p-3 lg:p-4 bg-blue-700 capitalize border rounded-2xl">
            view all jobs
          </a>
        </Link>
      </div>

      <div className="md:max-w-7xl md:mx-auto bg-gray-200 dark:bg-slate-800 w-full h-[40rem] border dark:border-slate-800 rounded-lg md:mt-10 shadow-2xl shadow-sky-200 flex flex-col overflow-y-scroll">
        {latestjobs.map((data, index) => (
          <button
            className="flex justify-around items-center mb-5 even:bg-white dark:bg-slate-700 px-10 py-5 group"
            key={index}
            type = "button"
            onClick = {()=>{
              router.push({
                pathname:"/DisplayJobs",
                query:{job_id:data.job_id}
              })
            }}
          >
            <div className="flex flex-col w-1/2">
              <h1 className="text-left font-bold text-sm md:text-lg lg:text-xl text-blue-500 dark:text-white group-hover:text-orange-500">
                {data.JobsType}
              </h1>
              <h1 className="text-left font-light text-xs md:text-sm lg:text-lg text-blue-500 dark:text-white group-hover:text-orange-500">
                {data.CompanyName}
              </h1>
            </div>
            <div className="flex flex-col w-1/2">
              <h1 className="font-light text-xs md:text-sm lg:text-lg text-blue-500 dark:text-white text-right group-hover:text-orange-500">
                {moment(data.createDate).utc().format('YYYY-MM-DD')}
              </h1>
              <h1 className="font-light text-xs md:text-sm lg:text-lg text-blue-500 dark:text-white text-right group-hover:text-orange-500">
                {data.Location}
              </h1>
            </div>
           </button>
          ))}
      </div>
    </section>
  );
}
