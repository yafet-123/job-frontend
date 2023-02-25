import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../util/db.server.js'
import { AddEntertainment } from "../../components/Admin/Entertainment/AddEntertainment";
import { DisplayEntertainment } from "../../components/Admin/Entertainment/DisplayEntertainment";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../components/MainHeader';
export async function getServerSideProps(){

  const entertainments = await prisma.Entertainment.findMany({
    orderBy: {
      entertainment_id:"asc"
    },
    include:{
      User:{
          select:{
              UserName:true
          }
      }
    }
  })

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
  
  const Allentertainment = entertainments.map((data)=>({
    entertainment_id:data.entertainment_id,
    Header:data.Header,
    link:data.link,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate,
    userName:data.User.UserName
  }))

  const AllEntertainmentcategories = entertainmentcategories.map((data)=>({
      category_id:data.category_id,
      CategoryName:data.CategoryName,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      userName:data.User.UserName
  }))
  

  return{
    props:{
      entertainment:JSON.parse(JSON.stringify(Allentertainment)),
      categories:JSON.parse(JSON.stringify(AllEntertainmentcategories))
    }
  }
}

export default function Entertainment({entertainment,categories}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      	<MainHeader title="Entertemiment Category Dashboard" />
        	<section className="flex flex-col w-full h-full bg-gray-300 dark:bg-slate-700 pt-28">
    				<div className='w-full h-full flex flex-col lg:flex-row'>
    		      <VerticalNavbar data={data} />
    		      <div className="w-full">
            		<AddEntertainment />
            		<DisplayEntertainment entertainment={entertainment} categories={categories} />
            	</div>
    		    </div> 
  			  </section>
      	</React.Fragment>
        
    );
}
