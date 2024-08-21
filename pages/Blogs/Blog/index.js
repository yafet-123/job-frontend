import React from "react";
import { MainHeader } from '../../../components/common/MainHeader';
import { AllBlogs } from '../../../components/Blogs/AllBlogs';
import db from '../../../db.js'

export async function getServerSideProps(context) {
  const { query } = context;
  const blogs_id = query.blogs_id;
  console.log(blogs_id);

  try {

  // Fetch all blog categories
    const blogscategoriesResult = await db.query(`
      SELECT bc.category_id, bc."CategoryName", bc."CreatedDate", bc."ModifiedDate", u."UserName"
      FROM "BlogsCategory" bc
      LEFT JOIN "User" u ON bc.user_id = u.user_id
      ORDER BY bc.category_id ASC
    `);
    
    const Allblogscategories = blogscategoriesResult.map(data => ({
      category_id: data.category_id,
      CategoryName: data.CategoryName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      userName: data.UserName
    }));

    console.log(Allblogscategories)
  
    // Fetch blogs for the given category
    const blogsResult = await db.query(`
      SELECT b.blogs_id, b."Header", b."Image", b."view", b."ShortDescription", b."Description", 
             b."CreatedDate", b."ModifiedDate", u."UserName",
             json_agg(json_build_object('category_id', bc.category_id, 'CategoryName', bc."CategoryName")) AS "Categories"
      FROM "Blogs" b
      INNER JOIN "User" u ON b.user_id = u.user_id
      INNER JOIN "BlogsCategoryRelationship" bcr ON b.blogs_id = bcr.blogs_id
      INNER JOIN "BlogsCategory" bc ON bcr.category_id = bc.category_id
      WHERE bc.category_id = $1
      GROUP BY b.blogs_id, u."UserName"
      ORDER BY b."ModifiedDate" DESC
    `, [blogs_id]);
  
    const allblogs = blogsResult.map(data => ({
      blogs_id: data.blogs_id,
      Header: data.Header,
      image: data.Image,
      view: data.view,
      ShortDescription: data.ShortDescription,
      Description: data.Description,
      userName: data.UserName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      Category: data.Categories
    }));
    
    console.log(allblogs)
    return {
      props: {
        categories: JSON.parse(JSON.stringify(Allblogscategories)),
        allblogs: JSON.parse(JSON.stringify(allblogs)),
      }
    }
  }catch (err) {
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
  console.log(allblogs)
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
