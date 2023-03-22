import {AboutUsHero} from '../components/AboutUs/AboutUsHero'
import { AboutUsDetail } from '../components/AboutUs/AboutUsDetail';
import { FollowingTheDream } from '../components/AboutUs/FollowingTheDream';
import { OurMission } from '../components/AboutUs/OurMission';
import { OurVision } from '../components/AboutUs/OurVision';
import { MainHeader } from '../components/MainHeader';
import { HtmlIntroduction } from "../components/HTML/HtmlIntroduction"
import React from 'react'
import { prisma } from '../util/db.server.js'

export async function getServerSideProps(){
  const jobs = await prisma.Job.count()

  const news = await prisma.News.count()

  const entertainments = await prisma.Entertainment.count()

  return{
    props:{
      jobs:JSON.parse(JSON.stringify(jobs)),
      news:JSON.parse(JSON.stringify(news)),
      entertainments:JSON.parse(JSON.stringify(entertainments)),
    }
  }
}

export default function About({jobs,news,entertainments}) {
  console.log(news)
  return (
    <React.Fragment>
      <MainHeader title="Hulu Media : About" />
      <div className="flex flex-col bg-[#e6e6e6] dark:bg-[#02201D]">
        <AboutUsHero />
        <FollowingTheDream jobcount={jobs} newCount={news} entertainmentcount={entertainments} />
      </div>
    </React.Fragment>
  );
}
