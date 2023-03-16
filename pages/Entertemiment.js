import React, {useState,useEffect} from "react";
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
import { MainHeader } from '../components/MainHeader';
import { ETSidebar } from '../components/Entertemiment/ETSidebar';
import { Content } from '../components/Entertemiment/Content';
import { prisma } from '../util/db.server.js'

export async function getServerSideProps(context){
	const data = await prisma.EntertainmentCategory.findMany({
		orderBy : {
      		category_id:'asc'
    	},
	})

	const entertainments = await prisma.Entertainment.findMany({
		orderBy : {
      		CreatedDate:'asc'
    	},
    	include:{
	      	User:{
	        	select:{
	          		UserName:true
	        	}
	      	},
      		EntertainmentCategoryRelationship:{
        		include:{
          			EntertainmentCategory:{
                        select:{
                        	category_id:true,
              				CategoryName:true
            			}
          			}
        		}
      		},
    	}
	})
	
	const categories = data.map((data)=>({
		category_id:data.category_id,
		CategoryName:data.CategoryName,
		CreatedDate:data.CreatedDate,
		ModifiedDate:data.ModifiedDate
	}))

	const entertainmentsdata = entertainments.map((data)=>({
		entertainment_id : data.entertainment_id,
		Header:data.Header,
		link:data.link,
		ShortDescription:data.ShortDescription,
		CreatedDate:data.CreatedDate,
		ModifiedDate:data.ModifiedDate,
		Category:data.EntertainmentCategoryRelationship
	}))

  return{
    props:{
      categories:JSON.parse(JSON.stringify(categories)),
      entertainments:JSON.parse(JSON.stringify(entertainmentsdata))
    }
  }
}

export default function Entertemiment({categories,entertainments}){
	console.log(entertainments)
	return(
		<React.Fragment>
      <MainHeader title="Entertemiment" />
			<section className="flex flex-col w-full h-full bg-[#ddd0c8] dark:bg-slate-700 pt-32">
				<div className='w-full h-full flex flex-col lg:flex-row'>
		      <ETSidebar categories={categories} />
		      <Content entertainments={entertainments} />
		    </div> 
			</section>
		</React.Fragment>
	)
}

