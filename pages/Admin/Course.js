import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../util/db.server.js'
import { DisplayCourse } from "../../components/Admin/Course/DisplayCourse";
import { AddCourse } from "../../components/Admin/Course/AddCourse";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../components/MainHeader';
export async function getServerSideProps(){
  const courses = await prisma.Course.findMany({
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

  const Allcourses = courses.map((data)=>({
      course_id:data.course_id,
      title:data.title,
      content:data.content,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      userName:data.User.UserName,
      categories:data.CourseCategoryRelationship,
  }))

  return{
    props:{
      courses:JSON.parse(JSON.stringify(Allcourses)),
      categorie:JSON.parse(JSON.stringify(Allcategories)),
    }
  }
}

export default function Course({courses, categorie}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      	<MainHeader title="Course Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#ddd0c8] dark:bg-slate-700 pt-10">
    				<div className='w-full h-full flex flex-row'>
    		      <VerticalNavbar data={data} />
    		      <div className="w-full">
            		<AddCourse categorie={categorie} />
            		<DisplayCourse categorie={categorie} courses={courses} />
            	</div>
    		    </div> 
  			  </section>
      	</React.Fragment>
        
    );
}
