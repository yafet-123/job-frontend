import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import moment from 'moment';
import { MainHeader } from '../../../components/common/MainHeader';
import { ETSidebar } from '../../../components/Entertemiment/ETSidebar';
import { Content } from '../../../components/Entertemiment/Content';
import pool from '../../../db.js'


export async function getServerSideProps(context) {
  const { params, req, res, query } = context;
  const searchValue = query.searchValue;

  const searchQuery = `
    SELECT e.entertainment_id, e.Header, e.link, e.CreatedDate, e.ModifiedDate,
           u.UserName,
           ec.category_id, ec.CategoryName
    FROM "Entertainment" e
    INNER JOIN "Users" u ON e.user_id = u.user_id
    LEFT JOIN "EntertainmentCategoryRelationship" ecr ON e.entertainment_id = ecr.entertainment_id
    LEFT JOIN "EntertainmentCategory" ec ON ecr.category_id = ec.category_id
    WHERE LOWER(e.Header) LIKE LOWER($1)
  `;

  const categoriesQuery = `
    SELECT category_id, CategoryName, CreatedDate, ModifiedDate
    FROM "EntertainmentCategory"
    ORDER BY category_id ASC
  `;
  try {
    const client = await pool.connect();
    const searchValues = [`%${searchValue}%`];
    const searchDataResult = await client.query(searchQuery, searchValues);

    const AllData = searchDataResult.rows.map(row => ({
      entertainment_id: row.entertainment_id,
      Header: row.header,
      link: row.link,
      CreatedDate: row.createddate,
      ModifiedDate: row.modifieddate,
      Category: {
        category_id: row.category_id,
        CategoryName: row.categoryname,
      },
    }));
  
    const categoriesResult = await client.query(categoriesQuery);

    const categories = categoriesResult.rows.map(row => ({
      category_id: row.category_id,
      CategoryName: row.categoryname,
      CreatedDate: row.createddate,
      ModifiedDate: row.modifieddate,
    }));

    client.release();

    return {
      props: {
        AllData: JSON.parse(JSON.stringify(AllData)),
        categories: JSON.parse(JSON.stringify(categories)),
      }
    };
  } catch (err) {
    console.error('Database Query Error:', err);
    return {
      props: {
        AllData:[],
        categories:[]
      },
    };
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
      <MainHeader title="Hulu Media : AdvanceSearch" />
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
