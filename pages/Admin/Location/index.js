import React from "react";
import { useState,useEffect, useContext} from 'react'
import { AddLocation } from "../../../components/Admin/Location/AddLocation";
import {DisplayLocation} from "../../../components/Admin/Location/DisplayLocation";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { getSession } from "next-auth/react";
import pool from '../../../db.js'; // Import your PostgreSQL connection pool

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

  const getLocationsQuery = `
    SELECT 
      l.location_id, l."LocationName", l."Image", 
      l."CreatedDate", l."ModifiedDate", 
      u."UserName" AS userName
    FROM "Location" l
    LEFT JOIN "User" u ON l.user_id = u.user_id
    ORDER BY l.location_id ASC;
  `;

  try {
    const result = await db.query(getLocationsQuery);
    const locations = result;

    const Alllocations = locations.map((data) => ({
      location_id: data.location_id,
      LocationName: data.LocationName,
      Image: data.Image,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      userName: data.userName
    }));

    return {
      props: {
        locations: JSON.parse(JSON.stringify(Alllocations)),
      },
    };
  } catch (err) {
    console.error('Error retrieving locations:', err);
    return {
      props: {
        locations: [],
      },
    };
  }
}


export default function Location({locations}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      	<MainHeader title="Location Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
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
