import React from "react";
import { useState,useEffect, useContext} from 'react'
import pool from '../../../db.js'
import { DisplayJob } from "../../../components/Admin/Job/DisplayJob";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';

import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userRole = session?.user?.role;

  if (userRole !== 'admin') {
    return {
      redirect: {
        destination: '/auth/error',
        permanent: false,
      },
    };
  }

  try {
    const client = await pool.connect();

    // Fetch jobs query
    const jobsQuery = `
      SELECT 
        j.job_id, j."CompanyName", j."Image", j."JobsName", j."CareerLevel", j."Salary", 
        j."Descreption", j."shortDescreption", j."DeadLine", j."view", 
        j."CreatedDate", j."ModifiedDate",
        u."UserName" AS "userName",
        json_agg(json_build_object('location_id', l.location_id, 'LocationName', l."LocationName")) AS "Location",
        (
          SELECT json_agg(json_build_object('category_id', c.category_id, 'CategoryName', c."CategoryName"))
          FROM "JobCategory" jc
          LEFT JOIN "Category" c ON jc.category_id = c.category_id
          WHERE jc.job_id = j.job_id
        ) AS "categories"
      FROM "Job" j
      LEFT JOIN "User" u ON j.user_id = u.user_id
      LEFT JOIN "JobLocation" jl ON j.job_id = jl.job_id
      LEFT JOIN "Location" l ON jl.location_id = l.location_id
      GROUP BY j.job_id, u."UserName"
      ORDER BY j.job_id ASC;
    `;

    const jobsResult = await client.query(jobsQuery);
    const jobs = jobsResult.rows.map((data) => ({
      job_id: data.job_id,
      CompanyName: data.CompanyName,
      image: data.Image,
      JobsName: data.JobsName,
      CareerLevel: data.CareerLevel,
      Salary: data.Salary,
      Descreption: data.Descreption,
      shortDescreption: data.shortDescreption,
      DeadLine: data.DeadLine,
      view: data.view,
      userName: data.userName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      categories: data.categories,
      Location: data.Location,
    })).reverse();

    // Fetch categories query
    const categoriesQuery = `
      SELECT c.category_id, c."CategoryName", c."CreatedDate", c."ModifiedDate", u."UserName"
      FROM "Category" c
      LEFT JOIN "User" u ON c.user_id = u.user_id
      ORDER BY c.category_id ASC;
    `;
    const categoriesResult = await client.query(categoriesQuery);
    const categories = categoriesResult.rows.map((data) => ({
      category_id: data.category_id,
      CategoryName: data.CategoryName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      userName: data.UserName,
    }));

    // Fetch locations query
    const locationsQuery = `
      SELECT l.location_id, l."LocationName", l."Image", l."CreatedDate", l."ModifiedDate", u."UserName"
      FROM "Location" l
      LEFT JOIN "User" u ON l.user_id = u.user_id
      ORDER BY l.location_id ASC;
    `;
    const locationsResult = await client.query(locationsQuery);
    const locations = locationsResult.rows.map((data) => ({
      location_id: data.location_id,
      LocationName: data.LocationName,
      Image: data.Image,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      userName: data.UserName,
    }));

    client.release(); // Release the client back to the pool

    return {
      props: {
        jobs: JSON.parse(JSON.stringify(jobs)),
        categories: JSON.parse(JSON.stringify(categories)),
        locations: JSON.parse(JSON.stringify(locations)),
      },
    };
  } catch (error) {
    console.error('Database Query Error:', error);
    return {
      props: {
        error: 'An error occurred while fetching data',
      },
    };
  }
}


export default function JobDisplay({jobs,categories,locations}) {
    const { status, data } = useSession();
    console.log(jobs)
    return (
    	<React.Fragment>
      	<MainHeader title="Job Display Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
    				<div className='w-full h-full flex flex-row'>
    		      <VerticalNavbar data={data} />
    		      <div className="w-full">
            		<DisplayJob jobs={jobs} categories={categories} locations={locations}/>
            	</div>
    		    </div> 
  			  </section>
      	</React.Fragment>
        
    );
}
