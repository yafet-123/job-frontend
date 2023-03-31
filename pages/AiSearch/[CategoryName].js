import {useEffect,useState } from 'react'
import { prisma } from '../../util/db.server.js'

export async function getServerSideProps(context) {
	const {params,req,res,query} = context
	const id = query.category_id
	
	const AiGroupdata = await prisma.Detail.findMany({
	    where:{
	      category_id: Number(id),
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
	}))

  	return {
    	props: {
	    	AllAiData,
	    }, // will be passed to the page component as props
	}
}


export default function AiCategoryDisplay({AllAiData}){
	return(
		<div>
		kf
		</div>
	)	
}
