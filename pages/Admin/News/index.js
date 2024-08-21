import React from "react";
import { useState,useEffect, useContext} from 'react'
import { AddNews } from "../../../components/Admin/News/AddNews";
import { DisplayNews } from "../../../components/Admin/News/DisplayNews";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';

import { getSession } from 'next-auth/react';
import db from '../../../db.js'; // Import your PostgreSQL connection pool

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

  const getNewsQuery = `
    SELECT 
      n.news_id, n."Header", n."Image", n."ShortDescription", n."Description",
      n."CreatedDate", n."ModifiedDate",
      u."UserName" AS userName,
      json_agg(json_build_object(
        'category_id', nc.category_id,
        'CategoryName', nc."CategoryName"
      )) AS "Category"
    FROM "News" n
    LEFT JOIN "User" u ON n.user_id = u.user_id
    LEFT JOIN "NewsCategoryRelationship" ncr ON n.news_id = ncr.news_id
    LEFT JOIN "NewsCategory" nc ON ncr.category_id = nc.category_id
    GROUP BY n.news_id, u."UserName"
    ORDER BY n."ModifiedDate" DESC;
  `;

  const getNewsCategoriesQuery = `
    SELECT 
      nc.category_id, nc."CategoryName", nc."CreatedDate", nc."ModifiedDate",
      u."UserName" AS userName
    FROM "NewsCategory" nc
    LEFT JOIN "User" u ON nc.user_id = u.user_id
    ORDER BY nc.category_id ASC;
  `;

  try {
    const newsResult = await db.query(getNewsQuery);
    const newsCategoriesResult = await db.query(getNewsCategoriesQuery);

    const news = newsResult.map((data) => ({
      news_id: data.news_id,
      Header: data.Header,
      image: data.Image,
      ShortDescription: data.ShortDescription,
      Description: data.Description,
      userName: data.userName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      Category: data.Category
    }));

    const newsCategories = newsCategoriesResult.map((data) => ({
      category_id: data.category_id,
      CategoryName: data.CategoryName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      userName: data.userName
    }));

    return {
      props: {
        news: JSON.parse(JSON.stringify(news)),
        categories: JSON.parse(JSON.stringify(newsCategories)),
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
  }
}

export default function News({categories, news}) {
    const { status, data } = useSession();
    return (
    	
        <React.Fragment>
          <MainHeader title="News Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
    		    <div className='w-full h-full flex flex-row'>
    		        <VerticalNavbar data={data} />
    		        <div className="w-full">
            		    <AddNews categories={categories} />
                    <DisplayNews news={news} categories={categories} />
            	    </div>
    		    </div> 
  			</section>
      	</React.Fragment>
        
    );
}
