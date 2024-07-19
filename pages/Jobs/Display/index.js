import React,{useState,useEffect} from "react";
import Link from "next/link";
import { JobRequirement } from "../../../data/JobRequirement";
import { TopAndBottomOfDisplayJobs } from "../../../components/jobs/TopAndBottomOfDisplayJobs";
import { DisplayIndividualJobs } from "../../../components/jobs/DisplayIndividualJobs";
import axios from "axios";
import { useRouter } from 'next/router'
import pool from '../../../db.js'
import Head from 'next/head';



export async function getServerSideProps(context) {
  const { params, req, res, query } = context;
  const id = query.job_id;

  const updateViewQuery = `
    UPDATE "Job"
    SET view = view + 1
    WHERE job_id = $1
  `;

  const jobQuery = `
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
      WHERE j.job_id = $1
      GROUP BY j.job_id, u."UserName"
      ORDER BY j.job_id ASC;
    `;

  const categoriesQuery = `
    SELECT c."CategoryName"
    FROM "JobCategory" jc
    INNER JOIN "Category" c ON jc.category_id = c.category_id
    WHERE jc.job_id = $1
  `;

  try {
    
    const client = await pool.connect();

    // Increment the view count
    await client.query(updateViewQuery, [Number(id)]);

    // Fetch job details
    const jobResult = await client.query(jobQuery, [Number(id)]);
    const jobData = jobResult.rows[0];
    
    if (!jobData) {
      throw new Error(`Job with ID ${id} not found.`);
    }

    console.log(jobData)

    const onedata = {
      job_id: jobData.job_id,
      CompanyName: jobData.CompanyName,
      image: jobData.Image,
      JobsName: jobData.JobsName,
      CareerLevel: jobData.CareerLevel,
      Salary: jobData.Salary,
      Descreption: jobData.Descreption,
      shortDescreption: jobData.shortDescreption,
      DeadLine: jobData.DeadLine,
      Apply: jobData.Apply,
      view: jobData.view,
      userName: jobData.UserName,
      CreatedDate: jobData.CreatedDate,
      ModifiedDate: jobData.ModifiedDate,
      Location: jobData.Location
    };

    // Fetch categories
    const categoriesResult = await client.query(categoriesQuery, [Number(id)]);
    const categoriesData = categoriesResult.rows.map(row => ({
      CategoryName: row.CategoryName,
    }));

    await client.end();

    return {
      props: {
        job: JSON.parse(JSON.stringify(onedata)),
        categories: JSON.parse(JSON.stringify(categoriesData)),
      },
    };
  } catch (err) {
    console.error('Database Query Error:', err);
    return {
      props: {
        job: {},
        categories: [],
      },
    };
  }
}


export default function DisplayJobs({job, categories}) {
	const router = useRouter()

  return (
	 	<React.Fragment>
	     <Head>
	      <title>Hulu Media : Display Jobs</title>
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
	      <meta property="og:title" content="Hulu Media : Display Jobs"/>
	      <meta name="twitter:card" content={job.ShortDescription} />
	      <meta property="og:description" content={job.ShortDescription}/>
	      <meta property="og:image" content={job.image} />
	      <meta property="og:image:secure_url" content={job.image} />
	      <meta property="og:image:width" content="1200" />
	      <meta property="og:image:height" content="300" />
	    	</Head>
			<section className="flex flex-col w-full h-full px-5 lg:px-56 bg-[#e6e6e6] dark:bg-[#02201D] py-52">
		  	<TopAndBottomOfDisplayJobs DeadLine={job.DeadLine} Apply={job.Apply} quotes={job.ShortDescription} shareUrl={router.asPath} />
		  	<DisplayIndividualJobs job={job} categories={categories}/>
		  	<TopAndBottomOfDisplayJobs DeadLine={job.DeadLine} Apply={job.Apply} quotes={job.ShortDescription} shareUrl={router.asPath} />
			</section>
		</React.Fragment>
  );
}
