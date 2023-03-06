import { CSSSideBar } from "../data/CSSSideBar";
import React, {useState,useEffect} from "react";
import { useRouter } from 'next/router'
export function CourseSideBar({CategoryName, courses, handleChapter, handleCourse}){
	const router = useRouter();
  const {path} = router.route
	return(
		<div className="w-full h-full bg-white dark:bg-slate-700">
      <div className="flex flex-col">
        <h1 className="w-full font-bold text-lg lg:text-xl hover:text-orange-500 text-left lg:text-center px-5 lg:px-20 mt-5">{CategoryName} Tutorial</h1>
        {courses.map((data, index) => (
          <button 
            onClick = {()=>{
                router.push({
                  pathname:path,
                  query:{id:data.course_id}
                })
                handleCourse()
            }}
            key={index}
            className={`w-full text-left font-normal px-2 lg:px-10 mt-5 text-normal lg:text-xl p-3 hover:bg-black hover:text-white 
              ${data.course_id == router.query.id ? "bg-[#ddd0c8]" :" "} `}
          >
            {data.title}
          </button>
        ))}
      </div>
		</div>
	)
}