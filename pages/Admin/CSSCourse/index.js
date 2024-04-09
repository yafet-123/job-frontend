import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../../util/db.server.js'
import { AddCourse } from "../../../components/Admin/CssCourses/AddCourse";
import { DisplayCourse} from "../../../components/Admin/CssCourses/DisplayCourse";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';

import { getSession } from "next-auth/react";

export async function getServerSideProps(context){
  const session = await getSession(context);
  const userRole = await session?.user?.role
  if (userRole !== 'admin') {
    return {
      redirect: {
        destination: '/auth/error', // Redirect to the error page for unauthorized access
        permanent: false,
      },
    };
  }
  const courses = await prisma.CSSCourse.findMany({
    orderBy: {
      course_id:"asc"
    },
    include:{
      User:{
          select:{
              UserName:true
          }
      }
    }
  })

  const Allcourses = courses.map((data)=>({
      course_id:data.course_id,
      title:data.title,
      content:data.content,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      userName:data.User.UserName
  }))

  return{
    props:{
      courses:JSON.parse(JSON.stringify(Allcourses)),
    }
  }
}

export default function CSSCourse({courses}) {
    const { status, data } = useSession();
    return (
      <React.Fragment>
        <MainHeader title="CSS Courses Dashboard" />
          <section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
            <div className='w-full h-full flex flex-row'>
              <VerticalNavbar data={data} />
              <div className="w-full">
                <AddCourse />
                <DisplayCourse courses={courses} />
              </div>
            </div> 
          </section>
        </React.Fragment>
        
    );
}
