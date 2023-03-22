import Image from 'next/future/image';
import AboutUsImage from '../../public/images/bgImage1.avif';

export const AboutUsHero = () => {
  return (
    <div
      className={`flex justify-center items-center bg-fixed h-[400px] bg-cover top-10 about-us-background`}
    >
      <div className="flex flex-col gap-8 font-bold text-center md:p-12">
        <div>
          <h1 className="text-white text-xl md:text-3xl m-4">
            Ecotravel Ethiopia was founded to offer environmentally-friendly tours. 
            Our commitment is as reflected in our name offering tours with a softer footprint.
          </h1>
        </div>
      </div>
    </div>
  );
};
