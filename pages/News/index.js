import React, {useState,useEffect} from "react";
import { MainHeader } from '../../components/common/MainHeader';
import { AllNews } from '../../components/News/AllNews';
import { SlideNews } from '../../components/News/SlideNews';
 
// pages/index.js
import pool from '../../db';

export async function getServerSideProps(context) {
  const newsQuery = `
    SELECT 
      n.*, 
      u."UserName",
      json_agg(
        json_build_object(
          'category_id', nc."category_id",
          'CategoryName', nc."CategoryName"
        )
      ) AS "NewsCategories"
    FROM "News" n
    LEFT JOIN "User" u ON n."user_id" = u."user_id"
    LEFT JOIN "NewsCategoryRelationship" ncr ON n."news_id" = ncr."news_id"
    LEFT JOIN "NewsCategory" nc ON ncr."category_id" = nc."category_id"
    GROUP BY n."news_id", u."UserName"
    ORDER BY n."ModifiedDate" DESC
  `;

  try {
    const client = await pool.connect();

    const newsResult = await client.query(newsQuery);
    
    const news = newsResult.rows;

    const allnews = news.map(data => ({
      news_id: data.news_id,
      Header: data.Header,
      image: data.Image,
      view: data.view,
      ShortDescription: data.ShortDescription,
      userName: data.UserName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      Category: data.NewsCategories,
    }));

    client.release();

    return {
      props: {
        allnews: JSON.parse(JSON.stringify(allnews)),
      },
    };
  } catch (err) {
    console.error('Database Query Error:', err);
    return {
      props: {
        allnews: [],
      },
    };
  }
}

export default function News({allnews}) {
  const [image , setimage] = useState() 
  const [quotes, setquotes] = useState("")

  return (
    <React.Fragment>
      <MainHeader title="Hulu Media : News" image={image} quotes="shbdckh ksjnd" />
      <section className="w-full h-full bg-[#e6e6e6] dark:bg-[#02201D]  px-0 lg:px-32">
        <div className="max-w-7xl mx-auto flex flex-col py-32 px-2 lg:!px-3">
          <AllNews allnews={allnews} setimage={setimage} setquotes={setquotes}/>
        </div>
      </section>
    </React.Fragment>
  );
}
