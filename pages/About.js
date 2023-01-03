import {AboutUsHero} from '../components/AboutUsHero'
import { AboutUsDetail } from '../components/AboutUsDetail';

export default function About() {
  return (
    <div className="flex flex-col">
      <AboutUsHero />
      <AboutUsDetail />
    </div>
  );
}
