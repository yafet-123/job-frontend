import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {MdOutlineSubject} from 'react-icons/md'
import { prisma } from '../../util/db.server.js'
import { Content } from '../../components/Course/Content'
import {CourseSideBar} from "../../components/CourseSideBar"
import { CourseHead } from '../../components/Course/CourseHead'
import { MainHeader } from '../../components/MainHeader';
import { CourseHeadData } from '../../data/CourseHead'
import 'react-quill/dist/quill.snow.css';

export async function getServerSideProps(context){
  const {params,req,res,query} = context
  const course_id = query.id

  const courses = await prisma.JavascriptCourse.findMany({
    orderBy: {
      course_id:"asc"
    },

    include:{
      User:{
          select:{
              UserName:true
          }
      },
    }
  })

  const indvidualCourses = await prisma.JavascriptCourse.findMany({
    where:{
      course_id: Number(course_id),
    },
    include:{
      User:{
          select:{
              UserName:true
          }
      },
    }
  })

  const Allcourses = courses.map((data)=>({
      course_id:data.course_id,
      title:data.title,
      ModifiedDate:data.ModifiedDate,
      categories:data.CourseCategoryRelationship,
  }))

  return{
    props:{
      courses:JSON.parse(JSON.stringify(Allcourses)),
      indvidualCourses:JSON.parse(JSON.stringify(indvidualCourses)),
    }
  }
}

export default function javascript({courses, indvidualCourses}) {
	const router = useRouter();
  const { CategoryName } = router.query
  const [chapter, setchapter] = useState(false);
  const handleChapter = () => {
    setchapter(!chapter);
  };

  const [course, setcourse] = useState(false);
  const handleCourse = () => {
    setcourse(!course);
  };

  return (
    <React.Fragment>
      <MainHeader title="JavaScript Course" />
      <section className="flex flex-col w-full h-full bg-[#ddd0c8] pt-24 dark:bg-slate-800 py-5">
      	<div className="w-full h-16 bg-[#64748b] flex flex-row items-center px-5 lg:px-20 justify-between mt-6">
      		<div onClick={handleChapter} className="lg:hidden text-white z-10">
            <MdOutlineSubject size={30} /> 
          </div>

          <div className="hidden lg:flex">
        		<CourseHead />
          </div>

          <div className="ml-10 lg:hidden text-white flex items-center overflow-x-scroll">
            <div className="py-2 flex flex-row w-full">
              { CourseHeadData.map((data,index)=>(
                <button 
                  onClick = {()=>{
                    router.push({
                      pathname:data.link,
                      query:{CategoryName:data.title, id:1}
                    })
                    handleCourse()
                  }}
                  key={index} 
                  className={`w-full px-3 text-lg font-normal text-black
                    ${ router.query.CategoryName == data.title ? "bg-[#ddd0c8]" : "hover:bg-gray-300 hover:text-orange-500" }`}
                >
                  {data.title}
                </button>
              ))}
            </div>
          </div>
      	</div>


      	<div className="flex flex-col lg:flex-row h-full px-0 lg:px-20 ">
      		<div className="hidden lg:flex w-1/4 h-screen bg-gray-200 overflow-y-scroll sticky top-0 bottom-0">
      			<CourseSideBar CategoryName={CategoryName} handleCourse={handleCourse} courses={courses} handleChapter={handleChapter} />
      		</div>

          <Content indvidualCourses={indvidualCourses} />
      		
      	</div>

      	<div className={ chapter ? "lg:hidden fixed left-0 top-20 w-full h-screen bg-black/70 z-10" : "" }>
          <div className={chapter ? "fixed left-0 top-20 w-[70%] h-screen bg-white py-10 ease-in duration-500" : "fixed left-[-100%] top-20 p-10 ease-in duration-500" }>
            <div> 
                <div onClick={handleChapter} className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer float-right mr-5">
                  <AiOutlineClose size={15} />
                </div>   
            </div>
            <div className="py-4 flex flex-col mt-10 w-full">
              <CourseSideBar CategoryName={CategoryName} courses={courses} handleChapter={handleChapter} />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
