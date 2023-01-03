import Image from 'next/image';
import AboutUsImage from '../public/images/AboutUsImage.jpg';

export const AboutUsHero = () => {
  return (
    <section className="relative">
      <div className="w-full h-[517px] bg-green-400 ">
        <Image
          src='../public/images/AboutUsImage.jpg'
          className="w-full h-[517px] object-cover lg:object-cover brightness-75"
          priority
          alt="AboutUs"
        />
        
        <div className="absolute top-32 flex flex-col justify-between left-0 right-0 m-auto w-full lg:w-[40%]">
          <h1 className="text-center text-3xl lg:text-5xl font-sans leading-10 font-bold text-white hover:text-[#94BB3C] mb-10">
            Hello
          </h1>
          <p className="mx-5 text-center text-xl md:text-2xl lg:text-3xl font-sans leading-10 font-bold text-white hover:text-[#94BB3C] mb-10">
            We organize the best Ethiopian premium tours covering historical
            routes, mountain trekking and adventure expeditions to remote areas,
            bird and wildlife watching, as well as family-friendly tours
          </p>
        </div>
      </div>
    </section>
  );
};
