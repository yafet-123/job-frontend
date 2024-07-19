import React,{useState,useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/router";
import pool from '../../../db.js'
import { DisplayIndvidualNews } from '../../../components/News/DisplayIndvidualNews';
import { DisplayLatestNews } from '../../../components/News/DisplayLatestNews';
import Head from 'next/head';

export async function getServerSideProps(context) {
  const { query: queryParams } = context;
  const id = queryParams.news_id;

  const updateViewQuery = `
    UPDATE "News"
    SET view = view + 1
    WHERE news_id = $1
  `;

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
    WHERE n."news_id" = $1
    GROUP BY n."news_id", u."UserName"
  `;

  const latestNewsQuery = `
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
    ORDER BY n."news_id" DESC
    LIMIT 6
  `;

  const categoryNewsQuery = `
    SELECT 
      ncr.*, 
      n.*, 
      u."UserName", 
      nc."category_id", 
      nc."CategoryName"
    FROM "NewsCategoryRelationship" ncr
    JOIN "News" n ON ncr."news_id" = n."news_id"
    JOIN "User" u ON n."user_id" = u."user_id"
    JOIN "NewsCategory" nc ON ncr."category_id" = nc."category_id"
    WHERE ncr."category_id" = ANY($1::int[])
  `;

  try {
    const client = await pool.connect();

    // Get the main news item
    const newsResult = await client.query(newsQuery, [Number(id)]);
    const news = newsResult.rows[0];
    
    const update = await client.query(updateViewQuery, [Number(id)]);

    const onedata = {
      news_id: news.news_id,
      Header: news.Header,
      Image: news.Image,
      ShortDescription: news.ShortDescription,
      Description: news.Description,
      userName: news.UserName,
      CreatedDate: news.CreatedDate,
      ModifiedDate: news.ModifiedDate,
      NewsCategories: news.NewsCategories,
    };

    const findCategory = news.NewsCategories.map(category => category.category_id);

    // Get related news items by category
    const categoryNewsResult = await client.query(categoryNewsQuery, [findCategory]);
    const categoryNews = categoryNewsResult.rows;

    const AllcategoryNews = categoryNews.map(data => ({
      ...data,
    }));

    const uniqueallcategoryNews = [...new Map(AllcategoryNews.map(v => [news.news_id, v])).values()];

    // Get latest news items
    const latestNewsResult = await client.query(latestNewsQuery);
    const latestNews = latestNewsResult.rows;
    console.log(onedata)
    const Alllatestnews = latestNews.map(data => ({
      news_id: data.news_id,
      Header: data.Header,
      image: data.Image,
      ShortDescription: data.ShortDescription,
      userName: data.UserName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      Category: data.NewsCategories,
    }));

    client.release();

    return {
      props: {
        news: JSON.parse(JSON.stringify(onedata)),
        Alllatestnews: JSON.parse(JSON.stringify(Alllatestnews)),
        AllcategoryNews: JSON.parse(JSON.stringify(uniqueallcategoryNews)),
      },
    };
  } catch (err) {
    console.error('Database Query Error:', err);
    return {
      props: {
        news: {},
        Alllatestnews: [],
        AllcategoryNews: [],
      },
    };
  }
}

export default function DisplayNews({ news,Alllatestnews, AllcategoryNews}) {
  const router = useRouter()
  console.log(news)
  const newsCategory = news.NewsCategories
  return (
  	<React.Fragment>
      <Head>
        <title>Hulu Media : Display News</title>
        <meta name="description" content="HuluNeger is one the most online recruitment provider in ethiopia, 
          The website advertises jobs across a wide range of job types by different employers, 
          inlcuding private, local, international, who are hiring in ethiopia." 
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo3.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/logo3.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo3.png" />

        <meta property="og:url" content={`https://job-frontend-main.vercel.app${router.asPath}`}/>
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="1233665570615472" />
        <meta property="og:title" content="Hulu Media : Display News"/>
        <meta name="twitter:card" content={news.ShortDescription} />
        <meta property="og:description" content={news.ShortDescription}/>
        <meta property="og:image" content={news.Image} />
        <meta property="og:image:secure_url" content={news.Image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="300" />
      </Head>
	    <section className="flex flex-col lg:flex-row w-full h-full px-1 lg:pl-80 lg:px-32 bg-[#e6e6e6] dark:bg-[#02201D] pt-32">
	      <DisplayIndvidualNews news={news} AllcategoryNews={AllcategoryNews} newsCategory={newsCategory} shareUrl={router.asPath} quotes={news.ShortDescription} />
        <DisplayLatestNews Alllatestnews={Alllatestnews} />          
	    </section>
	  </React.Fragment>
  );
}
