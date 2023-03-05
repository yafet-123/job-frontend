import {AboutUsHero} from '../components/AboutUsHero'
import { AboutUsDetail } from '../components/AboutUsDetail';
import { FollowingTheDream } from '../components/FollowingTheDream';
import { OurMission } from '../components/OurMission';
import { OurVision } from '../components/OurVision';
import { MainHeader } from '../components/MainHeader';
import { HtmlHome } from "../components/HTML/HtmlHome"
import React from 'react'
export default function About() {
  return (
    <React.Fragment>
      <MainHeader title="About" />
      <div className="flex flex-col">
        <HtmlHome />
        <AboutUsHero />
        <AboutUsDetail />
      </div>
    </React.Fragment>
  );
}
