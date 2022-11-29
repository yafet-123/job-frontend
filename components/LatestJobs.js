import Link from "next/link";
import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { LatestJobsList } from "../data/LatestJobs";
export function LatestJobs() {
  return (
    <section className="w-full h-[50rem] md:p-20 bg-gray-100 flex flex-col">
      <div className="flex justify-between items-center p-10 md:p-0">
        <div className="flex items-center font-bold text-xl md:text-2xl lg:text-3xl text-black capitalize">
          <AiOutlineClockCircle size={30} />
          <span className="ml-5">Latest Jobs</span>
        </div>
        <Link href="">
          <a className="font-bold text-lg md:text-xl lg:text-2xl text-white p-4 bg-blue-700 capitalize border rounded-2xl">
            view all jobs
          </a>
        </Link>
      </div>

      <div className="md:max-w-7xl md:mx-auto bg-gray-200 w-full h-[40rem] border rounded-lg md:mt-10 shadow-2xl shadow-sky-200 flex flex-col overflow-y-scroll">
        {LatestJobsList.map((data, index) => (
          <Link href="/" key={index}>
            <a className="flex justify-around items-center mb-5 even:bg-white px-10 py-5 group">
              <div className="flex flex-col w-1/2">
                <h1 className="font-bold text-sm md:text-lg lg:text-xl text-blue-500 group-hover:text-orange-500">
                  {data.job}
                </h1>
                <h1 className="font-light text-xs md:text-sm lg:text-lg text-blue-500 group-hover:text-orange-500">
                  {data.company}
                </h1>
              </div>
              <div className="flex flex-col w-1/2">
                <h1 className="font-light text-xs md:text-sm lg:text-lg text-blue-500 text-right group-hover:text-orange-500">
                  {data.createDate}
                </h1>
                <h1 className="font-light text-xs md:text-sm lg:text-lg text-blue-500 text-right group-hover:text-orange-500">
                  {data.location}
                </h1>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
}
