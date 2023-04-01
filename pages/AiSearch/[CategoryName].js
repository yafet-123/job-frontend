import {useEffect,useState } from 'react'
import { prisma } from '../../util/db.server.js'
import React from "react";
import { MainHeader } from '../../components/common/MainHeader';
import { Hero } from '../../components/AiSearch/Hero';
import { SearchBar } from '../../components/AiSearch/SearchBar';
import { AllData } from '../../components/AiSearch/AllData';


export async function getServerSideProps(context) {
	const {params,req,res,query} = context
	const id = query.category_id
	
	const AiGroupdata = await prisma.Detail.findMany({
	    where:{
	      DetailCategory:{
  			some: {
	  			AiCategory:{
	  				category_id: Number(id)
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
	      DetailCategory:{
	        include:{
	          AiCategory:{
	            select:{
	              category_id:true,
	              CategoryName:true
	            }
	          }
	        }
	      },
	    }
  	})

  	const AllAiData = AiGroupdata.map((data)=>({
		detail_id:data.detail_id,
		Header:data.Header,
		description:data.description,
		service:data.service,
		link:data.link
	}))

  	return {
    	props: {
	    	AllAiData,
	    }, // will be passed to the page component as props
	}
}


export default function AiCategoryDisplay({AllAiData}){
	console.log(AllAiData)
	return(
		<React.Fragment>
      		<MainHeader title="Hulu Media : AiSearch Category" />
      		<section className="w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-32">
      			<Hero 
          			title="Search AI Tools" 
          			subtitle="Search AI tools for whatever your needs. Simply type in a function like 'music' or 'image editing'. We aim to build the most complete list of AI tools on the market. Stay tuned for more features!" 
		        />
		        <SearchBar />
		        <AllData AllAiData={AllAiData}/>
			</section>
		</React.Fragment>
	)	
}
