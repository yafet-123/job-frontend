import React from "react";
import { useState,useEffect, useContext} from 'react'
import pool from '../../../db.js'
import { AddJob } from "../../../components/Admin/Job/AddJob";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userRole = await session?.user?.role;

  if (userRole !== 'admin') {
    return {
      redirect: {
        destination: '/auth/error', // Redirect to the error page for unauthorized access
        permanent: false,
      },
    };
  }

  const getCategoriesQuery = `
    SELECT c.category_id, c."CategoryName", c."CreatedDate", c."ModifiedDate", u."UserName"
    FROM "Category" c
    LEFT JOIN "User" u ON c.user_id = u.user_id
    ORDER BY c.category_id ASC
  `;

  const getLocationsQuery = `
    SELECT l.location_id, l."LocationName", l."Image", l."CreatedDate", l."ModifiedDate", u."UserName"
    FROM "Location" l
    LEFT JOIN "User" u ON l.user_id = u.user_id
    ORDER BY l.location_id ASC
  `;

  try {
    const client = await pool.connect();

    const [categoriesResult, locationsResult] = await Promise.all([
      client.query(getCategoriesQuery),
      client.query(getLocationsQuery),
    ]);

    const categories = categoriesResult.rows.map((data) => ({
      category_id: data.category_id,
      CategoryName: data.CategoryName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      userName: data.UserName,
    }));

    const locations = locationsResult.rows.map((data) => ({
      location_id: data.location_id,
      LocationName: data.LocationName,
      Image: data.Image,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      userName: data.UserName,
    }));

    client.release();

    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
        locations: JSON.parse(JSON.stringify(locations)),
      },
    };
  } catch (err) {
    console.error('Database Query Error:', err);
    return {
      props: {
        error: 'An error occurred while fetching data',
      },
    };
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




