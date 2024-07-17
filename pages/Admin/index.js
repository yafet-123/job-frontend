import { VerticalNavbar } from "../../components/Admin/VerticalNavbar";
import { DashBoard } from "../../components/Admin/DashBoard";
import Profile  from "../../components/Admin/Profile";
import { useSession } from "next-auth/react";
import { useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { MainHeader } from '../../components/common/MainHeader';
import React from 'react'
import pool from "../../db.js"
import { getSession } from "next-auth/react";
import MyCalendar from '../../components/common/MyCalendar' 

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const serverdate = new Date();
  const userRole = session?.user?.role;
  if (userRole !== 'admin') {
    return {
      redirect: {
        destination: '/auth/error',
        permanent: false,
      },
    };
  }

  const adminQuery = `
    SELECT 
      user_id, "firstName", "lastName", age, "UserName", email 
    FROM "User" 
    WHERE user_id = $1
  `;

  const categoriesQuery = `
    SELECT 
      c.*, 
      u."UserName" AS "UserName" 
    FROM "Category" c
    LEFT JOIN "User" u ON c.user_id = u.user_id
    ORDER BY c.category_id ASC
  `;

  const jobsCountQuery = `SELECT COUNT(*) FROM "Job"`;

  const newsCountQuery = `SELECT COUNT(*) FROM "News"`;

  const entertainmentsCountQuery = `SELECT COUNT(*) FROM "Entertainment"`;

  const groupByQuery = `
    SELECT 
      user_id, COUNT(news_id) AS news_count 
    FROM "News" 
    GROUP BY user_id
  `;

  try {
    const client = await pool.connect();

    const [adminResult, categoriesResult, jobsCountResult, newsCountResult, entertainmentsCountResult, groupByResult] = await Promise.all([
      client.query(adminQuery, [Number(session.user.user_id)]),
      client.query(categoriesQuery),
      client.query(jobsCountQuery),
      client.query(newsCountQuery),
      client.query(entertainmentsCountQuery),
      client.query(groupByQuery)
    ]);

    const admin = adminResult.rows[0];
    console.log('Admin Result:', admin); // Log the admin query result

    const admins = {
      user_id: admin.user_id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      age: admin.age,
      UserName: admin.UserName,
      email: admin.email
    };

    const categories = categoriesResult.rows.map((data) => ({
      category_id: data.category_id,
      CategoryName: data.CategoryName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      userName: data.UserName
    }));

    const jobs = parseInt(jobsCountResult.rows[0].count, 10);
    const news = parseInt(newsCountResult.rows[0].count, 10);
    const entertainments = parseInt(entertainmentsCountResult.rows[0].count, 10);

    const groupBy = groupByResult.rows;

    console.log(groupBy);

    client.release();

    return {
      props: {
        categorie: JSON.parse(JSON.stringify(categories)),
        jobs: JSON.parse(JSON.stringify(jobs)),
        news: JSON.parse(JSON.stringify(news)),
        entertainments: JSON.parse(JSON.stringify(entertainments)),
        admins,
      },
    };
  } catch (err) {
    console.error('Database Query Error:', err);
    return {
      props: {
        categorie: [],
        jobs: 0,
        news: 0,
        entertainments: 0,
        admins: null,
      },
    };
  }
}
export default function Admin({serverdate,categories,jobs,news,entertainments,admins}){
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
  console.log(admins)
  return (
    <React.Fragment>
      <MainHeader title="Hulu Media : Admin" />
      <div className="flex bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="w-full flex flex-col justify-between mx-1 lg:mx-3 lg:mx-10 mt-20">
          <div className="flex flex-row justify-between items-center">
            <Profile admins={admins} />
            <MyCalendar serverdate={serverdate} />
          </div>
          <DashBoard categories={categories} />
        </div>
      </div>
    </React.Fragment>
  );

}