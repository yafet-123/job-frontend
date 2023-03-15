import Image from 'next/future/image';
import AboutUsImage from '../../public/images/AboutUsImage.jpg';

export const AboutUsHero = () => {
  return (
    <div
      className={`flex justify-center items-center bg-fixed h-[600px] bg-cover top-10 ${AboutUsImage}`}
    >
      <div className="flex flex-col gap-8 font-bold text-center md:p-12">
        <div>
          <h1 className="text-white text-3xl md:text-6xl m-4">Different People - One Mission</h1>
        </div>
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
