import React from "react";
import { useState,useEffect, useContext} from 'react'
import { AddBlogs } from "../../../components/Admin/Blog/AddBlogs";
import { DisplayBlogs } from "../../../components/Admin/Blog/DisplayBlogs";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { prisma } from '../../../util/db.server.js'

export async function getServerSideProps(){
  const blogs = await prisma.Blogs.findMany({
    orderBy : {
      ModifiedDate:'desc'
    },
    include:{
      User:{
        select:{
          UserName:true
        }
      },
      BlogsCategoryRelationship:{
        include:{
          BlogsCategory:{
            select:{
              category_id:true,
              CategoryName:true
            }
          }
        }
      },
    }
  });

  const allblogs = blogs.map((data)=>({
    blogs_id:data.blogs_id,
    Header:data.Header,
    image:data.Image,
    ShortDescription:data.ShortDescription,
    Description : data.Description,
    userName:data.User.UserName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate,
    Category:data.NewsCategoryRelationship
  }))

  const blogscategories = await prisma.BlogsCategory.findMany({
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

  const Allblogscategories = blogscategories.map((data)=>({
      category_id:data.category_id,
      CategoryName:data.CategoryName,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      userName:data.User.UserName
  }))

  return{
    props:{
      categories:JSON.parse(JSON.stringify(Allblogscategories)),
      blogs:JSON.parse(JSON.stringify(allblogs)),
    }
  }
}

export default function Blogs({categories, blogs}) {
    const { status, data } = useSession();
    return (
    	
        <React.Fragment>
          <MainHeader title="Blogs Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
    		    <div className='w-full h-full flex flex-row'>
    		        <VerticalNavbar data={data} />
    		        <div className="w-full">
            		    <AddBlogs categories={categories} />
                    <DisplayBlogs blogs={blogs} categories={categories} />
            	    </div>
    		    </div> 
  			</section>
      	</React.Fragment>
        
    );
}
