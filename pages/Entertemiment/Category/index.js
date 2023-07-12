import React from "react";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import Image from 'next/image'
import { AiOutlineClockCircle } from "react-icons/ai";
import { useRouter } from 'next/router'
import axios from 'axios';
import { prisma } from '../../../util/db.server.js'
import moment from 'moment';
import { MainHeader } from '../../../components/common/MainHeader';
import { ETSidebar } from '../../../components/Entertemiment/ETSidebar';
import { Content } from '../../../components/Entertemiment/Content';
 
export async function getServerSideProps(context){
	const {params,req,res,query} = context
  	const category_id = query.category_id
  	console.log(category_id)

  	const entertainmentsbycategory = await prisma.Entertainment.findMany({
  		orderBy : {
      		entertainment_id:'desc'
    	},
  		where:{
  			EntertainmentCategoryRelationship:{
  				some: {
	  				EntertainmentCategory:{
	  					category_id: Number(category_id)
	  				}
	  			}
  			}		
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
  	});

  	const data = await prisma.EntertainmentCategory.findMany({
		orderBy : {
      		category_id:'desc'
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
    	image:data.Image,
    	view:data.view,
    	ShortDescription:data.ShortDescription,
    	userName:data.User.UserName,
    	CreatedDate:data.CreatedDate,
    	ModifiedDate:data.ModifiedDate,
    	Category:data.EntertainmentCategoryRelationship
  	}))

  	return{
    	props:{
    		Allentertainment:JSON.parse(JSON.stringify(Allentertainment)),
    		categories:JSON.parse(JSON.stringify(categories))
    	}
  	}
}

export default function EntertemimentByCategory({Allentertainment, categories}) {
	return(
		<React.Fragment>
      		<MainHeader title="Hulu Media : Entertemiment" />
      		<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-32">
				<div className='w-full h-full flex flex-col lg:flex-row'>
		        	<ETSidebar categories={categories} />
		        	<Content entertainments={Allentertainment} />
		        </div> 
			</section>
      	</React.Fragment>

	)
}