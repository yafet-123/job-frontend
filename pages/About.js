import {AboutUsHero} from '../components/AboutUs/AboutUsHero'
import { AboutUsDetail } from '../components/AboutUs/AboutUsDetail';
import { FollowingTheDream } from '../components/AboutUs/FollowingTheDream';
import { OurMission } from '../components/AboutUs/OurMission';
import { OurVision } from '../components/AboutUs/OurVision';
import { MainHeader } from '../components/MainHeader';
import { HtmlIntroduction } from "../components/HTML/HtmlIntroduction"
import React from 'react'
export default function About() {
  return (
    <React.Fragment>
      <MainHeader title="Hulu Media : About" />
      <div className="flex flex-col">
        <AboutUsHero />
        <AboutUsDetail />
      </div>
    </React.Fragment>
  );
}
