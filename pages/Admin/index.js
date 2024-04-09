import { VerticalNavbar } from "../../components/Admin/VerticalNavbar";
import { DashBoard } from "../../components/Admin/DashBoard";
import Profile  from "../../components/Admin/Profile";
import { useSession } from "next-auth/react";
import { useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { MainHeader } from '../../components/common/MainHeader';
import React from 'react'
import { prisma } from '../../util/db.server.js'
import { getSession } from "next-auth/react";

export async function getServerSideProps(context){
  const session = await getSession(context);
  const userRole = await session?.user?.role
  if (userRole !== 'admin') {
    return {
      redirect: {
        destination: '/auth/error', // Redirect to the error page for unauthorized access
        permanent: false,
      },
    };
  }

  const admin = await prisma.User.findUnique({
    where:{ user_id: Number(session.user.user_id) },
  });
  
  const admins = {
    user_id: admin.user_id,
    firstName: admin.firstName,
    lastName: admin.lastName,
    age: admin.age,
    UserName: admin.UserName,
    email: admin.email
  };

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
      admins
    }
  }
}

export default function Admin({categories,jobs,news,entertainments,admins}){
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
        <MainHeader title="Hulu Media : Admin" />
        <div className="flex bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
          <VerticalNavbar onChange={handleChange} data={data} />
          <div className="w-full grid grid-cols-1 lg:grid-cols-2">
            <Profile admins={admins} />
            <DashBoard categories={categories} />
          </div>
        </div>
      </React.Fragment>
  );

}

