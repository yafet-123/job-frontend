import { HtmlSideBar } from "../data/HtmlSideBar";
import { CSSSideBar } from "../data/CSSSideBar";
import React, {useState,useEffect} from "react";
import { useRouter } from 'next/router'
export function CourseSideBar({title,onChange, handleChapter}){
	const router = useRouter();
	return(
		<div className="w-full h-full dark:bg-slate-700">
			{ title == "CSS" && (
              <div className="flex flex-col">
                <h1 className="w-full font-bold text-xl lg:text-3xl hover:text-orange-500 text-left lg:text-center px-5 lg:px-20 mt-5">CSS Tutorial</h1>
                {CSSSideBar.map((data, index) => (
                  <button 
                    onClick = {()=>{
                      handleChapter()
                      onChange(data.title)
                      
                    }}
                    key={index}
                    className="w-full text-left font-normal px-2 lg:px-10 mt-5 text-normal lg:text-xl p-3 hover:bg-black hover:text-white"
                  >
                    CSS {data.title}
                  </button>
                ))}
              </div>
            )}

            { title == "HTML" && (
              <div className="flex flex-col">
                <h1 className="w-full font-bold text-xl lg:text-3xl hover:text-orange-500 text-left lg:text-center px-5 lg:px-20 mt-5">HTML Tutorial</h1>
                {HtmlSideBar.map((data, index) => (
                  <button 
                    onClick = {()=>{
                            onChange(data.title)
                            handleChapter()
                          }}
                          key={index}
                    className="w-full text-left font-normal px-2 lg:px-10 mt-5 text-normal lg:text-xl p-3 hover:bg-black hover:text-white"
                  >
                    HTML {data.title}
                  </button>
                ))}
              </div>
            )}
		</div>
	)
}