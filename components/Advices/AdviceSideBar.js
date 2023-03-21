import { AdviceSidebar } from "../../data/AdviceSidebar";
import React, {useState,useEffect} from "react";
import { useRouter } from 'next/router'
export function AdviceSideBar({title,onChange, handleAdviceList}){
	const router = useRouter();
	return(
		<div className="w-full py-10">
			{ title == "Carer Advice For job seeker" && (
        <div className="flex flex-col">
          <h1 className="w-full font-bold text-lg lg:text-xl text-[#009688] hover:text-white hover:bg-[#009688] text-left lg:text-center px-5 lg:px-10 mt-5">Career Advice For Job Seeker</h1>
          {AdviceSidebar.map((data, index) => (
            <button 
              onClick = {()=>{
                handleAdviceList()
                onChange(data.title)
                
              }}
              key={index}
              className="w-full text-left font-normal px-2 lg:px-10 mt-5 text-normal lg:text-xl p-3 hover:bg-[#009688] hover:text-white"
            >
              {data.title}
            </button>
          ))}
          
        </div>
      )}
		</div>
	)
}