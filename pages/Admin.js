import { VerticalNavbar } from "../components/Admin/VerticalNavbar";
import { DashBoard } from "../components/Admin/DashBoard";
import { useSession } from "next-auth/react";
import { useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { MainHeader } from '../components/MainHeader';
import React from 'react'
import { prisma } from '../util/db.server.js'

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

  const jobs = await prisma.Job.count()

  const news = await prisma.News.count()

  const entertainments = await prisma.Entertainment.count()

  return{
    props:{
      categorie:JSON.parse(JSON.stringify(Allcategories)),
      jobs:JSON.parse(JSON.stringify(jobs)),
      news:JSON.parse(JSON.stringify(news)),
      entertainments:JSON.parse(JSON.stringify(entertainments)),
    }
  }
}

export default function Admin({categories}){
  const [selected , setselected] = useState("dashboard")
  const { status, data } = useSession();
  // console.log(jobCategory)
  const router = useRouter();
  // useEffect(() => {
  //   if (status === "unauthenticated") router.replace("/auth/signin");
  // }, [status]);


  function handleChange(newValue) {
      setselected(newValue);
  }
  // if (status === "authenticated")

    return (
      <React.Fragment>
        <MainHeader title="Admin" />
        <div className="flex bg-[#ddd0c8] dark:bg-slate-700 pt-10">
          <VerticalNavbar onChange={handleChange} data={data} />
          <div className="w-full">
            <DashBoard categories={categories} />
          </div>
        </div>
      </React.Fragment>
  );

}

