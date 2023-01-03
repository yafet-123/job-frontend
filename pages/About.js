import {AboutUsHero} from '../components/AboutUsHero'
import { AboutUsDetail } from '../components/AboutUsDetail';
import { FollowingTheDream } from '../components/FollowingTheDream';
import { OurMission } from '../components/OurMission';
import { OurVision } from '../components/OurVision';

export default function About() {
  return (
    <div className="flex flex-col">
      <AboutUsHero />
      <AboutUsDetail />
      <FollowingTheDream />
      <OurMission />
      <OurVision />
    </div>
  );
}
