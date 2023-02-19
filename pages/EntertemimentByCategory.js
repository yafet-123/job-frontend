import React from "react";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import Image from 'next/image'
import { LatestJobs } from "../components/LatestJobs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useRouter } from 'next/router'
import axios from 'axios';
import { prisma } from '../util/db.server.js'
import moment from 'moment';
import { MainHeader } from '../components/MainHeader';

export async function getServerSideProps(context){
	const {params,req,res,query} = context
  	const category_id = query.category_id
  	console.log(category_id)

  	const entertainmentsbycategory = await prisma.Entertainment.findMany({
  		where:{
  			EntertainmentCategoryRelationship:{
  				some: {
	  				EntertainmentCategory:{
	  					category_id: Number(category_id)
	  				}
	  			}
  			}		
  		},
	    orderBy: {
	    	job_id:"asc"
	    },
	    include:{
	      	User:{
	        	select:{
	          		UserName:true
	        	}
	      	},
	    } 
  	});

  	console.log(entertainmentsbycategory)

  	const Allentertainment = entertainmentsbycategory.map((data)=>({
    	entertainment_id:data.entertainment_id,
    	Header:data.Header,
    	link:data.link,
    	location_id:data.location_id,
    	userName:data.User.UserName,
    	CreatedDate:data.CreatedDate,
    	ModifiedDate:data.ModifiedDate
  	}))

  	return{
    	props:{
    		Allentertainment:JSON.parse(JSON.stringify(Allentertainment)),
    	}
  	}
}

export default function EntertemimentByCategory({categories,Alllatestjobs, jobsbycategory}) {
	return(
		<React.Fragment>
      		<MainHeader title="Jobs By Category" />
      		<section className="flex flex-col w-full h-full bg-gray-300 dark:bg-slate-700 pt-32">
				<div className='w-full h-full flex flex-col lg:flex-row'>
		        	<ETSidebar categories={categories} />
		        	<Content entertainments={Allentertainment} />
		        </div> 
			</section>
      	</React.Fragment>

	)
}