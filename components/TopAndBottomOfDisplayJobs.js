import React from "react";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube, FaTelegramPlane} from "react-icons/fa";
import moment from 'moment';

export function TopAndBottomOfDisplayJobs({DeadLine,Apply}) {
   const socialMediaLinks = [
    { path: "", icon: <FaFacebookF />, style: "bg-blue-900",},
    { path: "", icon: <FaTwitter />, style: "bg-blue-500" },
    { path: "", icon: <FaLinkedinIn />, style: "bg-blue-700" },
    { path: "", icon: <FaYoutube />, style: "bg-red-500" },
    { path: "", icon: <FaTelegramPlane />, style: "bg-blue-600" },
  ];
  return (
    <div className="bg-gray-200 flex flex-col lg:flex-row justify-between items-center w-full lg:h-28 border rounded-lg p-20">
    	<div className="flex items-center mb-10">
    		<h1 className="px-10 py-3 bg-yellow-400 text-white border rounded-lg text-xl font-bold mr-5 ">Apply Now</h1>
    		<div className="flex flex-col text-lg text-red-700 font-bold">
    			<p className="">Deadline</p>
    			<p className="">{moment(DeadLine).utc().format('YYYY-MM-DD')}</p>
    		</div>
      	</div>

      	<div className="flex flex-col lg:flex-row justify-between items-center mb-10">
      		<h1 className="text-black border rounded-lg text-2xl font-bold mr-5 mb-5 lg:mb-0">Share On</h1>
      		<div className="flex items-center">
                {socialMediaLinks.map((main, index) => (
                  <Link key={index} href={main.path}>
                    <a target="_blank" rel="noreferrer">
                      <div
                        className={`${main.style} ml-3 text-white rounded-lg shadow-lg shadow-gray-400 p-3 hover:w-20 transition-all duration-1000 transform-cpu cursor-pointer hover:brightness-110 flex items-center justify-center`}
                      >
                        {main.icon}
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
      	</div>
    </div>
  );
}