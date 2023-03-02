import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../util/db.server.js'
import { AddCourseCategory } from "../../components/Admin/CourseCategory/AddCourseCategory";
import {DisplayCourseCategory} from "../../components/Admin/CourseCategory/DisplayCourseCategory";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../components/MainHeader';
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

export default function CourseCategory({categorie}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      	<MainHeader title="Course Category Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#ddd0c8] dark:bg-slate-700 pt-10">
    				<div className='w-full h-full flex flex-col lg:flex-row'>
    		      <VerticalNavbar data={data} />
    		      <div className="w-full">
            		<AddCourseCategory UserData={UserData}/>
            		<DisplayCourseCategory categories={categorie}  />
            	</div>
    		    </div> 
  			  </section>
      	</React.Fragment>
        
    );
}
