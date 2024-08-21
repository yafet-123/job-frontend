import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import db from '../../../db.js'
import { MainHeader } from '../../../components/common/MainHeader';
import { DisplayIndvidualBlogs } from '../../../components/Blogs/DisplayIndvidualBlogs';
import { DisplayLatestBlogs } from '../../../components/Blogs/DisplayLatestBlogs';
import Head from 'next/head'

export async function getServerSideProps(context) {
  const { query } = context;
  const id = query.blogs_id;

  
  try {

    await db.query(`
      UPDATE "Blogs"
      SET view = view + 1
      WHERE blogs_id = $1
    `, [id]);

    const blogData = await db.query(`
      SELECT b.blogs_id, b."Header", b."Image", b."ShortDescription", b."Description", 
        b."CreatedDate", b."ModifiedDate", u."UserName",
        json_agg(json_build_object('category_id', bc.category_id, 'CategoryName', bc."CategoryName")) AS "Categories"
      FROM "Blogs" b
      INNER JOIN "User" u ON b.user_id = u.user_id
      LEFT JOIN "BlogsCategoryRelationship" bcr ON b.blogs_id = bcr.blogs_id
      LEFT JOIN "BlogsCategory" bc ON bcr.category_id = bc.category_id
      WHERE b.blogs_id = $1
      GROUP BY b.blogs_id, u."UserName"
    `, [id]);

    const data = blogData;
      
    const onedata = {
      blogs_id: data.blogs_id,
      Header: data.Header,
      Image: data.Image,
      ShortDescription: data.ShortDescription,
      Description: data.Description,
      userName: data.UserName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      Categories:data.Categories
    }

    const blogsCategory = data.Categories;

    const findCategory = blogsCategory.map(category => Number(category.category_id));

    console.log(findCategory)
    // Fetch related blogs based on category
    const dataForCategoryBlogs = await db.query(`
      SELECT b.blogs_id, b."Header", b."Image", b."ShortDescription", b."Description",
             b."CreatedDate", b."ModifiedDate", u."UserName",
             json_agg(json_build_object('category_id', bc.category_id, 'CategoryName', bc."CategoryName")) AS "Categories"
      FROM "BlogsCategoryRelationship" bcr
      INNER JOIN "Blogs" b ON bcr.blogs_id = b.blogs_id
      INNER JOIN "User" u ON b.user_id = u.user_id
      INNER JOIN "BlogsCategory" bc ON bcr.category_id = bc.category_id
      WHERE bc.category_id = ANY($1)
      GROUP BY b.blogs_id, u."UserName"
    `, [findCategory]);

    // Fetch latest blogs
    const latestblogs = await db.query(`
      SELECT b.blogs_id, b."Header", b."Image", b."ShortDescription", 
             b."CreatedDate", b."ModifiedDate", u."UserName",
             json_agg(json_build_object('category_id', bc.category_id, 'CategoryName', bc."CategoryName")) AS "Categories"
      FROM "Blogs" b
      INNER JOIN "User" u ON b.user_id = u.user_id
      LEFT JOIN "BlogsCategoryRelationship" bcr ON b.blogs_id = bcr.blogs_id
      LEFT JOIN "BlogsCategory" bc ON bcr.category_id = bc.category_id
      GROUP BY b.blogs_id, u."UserName"
      ORDER BY b.blogs_id DESC
        LIMIT 6
    `);
    console.log(onedata)
    
    const AllcategoryBlogs = dataForCategoryBlogs.map(row => ({
      Blogs: row
    }));

    const uniqueallcategoryBlogs = [...new Map(AllcategoryBlogs.map(v => [v.Blogs.blogs_id, v])).values()];

    const Alllatestblogs = latestblogs.rows.map(data => ({
      blogs_id: data.blogs_id,
      Header: data.Header,
      image: data.Image,
      ShortDescription: data.ShortDescription,
      userName: data.UserName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      Category: data.Categories
    }));
    // Disconnect from the PostgreSQL database

    return {
      props: {
        blogs: JSON.parse(JSON.stringify(onedata)),
        Alllatestblogs: JSON.parse(JSON.stringify(Alllatestblogs)),
        blogsCategory: JSON.parse(JSON.stringify(blogsCategory)),
        AllcategoryBlogs: JSON.parse(JSON.stringify(uniqueallcategoryBlogs))
      }
    }
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

 
export default function DisplayBlogs({blogs,Alllatestblogs, blogsCategory,AllcategoryBlogs}) {
  const router = useRouter()
  const shareUrl = router.asPath
  return (
    <React.Fragment>
      <Head>
        <title>Hulu Media : Display Blogs</title>
        <meta name="description" content="HuluNeger is one the most online recruitment provider in ethiopia, 
          The website advertises jobs across a wide range of job types by different employers, 
          inlcuding private, local, international, who are hiring in ethiopia." 
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo3.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/logo3.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo3.png" />

        <meta property="og:url" content={`https://job-frontend-main.vercel.app${router.asPath}`}/>
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="1233665570615472" />
        <meta property="og:title" content="Hulu Media : Display Blogs" />
        <meta name="twitter:card" content={blogs.ShortDescription} />
        <meta property="og:description" content={blogs.ShortDescription} />
        <meta property="og:image" content={blogs.Image} />
        <meta property="og:image:secure_url" content={blogs.Image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="300" />
      </Head>
      <section className="flex flex-col lg:flex-row w-full h-full px-1 lg:pl-80 lg:px-32 bg-[#e6e6e6] dark:bg-[#02201D] pt-32">
        <DisplayIndvidualBlogs blogs={blogs} blogsCategory={blogsCategory} AllcategoryBlogs={AllcategoryBlogs} shareUrl={router.asPath} />
        <DisplayLatestBlogs Alllatestblogs={Alllatestblogs}/>          
      </section>
    </React.Fragment>
  );
} 
