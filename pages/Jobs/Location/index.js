import React from "react";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import Image from 'next/image'
import { AiOutlineClockCircle } from "react-icons/ai";
import { useRouter } from 'next/router'
import axios from 'axios';
import pool from '../../../db.js'
import moment from 'moment';
import { MainHeader } from '../../../components/common/MainHeader';
import { GroupLatestJobs } from '../../../components/jobs/GroupLatestJobs'
import { CompanyJobs } from '../../../components/jobs/CompanyJobs'
import { Location } from '../../../components/jobs/Location'

export async function getServerSideProps(context) {
  const { query } = context;
  const location_id = query.location_id;

  // Define the queries
  const locationsQuery = `
    SELECT l.*, COUNT(jl.job_id) JobCount
    FROM "Location" l
    LEFT JOIN "JobLocation" jl ON l.location_id = jl.location_id
    GROUP BY l.location_id
  `;
 
  const jobsByLocationQuery = `
    SELECT j.job_id, j."CompanyName", j."Image", j."JobsName", j."CareerLevel", j."Salary", j."Descreption", j."shortDescreption", j."DeadLine", j."view", j."CreatedDate", j."ModifiedDate", u."UserName",
      json_agg(
        json_build_object(
          'location_id', l.location_id,
          'LocationName', l."LocationName"
        )
      ) AS "JobLocation"
    FROM "Job" j
    INNER JOIN "User" u ON j.user_id = u.user_id
    LEFT JOIN "JobLocation" jl ON j.job_id = jl.job_id
    LEFT JOIN "Location" l ON jl.location_id = l.location_id
    WHERE l.location_id = $1
    GROUP BY j.job_id, u."UserName"
    ORDER BY j.job_id ASC
  `;

  const latestJobsQuery = `
    SELECT j.*
    FROM "Job" j
    ORDER BY j."ModifiedDate" DESC
    LIMIT 5
  `;

  try {
    const client = await pool.connect();

    // Fetch locations
    const locationsResult = await client.query(locationsQuery);
    const locations = locationsResult.rows;

    // Fetch jobs by location
    const jobsByLocationResult = await client.query(jobsByLocationQuery, [Number(location_id)]);
    const jobsByLocation = jobsByLocationResult.rows;

    // Fetch latest jobs
    const latestJobsResult = await client.query(latestJobsQuery);
    const latestJobs = latestJobsResult.rows;

    // Reverse the job arrays
    const reverseJobsByLocation = jobsByLocation.reverse();
    const reverseLatestJobs = latestJobs.reverse();
    console.log(locations)
    // Close the client connection
    client.release();

    return {
      props: {
        Alllatestjobs: JSON.parse(JSON.stringify(reverseLatestJobs)),
        jobsbylocation: JSON.parse(JSON.stringify(reverseJobsByLocation)),
        locations: JSON.parse(JSON.stringify(locations)),
      },
    };
  } catch (err) {
    console.error('Database Query Error:', err);
    return {
      props: {
        Alllatestjobs: [],
        jobsbylocation: [],
        locations: [],
      },
    };
  }
}

export default function JobsByLocation({locations, jobsbylocation, Alllatestjobs}) {
	const router = useRouter();
  const { location, howmany, image } = router.query
  const shareUrl = router.asPath
  console.log(jobsbylocation)
  return (
  	<React.Fragment>
      <MainHeader title="Hulu Media : Jobs By Location" />
	    <section className="bg-[#e6e6e6] dark:bg-[#02201D] flex flex-col w-full h-full px-0 md:px-56 py-44">
	    	<div className="flex flex-col bg-neutral-100 dark:bg-[#1B2637] w-full h-full lg:px-5 py-10 border rounded-xl dark:border-slate-800">
	    		<div className="flex flex-col lg:flex-row justify-between items-center mb-10 bg-neutral-200 dark:bg-slate-700 px-10">
	    			<div className="flex flex-col items-center lg:flex-row mb-2 lg:mb-5 mt-3 lg:mt-10">
	    				<Image src={image} width={100} height={100} alt="image" className="rounded-2xl" />
		    			<h1 className="lg:ml-5 text-[#009688] text-xl md:text-3xl lg:text-5xl capitalize font-bold mt-10 lg:mt-0 text-center lg:text-left">Jobs in {location}</h1>
	    			</div>
	    			<div className="flex flex-col items-center lg:flex-row mb-2 lg:mb-5 mt-3 lg:mt-10">
	    				<div className="flex flex-col lg:mr-5 mb-10 lg:mb-0">
	    					<p className="text-lg lg:text-2xl text-black dark:text-white font-bold capitalize mb-5 lg:mb-0 text-center lg:text-left">Population of {location}</p>
	    					<p className="text-md lg:text-xl text-black dark:text-white font-bold capitalize text-center">2,739,551 </p>
	    				</div>

	    				<div className="flex flex-col items-center justify-center lg:ml-5 border rounded-xl bg-[#009688] text-white p-2 lg:p-5">
	    					<p className="text-lg lg:text-2xl font-bold capitalize">Jobs</p>
	    					<p className="text-md lg:text-xl font-bold capitalize">{howmany}</p>
	    				</div>
	    			</div>
	    		</div>	
	      	<div className="flex flex-col w-full">
	      		<div className="flex flex-col-reverse lg:flex-row w-full">
		      		<div className="flex flex-col w-full lg:w-1/4 h-[20rem] lg:h-[50rem] p-3 bg-neutral-200 dark:bg-slate-700 sticky top-32">
		      				<h1 className="text-lg md:text-xl lg:text-2xl text-black dark:text-white font-bold capitalize text-center mb-10">Jobs in ethopia</h1>
		      				<Location locations={locations} />
		      		</div>
		      		<div className="flex flex-col md:flex-row w-full lg:w-3/4 p-3 lg:border-l-2 px-3 lg:px-10">
		      			{ jobsbylocation == "" ? 
		      				<h1 className="text-black dark:text-white text-lg lg:text-xl font-bold text-center italic">
		      					There is No job posted in {location}
		      				</h1>
		      			:
			      			<CompanyJobs jobs={jobsbylocation} shareUrl={shareUrl} />
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
