import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../util/db.server.js'
import { AddLocation } from "../../components/Admin/Location/AddLocation";
import {DisplayLocation} from "../../components/Admin/Location/DisplayLocation";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../components/MainHeader';
export async function getServerSideProps(){
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
      locations:JSON.parse(JSON.stringify(Alllocations)),
    }
  }
}

export default function Location({locations}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      	<MainHeader title="Location Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#ddd0c8] dark:bg-slate-700 pt-10">
    				<div className='w-full h-full flex flex-row'>
    		      <VerticalNavbar data={data} />
    		      <div className="w-full">
            		<AddLocation />
            		<DisplayLocation locations={locations} />
            	</div>
    		    </div> 
  			  </section>
      	</React.Fragment>
        
    );
}
