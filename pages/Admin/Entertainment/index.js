import React from "react";
import { useState,useEffect, useContext} from 'react'
import { AddEntertainment } from "../../../components/Admin/Entertainment/AddEntertainment";
import { DisplayEntertainment } from "../../../components/Admin/Entertainment/DisplayEntertainment";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { getSession } from "next-auth/react";

import pool from '../../../db.js'; // Make sure to import your database connection

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

  const getEnterinmentQuery = `
    SELECT 
      n.entertainment_id, n."Header", n."Image", n."ShortDescription", n."Description",
      n."CreatedDate", n."ModifiedDate",
      u."UserName" AS userName,
      json_agg(json_build_object(
        'category_id', nc.category_id,
        'CategoryName', nc."CategoryName"
      )) AS "Category"
    FROM "Entertainment" n
    LEFT JOIN "User" u ON n.user_id = u.user_id
    LEFT JOIN "EntertainmentCategoryRelationship" ncr ON n.entertainment_id = ncr.entertainment_id
    LEFT JOIN "EntertainmentCategory" nc ON ncr.category_id = nc.category_id
    GROUP BY n.entertainment_id, u."UserName"
    ORDER BY n."ModifiedDate" DESC;
  `;

  const getEnterinmentCategoriesQuery = `
    SELECT 
      nc.category_id, nc."CategoryName", nc."CreatedDate", nc."ModifiedDate",
      u."UserName" AS userName
    FROM "EntertainmentCategory" nc
    LEFT JOIN "User" u ON nc.user_id = u.user_id
    ORDER BY nc.category_id ASC;
  `;

  const client = await pool.connect();

  try {
    const etResult = await client.query(getEnterinmentQuery);
    const categoriesCategoriesResult = await client.query(getEnterinmentCategoriesQuery);

    const entertainment = etResult.rows.map((data) => ({
      entertainment_id: data.entertainment_id,
      Header: data.Header,
      image: data.Image,
      ShortDescription: data.ShortDescription,
      Description: data.Description,
      userName: data.userName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      Category: data.Category
    }));

    const categories = categoriesCategoriesResult.rows.map((data) => ({
      category_id: data.category_id,
      CategoryName: data.CategoryName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      userName: data.userName
    }));

    return {
      props: {
        entertainment: JSON.parse(JSON.stringify(entertainment)),
        categories: JSON.parse(JSON.stringify(categories)),
      },
    };
  } catch (err) {
    console.error('Error retrieving news or categories:', err);
    return {
      props: {
        news: [],
        categories: [],
      },
    };
  } finally {
    client.release(); // Release the client back to the pool
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
