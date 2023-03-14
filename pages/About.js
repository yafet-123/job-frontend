import {AboutUsHero} from '../components/AboutUsHero'
import { AboutUsDetail } from '../components/AbouUs/AboutUsDetail';
import { FollowingTheDream } from '../components/AbouUs/FollowingTheDream';
import { OurMission } from '../components/AbouUs/OurMission';
import { OurVision } from '../components/AbouUs/OurVision';
import { MainHeader } from '../components/MainHeader';
import { HtmlIntroduction } from "../components/HTML/HtmlIntroduction"
import React from 'react'
export default function About() {
  return (
    <React.Fragment>
      <MainHeader title="About" />
      <div className="flex flex-col">
        <HtmlIntroduction />
        <AboutUsHero />
        <AboutUsDetail />
      </div>
    </React.Fragment>
  );
}
