import React from "react";
import { MainHeader } from '../../../components/common/MainHeader';
import { AllBlogs } from '../../../components/Blogs/AllBlogs';

import pool from '../../../db';

export async function getServerSideProps(context) {
  const { params, req, res, query } = context;
  const category_id = query.category_id;
  console.log(category_id);

   const blogsquery = `
  SELECT b.blogs_id, b."Header", b."Image", b."view", b."ShortDescription", b."CreatedDate", b."ModifiedDate", 
         u."UserName",
         json_agg(
           json_build_object(
             'category_id', bc.category_id,
             'CategoryName', bc."CategoryName"
           )
         ) AS "Categories"
  FROM "Blogs" b
  INNER JOIN "User" u ON b.user_id = u.user_id
  INNER JOIN "BlogsCategoryRelationship" bcr ON b.blogs_id = bcr.blogs_id
  INNER JOIN "BlogsCategory" bc ON bcr.category_id = bc.category_id
  WHERE bc.category_id = $1
  GROUP BY b.blogs_id, b."Header", b."Image", b."view", b."ShortDescription", b."CreatedDate", b."ModifiedDate", u."UserName"
  ORDER BY b.blogs_id DESC
`;

  const categoriesQuery = `
    SELECT category_id, "CategoryName", "CreatedDate", "ModifiedDate" 
    FROM "BlogsCategory"
    ORDER BY category_id DESC
  `;

  try {
    const client = await pool.connect();

    const blogsResult = await client.query(blogsquery, [Number(category_id)]);

    const Allblogs = blogsResult.rows.map(row => ({
      blogs_id: row.blogs_id,
      Header: row.Header,
      image: row.Image,
      view: row.view,
      ShortDescription: row.ShortDescription,
      userName: row.UserName,
      CreatedDate: row.CreatedDate,
      ModifiedDate: row.ModifiedDate,
      Category: row.Categories
    }));
    console.log(Allblogs)
    const categoriesResult = await client.query(categoriesQuery);

    const categories = categoriesResult.rows.map(row => ({
      category_id: row.category_id,
      CategoryName: row.CategoryName,
      CreatedDate: row.CreatedDate,
      ModifiedDate: row.ModifiedDate
    }));
    console.log(categories)
    client.release();

    return {
      props: {
        Allblogs: JSON.parse(JSON.stringify(Allblogs)),
        categories: JSON.parse(JSON.stringify(categories))
      }
    };
  } catch (err) {
    console.error('Database Query Error:', err);
    return {
      props: {
        Allblogs:[],
        categories: []
      },
    };
  }
}

export default function EntertemimentByCategory({Allblogs, categories}) {
	return(
		<React.Fragment>
      <MainHeader title="Hulu Media : Blogs" />
      <section className="w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] overflow-hidden px-0 lg:px-32">
        <div className="max-w-7xl mx-auto flex flex-col py-32 px-2 lg:!px-3">
          <AllBlogs allblogs={Allblogs} categories={categories}/>
        </div>
      </section>
    </React.Fragment>
	)
}