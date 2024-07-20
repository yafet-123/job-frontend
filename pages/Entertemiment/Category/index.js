import React from "react";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import Image from 'next/image'
import { AiOutlineClockCircle } from "react-icons/ai";
import { useRouter } from 'next/router'
import axios from 'axios';
import pool from '../../../db.js'
import moment from 'moment';
import { MainHeader } from '../../../components/common/MainHeader';
import { ETSidebar } from '../../../components/Entertemiment/ETSidebar';
import { Content } from '../../../components/Entertemiment/Content';

export async function getServerSideProps(context) {
  const { params, req, res, query } = context;
  const category_id = query.category_id;
  console.log(category_id);

   const entertainmentsQuery = `
  SELECT e.entertainment_id, e."Header", e."Image", e."view", e."ShortDescription", e."CreatedDate", e."ModifiedDate", 
         u."UserName",
         json_agg(
           json_build_object(
             'category_id', ec.category_id,
             'CategoryName', ec."CategoryName"
           )
         ) AS "Categories"
  FROM "Entertainment" e
  INNER JOIN "User" u ON e.user_id = u.user_id
  INNER JOIN "EntertainmentCategoryRelationship" ecr ON e.entertainment_id = ecr.entertainment_id
  INNER JOIN "EntertainmentCategory" ec ON ecr.category_id = ec.category_id
  WHERE ec.category_id = $1
  GROUP BY e.entertainment_id, e."Header", e."Image", e."view", e."ShortDescription", e."CreatedDate", e."ModifiedDate", u."UserName"
  ORDER BY e.entertainment_id DESC
`;

  const categoriesQuery = `
    SELECT category_id, "CategoryName", "CreatedDate", "ModifiedDate" 
    FROM "EntertainmentCategory"
    ORDER BY category_id DESC
  `;

  try {
    const client = await pool.connect();

    const entertainmentsResult = await client.query(entertainmentsQuery, [Number(category_id)]);

    const Allentertainment = entertainmentsResult.rows.map(row => ({
      entertainment_id: row.entertainment_id,
      Header: row.Header,
      image: row.Image,
      view: row.view,
      ShortDescription: row.ShortDescription,
      userName: row.UserName,
      CreatedDate: row.CreatedDate,
      ModifiedDate: row.ModifiedDate,
      Category: row.Categories
    }));
    console.log(Allentertainment)
    const categoriesResult = await client.query(categoriesQuery);

    const categories = categoriesResult.rows.map(row => ({
      category_id: row.category_id,
      CategoryName: row.CategoryName,
      CreatedDate: row.CreatedDate,
      ModifiedDate: row.ModifiedDate
    }));
    console.log(categories)
    client.release();

    return {
      props: {
        Allentertainment: JSON.parse(JSON.stringify(Allentertainment)),
        categories: JSON.parse(JSON.stringify(categories))
      }
    };
  } catch (err) {
    console.error('Database Query Error:', err);
    return {
      props: {
        Allentertainment:[],
        categories: []
      },
    };
  }
}

export default function EntertemimentByCategory({Allentertainment, categories}) {
	return(
		<React.Fragment>
      		<MainHeader title="Hulu Media : Entertemiment" />
      		<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-32">
				<div className='w-full h-full flex flex-col lg:flex-row'>
		        	<ETSidebar categories={categories} />
		        	<Content entertainments={Allentertainment} />
		        </div> 
			</section>
      	</React.Fragment>

	)
}