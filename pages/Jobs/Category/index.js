import React from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import axios from 'axios';
import moment from 'moment';
import { MainHeader } from '../../../components/common/MainHeader';
import { useState, useEffect, useRef} from 'react'
import {Share} from '../../../components/common/Share.js'
import { GroupLatestJobs } from '../../../components/jobs/GroupLatestJobs'
import { CompanyJobs } from '../../../components/jobs/CompanyJobs'
import { Company } from '../../../components/jobs/Company'
import pool from '../../../db';

export async function getServerSideProps(context) {
  const { query } = context;
  const category_id = query.category_id;
  console.log(category_id);

  // Query to get jobs by category
  const jobsByCategoryQuery = `
    SELECT 
      j.job_id, 
      j."CompanyName", 
      j."Image", 
      j."JobsName", 
      j."CareerLevel", 
      j."Salary", 
      j."Descreption", 
      j."shortDescreption", 
      j."DeadLine",  
      j."view", 
      j."CreatedDate", 
      j."ModifiedDate", 
      u."UserName" AS userName,
      json_agg(
        json_build_object(
          'location_id', l.location_id,
          'LocationName', l."LocationName"
        )
      ) AS "JobLocation",
      json_agg(
        json_build_object(
          'category_id', c.category_id,
          'CategoryName', c."CategoryName"
        )
      ) AS "JobCategory"
    FROM "Job" j
    LEFT JOIN "User" u ON j.user_id = u.user_id
    LEFT JOIN "JobLocation" jl ON j.job_id = jl.job_id
    LEFT JOIN "Location" l ON jl.location_id = l.location_id
    LEFT JOIN "JobCategory" jc ON j.job_id = jc.job_id
    LEFT JOIN "Category" c ON jc.category_id = c.category_id
    WHERE c.category_id = $1
    GROUP BY j.job_id, u."UserName"
    ORDER BY j.job_id ASC;
  `;

  // Query to get categories
  const categoriesQuery = `
    SELECT 
      c.category_id, 
      c."CategoryName", 
      COUNT(jc.job_id) AS "JobCount"
    FROM "Category" c
    LEFT JOIN "JobCategory" jc ON c.category_id = jc.category_id
    GROUP BY c.category_id;
  `;

  // Query to get latest jobs
  const latestJobsQuery = `
    SELECT 
      j.job_id, 
      j."CompanyName", 
      j."JobsName", 
      j."Image", 
      j."CreatedDate", 
      j."ModifiedDate",
      json_agg(
        json_build_object(
          'location_id', l.location_id,
          'LocationName', l."LocationName"
        )
      ) AS "JobLocation"
    FROM "Job" j
    LEFT JOIN "JobLocation" jl ON j.job_id = jl.job_id
    LEFT JOIN "Location" l ON jl.location_id = l.location_id
    GROUP BY j.job_id
    ORDER BY j."ModifiedDate" DESC
    LIMIT 5;
  `;

  try {
    const client = await pool.connect();
    // Execute queries
    const jobsByCat = await client.query(jobsByCategoryQuery, [category_id]);
    const catego = await client.query(categoriesQuery);
    const latestJ = await client.query(latestJobsQuery);

    const jobsByCategory = jobsByCat.rows
    const categories = catego.rows
    const latestJobs = latestJ.rows
    // Process data
    const Alljobs = jobsByCategory.map((data) => ({
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
      categories: data.JobCategory,
      JobLocation: data.JobLocation,
    }));

    const reverseJob = Alljobs.reverse();

    const AlllatestJobs = latestJobs.map((data) => ({
      job_id: data.job_id,
      CompanyName: data.CompanyName,
      JobsName: data.JobsName,
      CreatedDate: data.CreatedDate,
      image: data.Image,
      ModifiedDate: data.ModifiedDate,
    }));

    const reverseJobLatest = AlllatestJobs.reverse();

    return {
      props: {
        jobsbycategory: JSON.parse(JSON.stringify(reverseJob)),
        Alllatestjobs: JSON.parse(JSON.stringify(reverseJobLatest)),
        categories: JSON.parse(JSON.stringify(categories)),
      },
    };
  } catch (error) {
    console.error('Error fetching server-side props:', error);
    return {
      props: {
        jobsbycategory: [],
        Alllatestjobs: [],
        categories: [],
        error: "An error occurred while fetching data."
      },
    };
  }
}


export default function JobsByCategory({categories,Alllatestjobs, jobsbycategory}) {
	const router = useRouter();
  const shareUrl = router.asPath
 	const { category, howmany } = router.query
  console.log(jobsbycategory)
  return (
  	<React.Fragment>
      <MainHeader title="Hulu Media : Jobs By Category" />
	    <section className="bg-[#e6e6e6] dark:bg-[#02201D] flex flex-col w-full h-full px-0 md:px-56 py-44">
	    	<div className="flex flex-col bg-neutral-100 dark:bg-[#1B2637] w-full h-full lg:px-5 py-10 border rounded-xl dark:border-slate-800">
	    		<div className="flex flex-col lg:flex-row justify-between items-center mb-10 bg-neutral-200 dark:bg-slate-700 px-3 lg:px-10">
	    			<div className="flex flex-col lg:flex-row mb-2 lg:mb-5 mt-3 lg:mt-10">
		    			<h1 className="lg:ml-5 text-[#009688] text-xl md:text-3xl lg:text-4xl capitalize font-bold mt-10 lg:mt-0 text-center lg:text-left">{category} Jobs</h1>
	    			</div>
	    			<div className="flex flex-col lg:flex-row mb-2 lg:mb-5 mt-3 lg:mt-10"> 				
	    				<div className="flex flex-col items-center justify-center lg:ml-5 border rounded-xl bg-[#009688] text-white py-2 lg:py-5 px-10">
	    					<p className="text-lg lg:text-xl font-bold capitalize">Jobs</p>
	    					<p className="text-md lg:text-xl font-bold capitalize">{howmany}</p>
	    				</div>
	    			</div>
	    		</div>
	      	<div className="flex flex-col w-full">
	      		<div className="flex flex-col-reverse lg:flex-row w-full">
		      		<div className="flex flex-col w-full lg:w-1/4 h-[20rem] lg:h-[50rem] bg-neutral-200 dark:bg-slate-700 p-3 sticky top-32">
		      			<h1 className="text-lg md:text-xl lg:text-2xl text-black dark:text-white font-bold capitalize text-center mb-10">Jobs By Category</h1>
		      			<Company categories={categories} />
		      		</div>
		      		<div className="flex flex-col w-full lg:w-3/4 p-3 lg:border-l-2 px-3 lg:px-10">
		      			{ jobsbycategory == "" ? 
		      				<h1 className="text-black dark:text-white text-lg lg:text-xl font-bold text-center italic">
		      					There is No job posted in {category} Category
		      				</h1>
		      			:
			      			<CompanyJobs jobs={jobsbycategory} shareUrl={shareUrl} />
		      			}
		      		</div>
		      	</div>
	      		 
	      		<GroupLatestJobs Alllatestjobs={Alllatestjobs} />
	     		</div>
	    	</div>    	
	    </section>
	  </React.Fragment>
  );
}
				                 