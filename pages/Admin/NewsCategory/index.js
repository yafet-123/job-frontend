import React from "react";
import { useState,useEffect, useContext} from 'react'
import { AddNewsCategory } from "../../../components/Admin/NewsCategory/AddNewsCategory";
import { DisplayNewsCategory } from "../../../components/Admin/NewsCategory/DisplayNewsCategory";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { getSession } from "next-auth/react";

import db from '../../../db.js'; // Make sure to import your database connection

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
      c."CreatedDate", 
      c."ModifiedDate", 
      u."UserName" 
    FROM "NewsCategory" c
    LEFT JOIN "User" u ON c.user_id = u.user_id
    ORDER BY c.category_id ASC;
  `;

  try {
    const categoriesResult = await db.query(getCategoriesQuery);

    const Allcategories = categoriesResult.map((data) => ({
      category_id: data.category_id,
      CategoryName: data.CategoryName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      userName: data.UserName
    }));

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

export default function NewsCategory({categories}) {
    const { status, data } = useSession();
    console.log(categories)
    return (
    	<React.Fragment>
      	<MainHeader title="News Category Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
    				<div className='w-full h-full flex flex-row'>
    		      <VerticalNavbar data={data} />
    		      <div className="w-full">
            		<AddNewsCategory />
            		<DisplayNewsCategory categories={categories} />
            	</div>
    		    </div> 
  			  </section>
      	</React.Fragment>
        
    );
}
