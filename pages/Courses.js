import React from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { prisma } from '../util/db.server.js'
import { MainHeader } from '../components/MainHeader';

export async function getServerSideProps(){
  const categories = await prisma.CourseCategory.findMany({
    orderBy: {
      category_id:"asc"
    },
    include:{
      User:{
          select:{
              UserName:true
          }
      }
    }
  })

  const Allcategories = categories.map((data)=>({
      category_id:data.category_id,
      CategoryName:data.CategoryName,
      ShortDescription:data.ShortDescription,
      color:data.color,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      userName:data.User.UserName
  }))

  return{
    props:{
      categorie:JSON.parse(JSON.stringify(Allcategories)),
    }
  }
}

export default function Courses({categorie}) {
	const router = useRouter()
  return (
  	<React.Fragment>
      <MainHeader title="Courses" />
	    <section className="flex flex-col w-full h-full px-0 md:px-40 py-32 bg-[#ddd0c8] dark:bg-slate-700">
	    	<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-20">
	    		{ categorie.map((data,index)=>(
		    		<div 
		    			className={`flex flex-col justify-center items-center mb-10 mx-2 p-10 rounded-xl ${data.color}`} 
		    			key ={index}
		    		>
		    			<h1 className="text-black text-5xl capitalize font-bold mb-5">{data.CategoryName}</h1>
		    			<p className="text-black text-xl font-normal mb-5">{data.ShortDescription}</p>
		    			<button 
		    				onClick = {()=>{
	                router.push({
	                  pathname:"/Course",
	                  query:{CategoryName:data.CategoryName, courseId:1}
	                })
	              }}
		    				className="py-3 border rounded-3xl w-52 text-xl font-bold bg-white text-black"
		    			>
		    				Learn {data.CategoryName}
		    			</button>
		    		</div>
	    		))}
	    	</div>
	    </section>
	  </React.Fragment>
  );
}
