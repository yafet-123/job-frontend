import React from "react";
import { useState,useEffect, useContext} from 'react'
import { AddAiSearch } from "../../components/Admin/AiSearch/AddAiSearch";
import { DisplayAiSearch } from "../../components/Admin/AiSearch/DisplayAiSearch";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../components/common/MainHeader';
import { prisma } from '../../util/db.server.js'

export async function getServerSideProps(){
  const details = await prisma.Detail.findMany({
    orderBy : {
      updatedAt:'desc'
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
  });

  const allaiserachdata = details.map((data)=>({
    detail_id:data.detail_id,
    Header:data.Header,
    description:data.description,
    like:data.like,
    link : data.link,
    service:data.service,
    userName:data.User.UserName,
    createdAt:data.createdAt,
    updatedAt:data.updatedAt,
    Category:data.DetailCategory
  }))

  const categories = await prisma.AiCategory.findMany({
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

  const AllAiSearchcategories = categories.map((data)=>({
      category_id:data.category_id,
      CategoryName:data.CategoryName,
      createdAt:data.createdAt,
      updatedAt:data.updatedAt,
      userName:data.User.UserName
  }))

  return{
    props:{
      categories:JSON.parse(JSON.stringify(AllAiSearchcategories)),
      allaiserachdata:JSON.parse(JSON.stringify(allaiserachdata)),
    }
  }
}

export default function AiSearch({categories, allaiserachdata}) {
    const { status, data } = useSession();
    return (
        <React.Fragment>
          <MainHeader title="Ai Search Dashboard" />
          <section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
            <div className='w-full h-full flex flex-row'>
                <VerticalNavbar data={data} />
                <div className="w-full">
                    <AddAiSearch categories={categories} />
                    <DisplayAiSearch categories={categories} allaiserachdata={allaiserachdata} />
                  </div>
            </div> 
        </section>
        </React.Fragment>
        
    );
}
