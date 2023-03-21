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

  const groupBy = await prisma.News.groupBy({
    by: ['user_id'],
    _count: {
      news_id: true,
    },
  })

  console.log(groupBy)

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

export default function Admin({categories,jobs,news,entertainments}){
  const [selected , setselected] = useState("dashboard")
  const { status, data } = useSession();
  const router = useRouter();
  const file = []

  const [barChartData, setbarChartData] = useState({
    labels: file.map((data) => data.id),
    datasets: [
      {
        label: "Jobs",
        data: file.map((data) => data.Number),
        backgroundColor: [
          "#00008b",
          "#ffc0cb",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  function handleChange(newValue) {
      setselected(newValue);
  }
  // if (status === "authenticated")

    return (
      <React.Fragment>
        <MainHeader title="Admin" />
        <div className="flex bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
          <VerticalNavbar onChange={handleChange} data={data} />
          <div className="w-full">
            <DashBoard categories={categories} />
          </div>
        </div>
      </React.Fragment>
  );

}

