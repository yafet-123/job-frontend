import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../util/db.server.js'
import { AddEntertainment } from "../../components/Admin/Entertainment/AddEntertainment";
import { DisplayEntertainment } from "../../components/Admin/Entertainment/DisplayEntertainment";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../components/common/MainHeader';
export async function getServerSideProps(){

  const entertainments = await prisma.Entertainment.findMany({
    orderBy: {
      entertainment_id:"desc"
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
      category_id:"desc"
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
    ShortDescription:data.ShortDescription,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate,
    userName:data.User.UserName
  }))

  const AllEntertainmentcategories = entertainmentcategories.map((data)=>({
      category_id:data.category_id,
      CategoryName:data.CategoryName,
      CreatedDate:data.CreatedDate,
      ShortDescription:data.ShortDescription,
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
    console.log(entertainment)
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      	<MainHeader title="Entertemiment Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
    				<div className='w-full h-full flex flex-row'>
    		      <VerticalNavbar data={data} />
    		      <div className="w-full">
            		<AddEntertainment categories={categories}/>
            		<DisplayEntertainment entertainment={entertainment} categories={categories} />
            	</div>
    		    </div> 
  			  </section>
      	</React.Fragment>
        
    );
}
