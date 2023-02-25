import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../util/db.server.js'
import { AddCategory } from "../../components/Admin/Category/AddCategory";
import {DisplayCategory} from "../../components/Admin/Category/DisplayCategory";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../components/MainHeader';
export async function getServerSideProps(){
  const categories = await prisma.Category.findMany({
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

export default function Category({categorie}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      	<MainHeader title="Category Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#d1cbc7] dark:bg-slate-700 pt-28">
    				<div className='w-full h-full flex flex-col lg:flex-row'>
    		      <VerticalNavbar data={data} />
    		      <div className="w-full">
            		<AddCategory />
            		<DisplayCategory categories={categorie} />
            	</div>
    		    </div> 
  			  </section>
      	</React.Fragment>
        
    );
}
