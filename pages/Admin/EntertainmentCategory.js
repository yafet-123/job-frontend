import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../util/db.server.js'
import { AddEntertainmentCategory } from "../../components/Admin/EntertainmentCategory/AddEntertainmentCategory";
import { DisplayEntertainmentCategory } from "../../components/Admin/EntertainmentCategory/DisplayEntertainmentCategory";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../components/common/MainHeader';
export async function getServerSideProps(){

  const entertainmentcategories = await prisma.EntertainmentCategory.findMany({
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

  const AllEntertainmentcategories = entertainmentcategories.map((data)=>({
      category_id:data.category_id,
      CategoryName:data.CategoryName,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      userName:data.User.UserName
  }))

  return{
    props:{
      categories:JSON.parse(JSON.stringify(AllEntertainmentcategories)),
    }
  }
}

export default function EntertainmentCategory({categories}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      	<MainHeader title="Entertemiment Category Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
    				<div className='w-full h-full flex flex-row'>
    		      <VerticalNavbar data={data} />
    		      <div className="w-full">
            		<AddEntertainmentCategory />
            		<DisplayEntertainmentCategory categories={categories} />
            	</div>
    		    </div> 
  			  </section>
      	</React.Fragment>
        
    );
}
