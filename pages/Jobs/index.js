import React from "react";
import Link from "next/link";
import { useState } from "react";
import { MainHeader } from '../../components/common/MainHeader';
import { Hero } from "../../components/jobs/Hero";
import { Searchjobs } from "../../components/jobs/Searchjobs";
import db from '../../db';

export async function getServerSideProps() {
  const categoriesQuery = `
    SELECT 
      c.*, 
      (SELECT COUNT(*) FROM JobCategory WHERE category_id = c.category_id) AS JobCategoryCount
    FROM Category c
    ORDER BY c.ModifiedDate ASC
  `;

  const locationsQuery = `
    SELECT 
      l.*, 
      (SELECT COUNT(*) FROM JobLocation WHERE location_id = l.location_id) AS JobLocationCount
    FROM Location l
    ORDER BY l.ModifiedDate ASC
  `;

  const jobsQuery = `
    SELECT 
      j.*, 
      u.UserName
    FROM Job j
    LEFT JOIN User u ON j.user_id = u.user_id
    ORDER BY j.ModifiedDate ASC
  `;


  try {

    const [categoriesResult] = await db.query(categoriesQuery);
    const [locationsResult] = await db.query(locationsQuery);
    const [jobsResult] = await db.query(jobsQuery);

    const Alljobs = jobsResult.map(data => ({
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

    const reversejob = Alljobs.reverse();

    console.log(locations)
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
  console.log(latestjobs)
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
