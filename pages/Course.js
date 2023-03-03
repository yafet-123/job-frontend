import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {MdOutlineSubject} from 'react-icons/md'
import { prisma } from '../util/db.server.js'
import { Content } from '../components/Course/Content'
import {CourseSideBar} from "../components/CourseSideBar"
import { CourseHead } from '../components/Course/CourseHead'
import { MainHeader } from '../components/MainHeader';

export async function getServerSideProps(context){
  const {params,req,res,query} = context
  const CategoryName = query.CategoryName
  const course_id = query.courseId
  console.log(CategoryName)

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

  const courses = await prisma.Course.findMany({
    where:{
      CourseCategoryRelationship:{
        some: {
          CourseCategory:{
            CategoryName: CategoryName
          }
        }
      } 
    },

    orderBy: {
      course_id:"asc"
    },

    include:{
      User:{
          select:{
              UserName:true
          }
      },

      CourseCategoryRelationship:{
        include:{
          CourseCategory:{
            select:{
              category_id:true,
              CategoryName:true
            }
          }
        }
      },
    }
  })

  const indvidualCourses = await prisma.Course.findMany({
    where:{
      course_id: Number(course_id),
      CourseCategoryRelationship:{
        some: {
          CourseCategory:{
            CategoryName: CategoryName
          },
        },
      },
    },
    include:{
      User:{
          select:{
              UserName:true
          }
      },
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

  const Allcourses = courses.map((data)=>({
      course_id:data.course_id,
      title:data.title,
      ModifiedDate:data.ModifiedDate,
      categories:data.CourseCategoryRelationship,
  }))

  return{
    props:{
      courses:JSON.parse(JSON.stringify(Allcourses)),
      categorie:JSON.parse(JSON.stringify(Allcategories)),
      indvidualCourses:JSON.parse(JSON.stringify(indvidualCourses)),
    }
  }
}

export default function Course({categorie, courses, indvidualCourses}) {
	const router = useRouter();
  console.log(courses)
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
      			<CourseSideBar handleCourse={handleCourse} CategoryName={CategoryName} courses={courses} handleChapter={handleChapter} />
      		</div>

          <Content indvidualCourses={indvidualCourses} />
      		
      	</div>

      	<div className={ chapter ? "md:hidden fixed left-0 top-20 w-full h-screen bg-black/70 z-10" : "" }>
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

        <div className={ course ? "md:hidden fixed left-0 top-20 w-full h-screen bg-black/70 z-10"   : "" }>
          <div className={ course ? " fixed right-0 top-20 w-[70%] h-screen bg-white py-10 ease-in duration-500" : "fixed left-[-100%] top-0 p-10 ease-in duration-500"}>
            <div>
                <div onClick={handleCourse} className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer float-left ml-3">
                  <AiOutlineClose size={15} />
                </div>
            </div>
            
            <div className="py-4 flex flex-col mt-10 w-full">
              { categorie.map((data,index)=>(
                <button 
                  onClick = {()=>{
                      router.push({
                        pathname:"/Course",
                        query:{CategoryName:data.CategoryName, courseId:1}
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
