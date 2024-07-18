import React from "react";
import { useState,useEffect, useContext} from 'react'
import { AddAiSearchCategory } from "../../../components/Admin/AiSearchCategory/AddAiSearchCategory";
import { DisplayAiSearchCategory } from "../../../components/Admin/AiSearchCategory/DisplayAiSearchCategory";
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

  const getCategoriesQuery = `
    SELECT 
      c.category_id, 
      c."CategoryName", 
      c."createdAt", 
      c."updatedAt", 
      u."UserName" 
    FROM "AiCategory" c
    LEFT JOIN "User" u ON c.user_id = u.user_id
    ORDER BY c.category_id ASC;
  `;

  try {
    const client = await pool.connect();
    const categoriesResult = await client.query(getCategoriesQuery);

    const Allcategories = categoriesResult.rows.map((data) => ({
      category_id: data.category_id,
      CategoryName: data.CategoryName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      userName: data.UserName
    }));

    client.release();

    return {
      props: {
        categories: JSON.parse(JSON.stringify(Allcategories)),
      }
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

export default function AiSearchCategory({categories}) {
    const { status, data } = useSession();
    console.log(categories)
    return (
    	<React.Fragment>
      	<MainHeader title="Ai Search Category Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
    				<div className='w-full h-full flex flex-row'>
    		      <VerticalNavbar data={data} />
    		      <div className="w-full">
            		<AddAiSearchCategory />
            		<DisplayAiSearchCategory categories={categories} />
            	</div>
    		    </div> 
  			  </section>
      	</React.Fragment>
        
    );
}
