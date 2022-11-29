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

export default function SearchJobs() {
  const [jobs, setJobs] = useState("latest");
  const router = useRouter()
  return (
    <section className="flex flex-col w-full h-full py-20 px-0 md:px-32 bg-gray-200">
      <div className="flex h-16 w-full mb-10 border rounded-10 px-10">
          <div className="h-full w-full bg-white text-black pl-5 flex items-center justify-center border rounded-xl">
            <AiOutlineSearch size={20} />
            <input className="flex-1 outline-none pl-5 h-full text-lg" />
            <p className="h-full text-lg md:text-2xl text-white bg-yellow-600 px-1 md:px-2 flex items-center justify-center border rounded-xl">
              Search
            </p>
          </div>
        </div>
      <h1 className="font-light text-2xl md:text-3xl lg:text-4xl capitalize mb-5 text-center">
        Search and Find Jobs in Ethiopia
      </h1>
      <hr className="w-full bg-gray-200 mb-5" />
      <div className="flex w-full h-full lg:h-[45rem] bg-white border rounded-xl p-2">
        <div className="flex-1 border rounded-xl shadow-2xl shadow-sky-200 border-slate-300 p-5">
          <div className="w-full h-full overflow-y-scroll">
            {jobs == "latest" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5 py-10">
                {LatestJobsList.map((data, index) => (
                  <button
                    className="flex justify-between items-center mb-3 group hover:bg-gray-200 px-4 py-2"
                    key={index}
                    type = "button"
                    onClick = {()=>{
                      router.push({
                        pathname:"/DisplayJobs",
                        query:{location:data.location, howmany:data.howmany, image:data.image}
                      })
                    }}
                  >
                    <div className="flex flex-col">
                      <h1 className="font-normal text-lg text-blue-500 group-hover:text-orange-500 text-left">
                        {data.job}
                      </h1>
                      <h1 className="font-light text-sm group-hover:text-orange-500 text-left">
                        {data.company}
                      </h1>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="font-light text-xs md:text-lg text-right group-hover:text-orange-500">
                        {data.createDate}
                      </h1>
                      <h1 className="font-light text-xs md:text-lg text-right group-hover:text-orange-500">
                        {data.location}
                      </h1>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {jobs == "location" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
                {JobsByLocation.map((data, index) => (
                  <button
                    className="w-full flex items-center mb-3 group hover:bg-gray-200 px-4 py-2"
                    key={index}
                    type = "button"
                    onClick = {()=>{
                      router.push({
                        pathname:"/JobsByLocation",
                        query:{location:data.location, howmany:data.howmany, image:data.image}
                      })
                    }}
                  >
                    <Image src={data.image} width={50} height={50} alt="image that will be displayed" />
                    <div className="flex flex-col ml-10">
                      <h1 className="font-normal text-sm md:text-lg lg:text-xl capitalize group-hover:text-orange-500 mb-5">
                        jobs in {data.location}
                      </h1>
                      <h1 className="text-left text-blue-800 font-bold text-sm md:text-lg lg:text-xl group-hover:text-orange-500 group-hover:border-orange-200">
                        {data.howmany}
                      </h1>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {jobs == "category" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
                {LatestJobsList.map((data, index) => (
                  <button
                    className="flex justify-between items-center mb-3 group hover:bg-gray-200 px-4 py-2"
                    key={index}
                    type = "button"
                    onClick = {()=>{
                      router.push({
                        pathname:"/JobsByCategory",
                        query:{category:"Accounting", howmany:"89"}
                      })
                    }}
                  >
                    <h1 className="font-normal text-sm md:text-lg lg:text-xl capitalize group-hover:text-orange-500">
                      Accounting finance
                    </h1>
                    <h1 className="px-5 py-2 border rounded-xl border-gray-200 text-blue-800 font-bold text-sm md:text-lg lg:text-xl group-hover:text-orange-500 group-hover:border-orange-200">
                      89
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
                ? "py-3 bg-white px-6 border border-slate-300 flex items-center hover:text-blue-400 border-x-white -ml-1"
                : "py-3 bg-gray-200 px-6 border border-slate-300 flex items-center hover:bg-white hover:text-blue-400"
            }
          >
            <FaClock size={20} />
            <span className="hidden lg:inline-flex text-xl ml-3 capitalize">
              View latest jobs
            </span>
          </li>

          <li
            onClick={(e) => setJobs("category")}
            className={
              jobs == "category"
                ? "py-3 bg-white px-6 border border-slate-300 flex items-center hover:text-blue-400 border-x-white -ml-1"
                : "py-3 bg-gray-200 px-6 border border-slate-300 flex items-center hover:bg-white hover:text-blue-400"
            }
          >
            <BiCategory size={20} />
            <span className="hidden lg:inline-flex text-xl ml-3">
              Jobs by Category
            </span>
          </li>
          <li
            onClick={(e) => setJobs("location")}
            className={
              jobs == "location"
                ? "py-3 bg-white px-6 border border-slate-300 flex items-center hover:text-blue-400 border-x-white -ml-1"
                : "py-3 bg-gray-200 px-6 border border-slate-300 flex items-center hover:bg-white hover:text-blue-400"
            }
          >
            <GoLocation size={20} />
            <span className="hidden lg:inline-flex text-xl ml-3">
              Jobs by Location
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
