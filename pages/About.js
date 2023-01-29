import {AboutUsHero} from '../components/AboutUsHero'
import { AboutUsDetail } from '../components/AboutUsDetail';
import { FollowingTheDream } from '../components/FollowingTheDream';
import { OurMission } from '../components/OurMission';
import { OurVision } from '../components/OurVision';
import { MainHeader } from '../components/MainHeader';

export default function About() {
  return (
    <React.Fragment>
      <MainHeader title="About" />
      <div className="flex flex-col">
        
        <AboutUsHero />
        <AboutUsDetail />
      </div>
    </React.Fragment>
  );
}
