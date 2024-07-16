import React from "react";
import { MainHeader } from '../../components/common/MainHeader';
import { AllBlogs } from '../../components/Blogs/AllBlogs';

import pool from '../../db';

export async function getServerSideProps(context) {
  const blogCategoriesQuery = `
    SELECT 
      bc.*, 
      u."UserName"
    FROM "BlogsCategory" bc
    LEFT JOIN "User" u ON bc."user_id" = u."user_id"
    ORDER BY bc."category_id" ASC
  `;

  const blogsQuery = `
    SELECT 
      b.*, 
      u."UserName",
      json_agg(
        json_build_object(
          'category_id', bc."category_id",
          'CategoryName', bc."CategoryName"
        )
      ) AS "BlogsCategories"
    FROM "Blogs" b
    LEFT JOIN "User" u ON b."user_id" = u."user_id"
    LEFT JOIN "BlogsCategoryRelationship" bcr ON b."blogs_id" = bcr."blogs_id"
    LEFT JOIN "BlogsCategory" bc ON bcr."category_id" = bc."category_id"
    GROUP BY b."blogs_id", u."UserName"
    ORDER BY b."ModifiedDate" DESC
  `;

  try {
    const client = await pool.connect();
    const [blogCategoriesResult, blogsResult] = await Promise.allSettled([
      client.query(blogCategoriesQuery),
      client.query(blogsQuery)
    ]);

    const blogCategories = blogCategoriesResult.status === 'fulfilled' ? blogCategoriesResult.value.rows : [];
    const blogs = blogsResult.status === 'fulfilled' ? blogsResult.value.rows : [];

    const allBlogCategories = blogCategories.map(data => ({
      category_id: data.category_id,
      CategoryName: data.CategoryName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      userName: data.UserName,
    }));

    const allBlogs = blogs.map(data => ({
      blogs_id: data.blogs_id,
      Header: data.Header,
      image: data.Image,
      view: data.view,
      ShortDescription: data.ShortDescription,
      Description: data.Description,
      userName: data.UserName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      Category: data.BlogsCategories,
    }));

    client.release();

    return {
      props: {
        categories: JSON.parse(JSON.stringify(allBlogCategories)),
        allblogs: JSON.parse(JSON.stringify(allBlogs)),
      },
    };
  } 
  catch (err) {
    console.error('Database Query Error:', err);
    return {
      props: {
        categories: [],
        allblogs: [],
      },
    };
  }
}
 
export default function News({allblogs, categories}) {
  return (
    <React.Fragment>
      <MainHeader title="Hulu Media : Blogs" />
      <section className="w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] overflow-hidden px-0 lg:px-32">
        <div className="max-w-7xl mx-auto flex flex-col py-32 px-2 lg:!px-3">
          <AllBlogs allblogs={allblogs} categories={categories}/>
        </div>
      </section>
    </React.Fragment>
  );
}
