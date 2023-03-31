import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import moment from 'moment';
import { MainHeader } from '../components/common/MainHeader';
import { ETSidebar } from '../components/Entertemiment/ETSidebar';
import { Content } from '../components/Entertemiment/Content';
import { prisma } from '../util/db.server.js'

export async function getServerSideProps(context){
  const {params,req,res,query} = context
    const searchValue = query.searchValue
    console.log(searchValue)

    const searchData = await prisma.Entertainment.findMany({
      where: {
          Header: {
              contains: searchValue,
              mode: "insensitive",
          },
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

    const AllData = searchData.map((data)=>({
        entertainment_id:data.entertainment_id,
        Header:data.Header,
        link:data.link,
        CreatedDate:data.CreatedDate,
        ModifiedDate:data.ModifiedDate,
        Category:data.EntertainmentCategoryRelationship
    }))


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

    

    return{
      props:{
        AllData:JSON.parse(JSON.stringify(AllData)),
        categories:JSON.parse(JSON.stringify(categories))
      }
    }
}

export default function Search({categories, AllData}) {
  const router = useRouter();
  console.log(AllData)
  let error = "";
  if(!AllData.length){
    error = "There is no video"
  }
  console.log(error)
  return (
    <React.Fragment>
      <MainHeader title="AdvanceSearch" />
      <section className="flex flex-col w-full h-full bg-[#ddd0c8] dark:bg-slate-700 pt-32">
        <div className='w-full h-full flex flex-col lg:flex-row'>
          <ETSidebar categories={categories} />
          { error == "" ? 
            <Content entertainments={AllData} />
            :
            <h1 className="w-full pt-20 text-black dark:text-white text-2xl font-bold text-center italic">{error}</h1>
          }
        </div> 
      </section>
    </React.Fragment>
  );
}
