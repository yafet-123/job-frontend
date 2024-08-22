import React from "react";
import { useState,useEffect, useContext} from 'react'
import { AddAiSearch } from "../../../components/Admin/AiSearch/AddAiSearch";
import { DisplayAiSearch } from "../../../components/Admin/AiSearch/DisplayAiSearch";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { getSession } from 'next-auth/react';
import db from '../../../db.js'; // Adjust the path to your PostgreSQL connection pool

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userRole = await session?.user?.role;
  if (userRole !== 'admin') {
    return {
      redirect: {
        destination: '/auth/error', // Redirect to the error page for unauthorized access
        permanent: false,
      },
    };
  }

  try {
    const detailsQuery = `
      SELECT d.detail_id, d."Header", d."description", d."like", d."link", d."service", d."createdAt", d."updatedAt",
             u."UserName",
             ac.category_id, ac."CategoryName"
      FROM "Detail" d
      LEFT JOIN "User" u ON d.user_id = u.user_id
      LEFT JOIN "DetailCategory" dc ON d.detail_id = dc.detail_id
      LEFT JOIN "AiCategory" ac ON dc.category_id = ac.category_id
      ORDER BY d."updatedAt" DESC;
    `;

    const categoriesQuery = `
      SELECT ac.category_id, ac."CategoryName", ac."createdAt", ac."updatedAt", u."UserName"
      FROM "AiCategory" ac
      LEFT JOIN "User" u ON ac.user_id = u.user_id
      ORDER BY ac.category_id ASC;
    `;

    const detailsResult = await db.query(detailsQuery);
    const categoriesResult = await db.query(categoriesQuery);

    const details = detailsResult.reduce((acc, row) => {
      const detail = acc.find(d => d.detail_id === row.detail_id);
      const category = {
        category_id: row.category_id,
        CategoryName: row.CategoryName
      };

      if (detail) {
        detail.Category.push(category);
      } else {
        acc.push({
          detail_id: row.detail_id,
          Header: row.Header,
          description: row.description,
          like: row.like,
          link: row.link,
          service: row.service,
          userName: row.UserName,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
          Category: row.category_id ? [category] : []
        });
      }

      return acc;
    }, []);

    const allCategories = categoriesResult.map(row => ({
      category_id: row.category_id,
      CategoryName: row.CategoryName,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      userName: row.UserName
    }));

    return {
      props: {
        categories: JSON.parse(JSON.stringify(allCategories)),
        allaiserachdata: JSON.parse(JSON.stringify(details)),
      },
    };
  } catch (err) {
    console.error('Error fetching data:', err);
    return {
      props: {
        categories: [],
        allaiserachdata: [],
      },
    };
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
