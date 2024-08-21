import React, {useState,useEffect} from "react";
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
import { MainHeader } from '../../components/common/MainHeader';
import { ETSidebar } from '../../components/Entertemiment/ETSidebar';
import { Content } from '../../components/Entertemiment/Content';
 
// pages/index.js
import db from '../../db';

export async function getServerSideProps(context) {
  const entertainmentCategoriesQuery = `
    SELECT * FROM "EntertainmentCategory"
    ORDER BY "category_id" DESC
  `;

  const entertainmentsQuery = `
    SELECT 
      e.*, 
      u."UserName",
      json_agg(
        json_build_object(
          'category_id', ec."category_id",
          'CategoryName', ec."CategoryName"
        )
      ) AS "EntertainmentCategories"
    FROM "Entertainment" e
    LEFT JOIN "User" u ON e."user_id" = u."user_id"
    LEFT JOIN "EntertainmentCategoryRelationship" ecr ON e."entertainment_id" = ecr."entertainment_id"
    LEFT JOIN "EntertainmentCategory" ec ON ecr."category_id" = ec."category_id"
    GROUP BY e."entertainment_id", u."UserName"
    ORDER BY e."entertainment_id" DESC
  `;

  try {

    const entertainmentCategoriesResult = await db.query(entertainmentCategoriesQuery);
    const entertainmentsResult = await db.query(entertainmentsQuery);

    const categories = entertainmentCategoriesResult.map(data => ({
      category_id: data.category_id,
      CategoryName: data.CategoryName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
    }));

    const entertainmentsData = entertainmentsResult.map(data => ({
      entertainment_id: data.entertainment_id,
      Header: data.Header,
      image: data.Image,
      view: data.view,
      ShortDescription: data.ShortDescription,
      Description: data.Description,
      userName: data.UserName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      Category: data.EntertainmentCategories,
    }));

    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
        entertainments: JSON.parse(JSON.stringify(entertainmentsData)),
      },
    };
  } catch (err) {
    console.error('Database Query Error:', err);
    return {
      props: {
        categories: [],
        entertainments: [],
      },
    };
  }
}



export default function Entertemiment({categories,entertainments}){
	return(
		<React.Fragment>
      <MainHeader title="Hulu Media : Entertemiment" />
			<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-32">
				<div className='w-full h-full flex flex-col lg:flex-row'>
		      <ETSidebar categories={categories} />
		      <Content entertainments={entertainments} />
		    </div> 
			</section>
		</React.Fragment>
	)
}

