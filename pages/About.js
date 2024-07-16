import {AboutUsHero} from '../components/AboutUs/AboutUsHero'
import { AboutUsDetail } from '../components/AboutUs/AboutUsDetail';
import { FollowingTheDream } from '../components/AboutUs/FollowingTheDream';
import { OurMission } from '../components/AboutUs/OurMission';
import { OurVision } from '../components/AboutUs/OurVision';
import { MainHeader } from '../components/common/MainHeader';
import { HtmlIntroduction } from "../components/HTML/HtmlIntroduction"
import React from 'react'

import pool from '../db'
        // <FollowingTheDream jobcount={jobs} newCount={news} entertainmentcount={entertainments} />
export async function getServerSideProps() {
  let results = [];
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT * FROM "User"'); // Ensure table name is case-sensitive
    console.log('Query Result:', res); // Log entire response
    results = res.rows;
    client.release();
  } catch (err) {
    console.error('Database Query Error:', err); // Improved error logging
  }
  console.log('Results:', results); // Log results to ensure data is correct
  return {
    props: {
      data: "results",
    },
  };
}

export default function About() {
  return (
    <React.Fragment>
      <MainHeader title="Hulu Media : About" />
      <div className="flex flex-col bg-[#e6e6e6] dark:bg-[#02201D]">
        <AboutUsHero />

      </div>
    </React.Fragment>
  );
}
