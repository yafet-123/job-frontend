import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {MdOutlineSubject} from 'react-icons/md'
import { MainHeader } from '../components/MainHeader';
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
import { prisma } from '../util/db.server.js'
import { CourseHead } from '../components/Course/CourseHead'

export async function getServerSideProps(){
  const categories = await prisma.CourseCategory.findMany({
    orderBy: {
      category_id:"asc"
    },
    include:{
      User:{
          select:{
              UserName:true
          }
      }
    }
  })

  const Allcategories = categories.map((data)=>({
      category_id:data.category_id,
      CategoryName:data.CategoryName,
      ShortDescription:data.ShortDescription,
      color:data.color,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      userName:data.User.UserName
  }))

  return{
    props:{
      categorie:JSON.parse(JSON.stringify(Allcategories)),
    }
  }
}

export default function Course({categorie}) {
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
    <React.Fragment>
      <MainHeader title="Course" />
      <section className="flex flex-col w-full h-full bg-[#ddd0c8] pt-24 dark:bg-slate-800 py-5">
      	<div className="w-full h-16 bg-[#64748b] flex flex-row items-center px-5 lg:px-20 justify-between mt-6">
      		<div onClick={handleChapter} className="md:hidden text-white z-10">
            <MdOutlineSubject size={30} /> 
          </div>

          <div className="hidden lg:flex">
        		<CourseHead categories={categorie} />
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
              { categorie.map((data,index)=>(
                <button 
                  onClick = {()=>{
                      router.push({
                        pathname:"/Course",
                        query:{CategoryName:data.CategoryName}
                      })
                      handleCourse()
                  }}
                  key={index} 
                  className={
                    router.query.CategoryName == data.CategoryName
                      ? "bg-green-500 w-full pl-5 mt-5 p-3 text-xl text-left font-normal text-black hover:bg-gray-300 hover:text-orange-500 hover:bg-gray-300 hover:text-orange-500"
                      : "w-full pl-5 mt-5 p-3 text-xl text-left font-normal text-black hover:bg-gray-300 hover:text-orange-500"
                    }
                >
                  {data.CategoryName}
                </button>
              ))}
            </div>
          </div>
        </div>

        

      </section>
    </React.Fragment>
  );
}
