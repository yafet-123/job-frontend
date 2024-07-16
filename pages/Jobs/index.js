import React from "react";
import Link from "next/link";
import { useState } from "react";
import { MainHeader } from '../../components/common/MainHeader';
import { Hero } from "../../components/jobs/Hero";
import { Searchjobs } from "../../components/jobs/Searchjobs";

// pages/index.js
import pool from '../../db';

export async function getServerSideProps() {
  const categoriesQuery = `
    SELECT 
      c.*, 
      (SELECT COUNT(*) FROM "JobCategory" WHERE "category_id" = c."category_id") AS "JobCategoryCount"
    FROM "Category" c
    ORDER BY c."ModifiedDate" ASC
  `;

  const locationsQuery = `
    SELECT 
      l.*, 
      (SELECT COUNT(*) FROM "JobLocation" WHERE "location_id" = l."location_id") AS "JobLocationCount"
    FROM "Location" l
    ORDER BY l."ModifiedDate" ASC
  `;

  const jobsQuery = `
    SELECT 
      j.*, 
      u."UserName",
      json_build_object(
        'location_id', jl."location_id",
        'LocationName', loc."LocationName"
      ) AS "JobLocation"
    FROM "Job" j
    LEFT JOIN "User" u ON j."user_id" = u."user_id"
    LEFT JOIN "JobLocation" jl ON j."job_id" = jl."job_id"
    LEFT JOIN "Location" loc ON jl."location_id" = loc."location_id"
    ORDER BY j."ModifiedDate" ASC
  `;

  try {
    const client = await pool.connect();

    const [categoriesResult, locationsResult, jobsResult] = await Promise.allSettled([
      client.query(categoriesQuery),
      client.query(locationsQuery),
      client.query(jobsQuery)
    ]);

    const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value.rows : [];
    const locations = locationsResult.status === 'fulfilled' ? locationsResult.value.rows : [];
    const jobs = jobsResult.status === 'fulfilled' ? jobsResult.value.rows : [];

    const Alljobs = jobs.map(data => ({
      job_id: data.job_id,
      CompanyName: data.CompanyName,
      image: data.Image,
      JobsName: data.JobsName,
      CareerLevel: data.CareerLevel,
      Salary: data.Salary,
      Descreption: data.Descreption,
      shortDescreption: data.shortDescreption,
      DeadLine: data.DeadLine,
      Apply: data.Apply,
      view: data.view,
      userName: data.UserName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      Location: data.JobLocation,
    }));

    const reversejob = Alljobs.reverse();

    client.release();

    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
        locations: JSON.parse(JSON.stringify(locations)),
        latestjobs: JSON.parse(JSON.stringify(reversejob)),
      },
    };
  } catch (err) {
    console.error('Database Query Error:', err);
    return {
      props: {
        categories: [],
        locations: [],
        latestjobs: [],
      },
    };
  }
}

export default function Jobs({categories, locations, latestjobs}) {
  console.log(categories)
  return (
    <React.Fragment>
      <MainHeader title="Hulu Media : Jobs" />
      <section className="flex flex-col w-full h-full py-0 lg:py-20 pt-32 bg-[#e6e6e6] dark:bg-[#02201D]">
        <Hero />
        <Searchjobs categories={categories} locations={locations} latestjobs={latestjobs} />
      </section>
    </React.Fragment>
  );
}
