import React, {useState,useEffect} from "react";
import { useRouter } from 'next/router'
export function CourseSideBar({CategoryName, courses, handleChapter, handleCourse}){
	const router = useRouter();
  const {path} = router.route
	return(
		<div className="w-full h-full bg-[#e6e6e6] dark:bg-[#02201D]">
      <div className="flex flex-col">
        <h1 className="w-full font-bold text-lg lg:text-xl hover:text-orange-500 text-left lg:text-center px-5 lg:px-20 mt-5">{CategoryName} Tutorial</h1>
        {courses.map((data, index) => (
          <button 
            onClick = {()=>{
                router.push({
                  pathname:path,
                  query:{CategoryName:CategoryName,id:data.course_id}
                })
                handleCourse()
            }}
            key={index}
            className={`w-full text-left font-normal px-2 lg:px-10 mt-5 text-normal lg:text-xl p-3 hover:bg-slate-700 hover:text-white 
              ${data.course_id == router.query.id ? "bg-[#009688] text-white" :" "} `}
          >
            {data.title}
          </button>
        ))}
      </div>
		</div>
	)
}