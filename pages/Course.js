import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import {CourseHead} from '../data/courseHead'
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {MdOutlineSubject} from 'react-icons/md'

import { HtmlHome } from "../components/HTML/HtmlHome"
import { HtmlIntroduction } from "../components/HTML/HtmlIntroduction"
import { HtmlEditors } from "../components/HTML/HtmlEditors"
import { HtmlElements } from "../components/HTML/HtmlElements"
import { HtmlAttributes } from "../components/HTML/HtmlAttributes"

import { CssHome } from "../components/CSS/CssHome"
import { CssIntroduction } from "../components/CSS/CssIntroduction"
import { CssSyntax } from "../components/CSS/CssSyntax"
import { CssSelectors } from "../components/CSS/CssSelectors"
import { CssAddingCSS } from "../components/CSS/CssAddingCSS"
import { CssComment } from "../components/CSS/CssComment"
import {CourseSideBar} from "../components/CourseSideBar"


export default function Course() {
	const [selected , setselected] = useState("Home")
	const router = useRouter();
  const { title} = router.query

  const [chapter, setchapter] = useState(false);
  const handleChapter = () => {
    setchapter(!chapter);
    console.log("Chapter")
  };

  const [course, setcourse] = useState(false);
  const handleCourse = () => {
    setcourse(!course);
    console.log("Courses")
  };

  function handleChange(newValue) {
      setselected(newValue);
  }

  return (
    <section className="flex flex-col w-full h-full bg-white pt-24 dark:bg-slate-800">
    	<div className="w-full h-16 bg-[#64748b] flex flex-row items-center px-5 lg:px-20 justify-between">
    		<div onClick={handleChapter} className="md:hidden text-white z-10">
          <MdOutlineSubject size={30} /> 
        </div>

        <div className="hidden lg:flex">
      		{ CourseHead.map((data,index)=>(
      			<button 
              onClick = {()=>{
                  router.push({
                    pathname:"/Course",
                    query:{title:data.title}
                  })
              }}
              key={index} 
              className={
                router.query.title == data.title
                  ? "bg-black mr-10 text-2xl font-bold text-white p-4"
                  : "mr-10 text-2xl font-bold text-white hover:border-b-4 border-blue-800"
              }
            >
              {data.title}
            </button>
      		))}
        </div>

        <button onClick={handleCourse} className="lg:hidden text-white flex items-center">
          <span className="ml-5 font-bold text-xl hover:text-blue-400">Courses</span>
        </button>
    	</div>
    	<div className="flex flex-col lg:flex-row h-full px-0 md:px-20 ">
    		<div className="hidden lg:flex w-1/4 h-screen bg-gray-200 overflow-y-scroll sticky top-0 bottom-0">
    			<CourseSideBar title={title} onChange={handleChange} handleChapter={handleChapter} />
    		</div>

    		<div className="w-full lg:w-3/4 h-full border bg-gray-50 dark:bg-slate-600">
    			{ title == "HTML" && selected == "Home" && <HtmlHome />}
    			{ title == "HTML" && selected == "Introduction" && <HtmlIntroduction />}
    			{ title == "HTML" && selected == "Editors" && <HtmlEditors />}
    			{ title == "HTML" && selected == "Elements" && <HtmlElements />}
    			{ title == "HTML" && selected == "Attributes" && <HtmlAttributes />}

    			{ title == "CSS" && selected == "Home" && <CssHome />}
    			{ title == "CSS" && selected == "Introduction" && <CssIntroduction />}
    			{ title == "CSS" && selected == "Synthax" && <CssSyntax />}
    			{ title == "CSS" && selected == "Selectors" && <CssSelectors />}
    			{ title == "CSS" && selected == "How To Add CSS" && <CssAddingCSS />}
    			{ title == "CSS" && selected == "Comments" && <CssComment />}
    		</div>
    	</div>

    	<div
        className={
          chapter
            ? "md:hidden fixed left-0 top-20 w-full h-screen bg-black/70 z-10"
            : ""
        }
      >
        <div
          className={
            chapter
              ? "fixed left-0 top-20 w-[70%] h-screen bg-white py-10 ease-in duration-500"
              : "fixed left-[-100%] top-20 p-10 ease-in duration-500"
          }
        >
          <div>
            
              <div
                onClick={handleChapter}
                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer float-right mr-5"
              >
                <AiOutlineClose size={15} />
              </div>
            
          </div>
          <div className="py-4 flex flex-col mt-10 w-full">
            <CourseSideBar title={title} onChange={handleChange} handleChapter={handleChapter} />
          </div>
        </div>
      </div>

      <div
        className={
          course
            ? "md:hidden fixed left-0 top-20 w-full h-screen bg-black/70 z-10"
            : ""
        }
      >
        <div
          className={
            course
              ? " fixed right-0 top-20 w-[70%] h-screen bg-white py-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
              <div
                onClick={handleCourse}
                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer float-left ml-3"
              >
                <AiOutlineClose size={15} />
              </div>
          </div>
          <div className="py-4 flex flex-col mt-10 w-full">
            { CourseHead.map((data,index)=>(
              <button 
                onClick = {()=>{
                    router.push({
                      pathname:"/Course",
                      query:{title:data.title}
                    })
                    handleCourse()
                }}
                key={index} 
                className={
                  router.query.title == data.title
                    ? "w-full pl-5 mt-5 p-3 text-xl text-left font-normal text-black hover:bg-gray-300 hover:text-orange-500 hover:bg-gray-300 hover:text-orange-500"
                    : "w-full pl-5 mt-5 p-3 text-xl text-left font-normal text-black hover:bg-gray-300 hover:text-orange-500"
                  }
              >
                {data.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
