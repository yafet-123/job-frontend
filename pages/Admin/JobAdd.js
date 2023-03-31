import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../util/db.server.js'
import { AddJob } from "../../components/Admin/Job/AddJob";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../components/common/MainHeader';
export async function getServerSideProps(){
  const categories = await prisma.Category.findMany({
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
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      userName:data.User.UserName
  }))

  const locations = await prisma.Location.findMany({
    orderBy: {
      location_id:"asc"
    },
    include:{
      User:{
          select:{
              UserName:true
          }
      }
    }
  });

  const Alllocations = locations.map((data)=>({
      location_id:data.location_id,
      LocationName:data.LocationName,
      Image:data.Image,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      userName:data.User.UserName
  }))

  return{
    props:{
      categories:JSON.parse(JSON.stringify(Allcategories)),
      locations:JSON.parse(JSON.stringify(Alllocations)),
    }
  }
}

export default function JobAdd({categories,locations}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      	<MainHeader title="Add Job Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
    				<div className='w-full h-full flex flex-row'>
    		      <VerticalNavbar data={data} />
    		      <div className="w-full">
            		<AddJob categories={categories} locations={locations}/>
            	</div>
    		    </div> 
  			  </section>
      	</React.Fragment>
        
    );
}
