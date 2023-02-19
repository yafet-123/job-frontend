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
import { ETSidebar } from '../components/ETSidebar';
import { Content } from '../components/Content';

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
	    	entertainment_id:"asc"
	    },
	    include:{
	      	User:{
	        	select:{
	          		UserName:true
	        	}
	      	},
	    } 
  	});

  	const data = await prisma.EntertainmentCategory.findMany({
		orderBy : {
      		category_id:'asc'
    	},
	})

	const categories = data.map((data)=>({
		category_id:data.category_id,
		CategoryName:data.CategoryName,
		CreatedDate:data.CreatedDate,
		ModifiedDate:data.ModifiedDate
	}))

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
    		categories:JSON.parse(JSON.stringify(categories))
    	}
  	}
}

export default function EntertemimentByCategory({Allentertainment, categories}) {
	console.log(categories)
	console.log(Allentertainment)
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