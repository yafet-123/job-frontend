import React from "react";
import { useState,useEffect, useContext} from 'react'
import { AddBlogs } from "../../../components/Admin/Blog/AddBlogs";
import { DisplayBlogs } from "../../../components/Admin/Blog/DisplayBlogs";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { getSession } from "next-auth/react";

import db from '../../../db.js'; // Adjust the path to your PostgreSQL connection pool


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

  try {
    const blogsQuery = `
      SELECT b.blogs_id, b."Header", b."Image", b."ShortDescription", b."Description", b."CreatedDate", b."ModifiedDate", u."UserName",
             bc.category_id, bc."CategoryName"
      FROM "Blogs" b
      LEFT JOIN "User" u ON b.user_id = u.user_id
      LEFT JOIN "BlogsCategoryRelationship" bcr ON b.blogs_id = bcr.blogs_id
      LEFT JOIN "BlogsCategory" bc ON bcr.category_id = bc.category_id
      ORDER BY b."ModifiedDate" DESC;
    `;

    const blogCategoriesQuery = `
      SELECT bc.category_id, bc."CategoryName", bc."CreatedDate", bc."ModifiedDate", u."UserName"
      FROM "BlogsCategory" bc
      LEFT JOIN "User" u ON bc.user_id = u.user_id
      ORDER BY bc.category_id ASC;
    `;

    const blogsResult = await db.query(blogsQuery);
    const blogCategoriesResult = await db.query(blogCategoriesQuery);
    console.log(blogCategoriesResult)
    const blogs = blogsResult.reduce((acc, row) => {
      const blog = acc.find(b => b.blogs_id === row.blogs_id);
      const category = {
        category_id: row.category_id,
        CategoryName: row.CategoryName
      };

      if (blog) {
        blog.Category.push(category);
      } else {
        acc.push({
          blogs_id: row.blogs_id,
          Header: row.Header,
          Image: row.Image,
          ShortDescription: row.ShortDescription,
          Description: row.Description,
          CreatedDate: row.CreatedDate,
          ModifiedDate: row.ModifiedDate,
          userName: row.UserName,
          Category: row.category_id ? [category] : []
        });
      }

      return acc;
    }, []);

    const allBlogCategories = blogCategoriesResult.map(row => ({
      category_id: row.category_id,
      CategoryName: row.CategoryName,
      CreatedDate: row.CreatedDate,
      ModifiedDate: row.ModifiedDate,
      userName: row.UserName
    }));

    console.log('All Blog Categories:', allBlogCategories);

    return {
      props: {
        categories: JSON.parse(JSON.stringify(allBlogCategories)),
        blogs: JSON.parse(JSON.stringify(blogs)),
      },
    };
  } catch (err) {
    console.error('Error fetching data:', err);
    return {
      props: {
        categories: [],
        blogs: [],
      },
    };
  }
}


export default function Blogs({categories, blogs}) {
    const { status, data } = useSession();
    console.log(blogs)
    return (
    	
        <React.Fragment>
          <MainHeader title="Blogs Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
    		    <div className='w-full h-full flex flex-row'>
    		        <VerticalNavbar data={data} />
    		        <div className="w-full">
            		    <AddBlogs categories={categories} />
                    <DisplayBlogs blogs={blogs} categories={categories} />
            	    </div>
    		    </div> 
  			</section>
      	</React.Fragment>
        
    );
}
