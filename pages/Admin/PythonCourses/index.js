import React from "react";
import { useState,useEffect, useContext} from 'react'
import { AddCourse } from "../../../components/Admin/PythonCourses/AddCourse";
import { DisplayCourse} from "../../../components/Admin/PythonCourses/DisplayCourse";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { getSession } from "next-auth/react";
import db from '../../../db.js'; // Adjust the path to your PostgreSQL connection pool

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userRole = session?.user?.role;

  if (userRole !== 'admin') {
    return {
      redirect: {
        destination: '/auth/error', // Redirect to the error page for unauthorized access
        permanent: false,
      },
    };
  }

  try {
    const coursesQuery = `
      SELECT 
        hc.course_id, 
        hc.title, 
        hc.content, 
        hc."CreatedDate", 
        hc."ModifiedDate", 
        u."UserName" AS "userName"
      FROM "PythonCourse" hc
      LEFT JOIN "User" u ON hc.user_id = u.user_id
      ORDER BY hc.course_id ASC;
    `;

    const result = await db.query(coursesQuery);
    const courses = result.map(data => ({
      course_id: data.course_id,
      title: data.title,
      content: data.content,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      userName: data.userName,
    }));

    return {
      props: {
        courses: JSON.parse(JSON.stringify(courses)),
      },
    };
  } catch (err) {
    console.error('Error fetching courses:', err);
    return {
      props: {
        courses: [],
      },
    };
  }
}

export default function PythonCourses({courses}) {
    const { status, data } = useSession();
    return (
      <React.Fragment>
        <MainHeader title="Python Courses Dashboard" />
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
