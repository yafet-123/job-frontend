import { Hero } from "../components/Home/Hero";
import { LatestJobs } from "../components/Home/LatestJobs";
import { SearchJobs } from "../components/Home/SearchJobs";
import { Slide } from "../components/Home/Slide";
import React from 'react'
import { MainHeader } from '../components/common/MainHeader';
import { useSession } from "next-auth/react";

import pool from '../db';

export async function getStaticProps() {
  const locationsQuery = `
    SELECT 
      l.*, 
      COUNT(jl."location_id") AS "JobLocationCount"
    FROM "Location" l
    LEFT JOIN "JobLocation" jl ON l."location_id" = jl."location_id"
    GROUP BY l."location_id"
  `;

  const categoriesQuery = `
    SELECT 
      c.*, 
      COUNT(jc."category_id") AS "JobCategoryCount"
    FROM "Category" c
    LEFT JOIN "JobCategory" jc ON c."category_id" = jc."category_id"
    GROUP BY c."category_id"
  `;

  const latestJobsQuery = `
    SELECT 
      j.*, 
      u."UserName",
      json_agg(
        json_build_object(
          'location_id', l."location_id",
          'LocationName', l."LocationName"
        )
      ) AS "JobLocations",
      json_agg(
        json_build_object(
          'category_id', c."category_id",
          'CategoryName', c."CategoryName"
        )
      ) AS "JobCategories"
    FROM "Job" j
    LEFT JOIN "User" u ON j."user_id" = u."user_id"
    LEFT JOIN "JobLocation" jl ON j."job_id" = jl."job_id"
    LEFT JOIN "Location" l ON jl."location_id" = l."location_id"
    LEFT JOIN "JobCategory" jc ON j."job_id" = jc."job_id"
    LEFT JOIN "Category" c ON jc."category_id" = c."category_id"
    GROUP BY j."job_id", u."UserName"
    ORDER BY j."ModifiedDate" DESC
    LIMIT 5
  `;

  const newsQuery = `
    SELECT 
      n.*, 
      u."UserName",
      json_agg(
        json_build_object(
          'category_id', nc."category_id",
          'CategoryName', nc."CategoryName"
        )
      ) AS "NewsCategories"
    FROM "News" n
    LEFT JOIN "User" u ON n."user_id" = u."user_id"
    LEFT JOIN "NewsCategoryRelationship" ncr ON n."news_id" = ncr."news_id"
    LEFT JOIN "NewsCategory" nc ON ncr."category_id" = nc."category_id"
    GROUP BY n."news_id", u."UserName"
    ORDER BY n."CreatedDate" DESC
    LIMIT 5
  `;

  const entertainmentsQuery = `
    SELECT 
      e.*, 
      u."UserName",
      json_agg(
        json_build_object(
          'category_id', ec."category_id",
          'CategoryName', ec."CategoryName"
        )
      ) AS "EntertainmentCategories"
    FROM "Entertainment" e
    LEFT JOIN "User" u ON e."user_id" = u."user_id"
    LEFT JOIN "EntertainmentCategoryRelationship" ecr ON e."entertainment_id" = ecr."entertainment_id"
    LEFT JOIN "EntertainmentCategory" ec ON ecr."category_id" = ec."category_id"
    GROUP BY e."entertainment_id", u."UserName"
    ORDER BY e."CreatedDate" DESC
    LIMIT 5
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
    ORDER BY b."blogs_id" DESC
    LIMIT 6
  `;

  try {
    const client = await pool.connect();
    
    const [
      locationsResult,
      categoriesResult,
      latestJobsResult,
      newsResult,
      entertainmentsResult,
      blogsResult
    ] = await Promise.allSettled([
      client.query(locationsQuery),
      client.query(categoriesQuery),
      client.query(latestJobsQuery),
      client.query(newsQuery),
      client.query(entertainmentsQuery),
      client.query(blogsQuery)
    ]);

    const locations = locationsResult.status === 'fulfilled' ? locationsResult.value.rows : [];
    const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value.rows : [];
    const latestjobs = latestJobsResult.status === 'fulfilled' ? latestJobsResult.value.rows.reverse() : [];
    const latestnews = newsResult.status === 'fulfilled' ? newsResult.value.rows.map(data => ({
      ...data,
      Category: data.NewsCategories
    })) : [];
    const latestentertainments = entertainmentsResult.status === 'fulfilled' ? entertainmentsResult.value.rows.map(data => ({
      entertainment_id:data.entertainment_id,
      CreatedDate:data.CreatedDate,
      Header:data.Header,
      ShortDescription:data.ShortDescription,
      image:data.Image,
      view:data.view,
      Category: data.EntertainmentCategories
    })) : [];
    const Alllatestblogs = blogsResult.status === 'fulfilled' ? blogsResult.value.rows.map(data => ({
      blogs_id:data.blogs_id,
      CreatedDate:data.CreatedDate,
      Header:data.Header,
      ShortDescription:data.ShortDescription,
      image:data.Image,
      view:data.view,
      Category: data.BlogsCategories
    })) : [];

    client.release();

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
