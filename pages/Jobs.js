import React from "react";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { FaClock } from "react-icons/fa";
import {RiGovernmentLine} from "react-icons/ri";
import { useState } from "react";
import { JobsByLocation } from "../data/JobsByLocation";
import { LatestJobsList } from "../data/LatestJobs";
import { GovernmentJobs } from "../data/GovernmentJobs";
import { AiOutlineSearch, AiOutlineFacebook } from "react-icons/ai";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { prisma } from '../util/db.server.js'
import moment from 'moment';

export async function getServerSideProps(){
  const categories = await prisma.Category.findMany({
    include:{
       _count:{
        select:{
          JobCategory:true
        }
      },
    }
  });
  const locations = await prisma.Location.findMany({
    include:{
       _count:{
        select:{
          Job:true
        }
      },
    }
  });
  const jobs = await prisma.Job.findMany({ 
    orderBy: {
      ModifiedDate:"asc"
    },
    include:{
      User:{
        select:{
          UserName:true
        }
      },
      Location:{
        select:{
          LocationName:true
        }
      }
    } 
  });

  const Alljobs = jobs.map((data)=>({
    job_id:data.job_id,
    CompanyName:data.CompanyName,
    Image:data.Image,
    JobsType:data.JobsType,
    Location:data.Location.LocationName,
    CareerLevel:data.CareerLevel,
    EmploymentType:data.EmploymentType,
    Salary:data.Salary,
    JobsDescreption:data.JobsDescreption,
    JobsRequirement:data.JobsRequirement,
    DeadLine:data.DeadLine,
    Apply:data.Apply,
    location_id:data.location_id,
    userName:data.User.UserName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate
  }))
  
  const reversejob = Alljobs.reverse();

  return{
    props:{
      categories:JSON.parse(JSON.stringify(categories)),
      locations:JSON.parse(JSON.stringify(locations)),
      latestjobs:JSON.parse(JSON.stringify(reversejob)),
    }
  }
}

export default function SearchJobs({categories, locations, latestjobs}) {
  const [jobs, setJobs] = useState("latest");
  console.log(latestjobs[0].job_id)
  const router = useRouter()
  return (
    <section className="flex flex-col w-full h-full py-20 px-0 md:px-24 bg-gray-200 dark:bg-slate-700 pt-32">
      <div className="flex flex-col lg:flex-row justify-between items-center h-16 w-full mb-10 px-10">
        <h1 className="text-black dark:text-white font-light text-md md:text-3xl lg:text-4xl capitalize lg:mb-5 text-center">
          Search and Find Jobs in Ethiopia
        </h1>

        <button 
          className={`text-black dark:text-white text-black text-md md:text-2xl lg:text-3xl focus:bg-red-400 p-4 rounded-xl`} 
          onClick={() => router.push("/AdvanceSearch")}
        >
          Advance Search
        </button>
      </div>
  
      <hr className="w-full bg-gray-200 mb-5" />

      <div className="flex w-full h-[25rem] lg:h-[45rem] bg-white dark:bg-slate-800 border rounded-xl p-2">
        <div className="flex-1 border rounded-xl shadow-2xl shadow-sky-200 border-slate-300 dark:border-slate-800 lg:p-5">
          <div className="w-full h-full overflow-y-scroll">
            {jobs == "latest" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5 py-10">
                {latestjobs.map((data, index) => (
                  <button
                    className="flex justify-between items-center mb-3 group hover:bg-gray-200 px-2 lg:px-4 py-2 w-full"
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
                      <h1 className="font-normal text-sm lg:text-lg text-blue-500 dark:text-white group-hover:text-orange-500 text-left">
                        {data.JobsType}
                      </h1>
                      <h1 className="font-light text-xs lg:text-sm text-black dark:text-white group-hover:text-orange-500 text-left">
                        {data.CompanyName}
                      </h1>
                    </div>
                    <div className="flex flex-col items-center justify-center w-1/4 lg:w-1/4">
                      <h1 className="font-light text-xs text-black dark:text-white md:text-lg text-right group-hover:text-orange-500">
                        {moment(data.createDate).utc().format('YYYY-MM-DD')}
                      </h1>
                      <h1 className="font-light text-xs text-black dark:text-white md:text-lg text-right group-hover:text-orange-500">
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
                    className="w-full flex items-center mb-3 group hover:bg-gray-200 px-2 lg:px-4 py-2"
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

            {jobs == "category" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
                {categories.map((data, index) => (
                  <button
                    className="flex justify-between items-center mb-3 group hover:bg-gray-200 px-2 lg:px-4 py-2 w-full"
                    key={index}
                    type = "button"
                    onClick = {()=>{
                      router.push({
                        pathname:"/JobsByCategory",
                        query:{category: data.CategoryName, howmany:data._count.JobCategory, category_id: data.category_id}
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
            )}
          </div>
        </div>
        <ul className="mt-5">
          <li
            onClick={(e) => setJobs("latest")}
            className={
              jobs == "latest"
                ? "py-3 bg-white dark:bg-slate-800 px-6 border border-slate-300 flex items-center hover:text-blue-400 border-x-white dark:border-none -ml-1"
                : "py-3 bg-gray-200 dark:bg-slate-600 px-6 border border-slate-300 dark:border-slate-700 flex items-center hover:bg-white hover:text-blue-400"
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
                ? "py-3 bg-white dark:bg-slate-800 px-6 border border-slate-300 flex items-center hover:text-blue-400 border-x-white dark:border-none -ml-1"
                : "py-3 bg-gray-200 dark:bg-slate-600 px-6 border border-slate-300 dark:border-slate-700 flex items-center hover:bg-white hover:text-blue-400"
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
    </section>
  );
}
