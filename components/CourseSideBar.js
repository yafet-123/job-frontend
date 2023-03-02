import { CSSSideBar } from "../data/CSSSideBar";
import React, {useState,useEffect} from "react";
import { useRouter } from 'next/router'
export function CourseSideBar({CategoryName,courses, handleChapter, handleCourse}){
	const router = useRouter();
	return(
		<div className="w-full h-full dark:bg-slate-700">
      <div className="flex flex-col">
        <h1 className="w-full font-bold text-xl lg:text-2xl hover:text-orange-500 text-left lg:text-center px-5 lg:px-20 mt-5">{CategoryName} Tutorial</h1>
        {courses.map((data, index) => (
          <button 
            onClick = {()=>{
                router.push({
                  pathname:"/Course",
                  query:{CategoryName:CategoryName, courseId:data.course_id}
                })
                handleCourse()
            }}
            key={index}
            className="w-full text-left font-normal px-2 lg:px-10 mt-5 text-normal lg:text-xl p-3 hover:bg-black hover:text-white"
          >
            {CategoryName} {data.title}
          </button>
        ))}
      </div>
		</div>
	)
}