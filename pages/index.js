import { Hero } from "../components/Home/Hero";
import { LatestJobs } from "../components/Home/LatestJobs";
import { SearchJobs } from "../components/Home/SearchJobs";
import { Slide } from "../components/Home/Slide";
import React from 'react'
import { MainHeader } from '../components/common/MainHeader';
import { useSession } from "next-auth/react";

import db from '../db';

export async function getStaticProps() {
  const locationsQuery = `
    SELECT 
      l.*, 
      COUNT(jl.location_id) AS JobLocationCount
    FROM Location l
    LEFT JOIN JobLocation jl ON l.location_id = jl.location_id
    GROUP BY l.location_id
  `;

const categoriesQuery = `
    SELECT 
      c.*, 
      COUNT(jc.category_id) AS JobCategoryCount
    FROM Category c
    LEFT JOIN JobCategory jc ON c.category_id = jc.category_id
    GROUP BY c.category_id
  `;

const latestJobsQuery = `
    SELECT 
      j.*, 
      u.UserName,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'location_id', l.location_id,
          'LocationName', l.LocationName
        )
      ) AS JobLocations,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'category_id', c.category_id,
          'CategoryName', c.CategoryName
        )
      ) AS JobCategories
    FROM Job j
    LEFT JOIN User u ON j.user_id = u.user_id
    LEFT JOIN JobLocation jl ON j.job_id = jl.job_id
    LEFT JOIN Location l ON jl.location_id = l.location_id
    LEFT JOIN JobCategory jc ON j.job_id = jc.job_id
    LEFT JOIN Category c ON jc.category_id = c.category_id
    GROUP BY j.job_id, u.UserName
    ORDER BY j.ModifiedDate DESC
    LIMIT 5
  `;

const newsQuery = `
    SELECT 
      n.*, 
      u.UserName,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'category_id', nc.category_id,
          'CategoryName', nc.CategoryName
        )
      ) AS NewsCategories
    FROM News n
    LEFT JOIN User u ON n.user_id = u.user_id
    LEFT JOIN NewsCategoryRelationship ncr ON n.news_id = ncr.news_id
    LEFT JOIN NewsCategory nc ON ncr.category_id = nc.category_id
    GROUP BY n.news_id, u.UserName
    ORDER BY n.CreatedDate DESC
    LIMIT 5
  `;

const entertainmentsQuery = `
    SELECT 
      e.*, 
      u.UserName,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'category_id', ec.category_id,
          'CategoryName', ec.CategoryName
        )
      ) AS EntertainmentCategories
    FROM Entertainment e
    LEFT JOIN User u ON e.user_id = u.user_id
    LEFT JOIN EntertainmentCategoryRelationship ecr ON e.entertainment_id = ecr.entertainment_id
    LEFT JOIN EntertainmentCategory ec ON ecr.category_id = ec.category_id
    GROUP BY e.entertainment_id, u.UserName
    ORDER BY e.CreatedDate DESC
    LIMIT 5
  `;

const blogsQuery = `
    SELECT 
      b.*, 
      u.UserName,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'category_id', bc.category_id,
          'CategoryName', bc.CategoryName
        )
      ) AS BlogsCategories
    FROM Blogs b
    LEFT JOIN User u ON b.user_id = u.user_id
    LEFT JOIN BlogsCategoryRelationship bcr ON b.blogs_id = bcr.blogs_id
    LEFT JOIN BlogsCategory bc ON bcr.category_id = bc.category_id
    GROUP BY b.blogs_id, u.UserName
    ORDER BY b.blogs_id DESC
    LIMIT 6
  `;


  try {

    const [locationsResult] = await db.query(locationsQuery);
    const [categoriesResult] = await db.query(categoriesQuery);
    const [latestJobsResult] = await db.query(latestJobsQuery);
    const [newsResult] = await db.query(newsQuery);
    const [entertainmentsResult] = await db.query(entertainmentsQuery);
    const [blogsResult] = await db.query(blogsQuery);

    console.log(categoriesResult)

    const locations = locationsResult.map(data => ({
      location_id : data.location_id,
      LocationName: data.LocationName,
      Image: data.Image,
      CreatedDate: data.CreatedDate,
      ModifiedDate : data.ModifiedDate,
      JobLocationCount: data.JobLocationCount
    }))
    
    const categories = categoriesResult.map(data=>({
      category_id: data.category_id,
      CategoryName: data.CategoryName,
      CreatedDate: data.CreatedDate,
      ModifiedDate : data.ModifiedDate,
      JobCategoryCount: data.JobCategoryCount,
      user_id:data.user_id
    }))

    const latestjobs = latestJobsResult.map(data=>({
      job_id:data.job_id,
      CompanyName:data.CompanyName,
      Image:data.Image,
      JobsName:data.JobsName,
      CareerLevel:data.CareerLevel,
      Salary:data.Salary,
      Descreption:data.Descreption,
      shortDescreption:data.shortDescreption,
      view:data.view,
      DeadLine:data.DeadLine,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      user_id:data.user_id
    }))

    const latestnews = newsResult.map(data => ({
      news_id:data.news_id,
      CreatedDate:data.CreatedDate,
      Header:data.Header,
      ShortDescription:data.ShortDescription,
      image:data.Image,
      view:data.view,
      Category: data.NewsCategories
    }))

    const latestentertainments = entertainmentsResult.map(data => ({
      entertainment_id:data.entertainment_id,
      CreatedDate:data.CreatedDate,
      Header:data.Header,
      ShortDescription:data.ShortDescription,
      image:data.Image,
      view:data.view,
      Category: data.EntertainmentCategories
    }))

    const Alllatestblogs = blogsResult.map(data => ({
      blogs_id:data.blogs_id,
      CreatedDate:data.CreatedDate,
      Header:data.Header,
      ShortDescription:data.ShortDescription,
      image:data.Image,
      view:data.view,
      Category: data.BlogsCategories
    }))

    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
        locations: JSON.parse(JSON.stringify(locations)),
        latestjobs: JSON.parse(JSON.stringify(latestjobs)),
        Alllatestblogs: JSON.parse(JSON.stringify(Alllatestblogs)),
        latestnews: JSON.parse(JSON.stringify(latestnews)),
        latestentertainments: JSON.parse(JSON.stringify(latestentertainments))
      }
    };
  } 
  catch (err) {
    console.error('Database Connection Error:', err);
    return {
      props: {
        categories: [],
        locations: [],
        latestjobs: [],
        Alllatestblogs: [],
        latestnews: [],
        latestentertainments: []
      }
    };
  }
}
 
export default function Home({categories, locations, latestjobs, Alllatestblogs, latestnews, latestentertainments}) {
  const { status, data } = useSession();
  console.log(locations)
  return (
    <React.Fragment>
      <MainHeader title="Hulu Media : Home" />
      <div className="flex flex-col w-full h-full py-0 pt-32 bg-[#e6e6e6] dark:bg-[#02201D]">
        <Hero />
        <LatestJobs latestjobs={latestjobs} />
        <SearchJobs categories={categories} locations={locations} />
        <Slide latestnews={latestnews} Alllatestblogs={Alllatestblogs} latestentertainments={latestentertainments}/>
      </div>
    </React.Fragment>
  );
}
