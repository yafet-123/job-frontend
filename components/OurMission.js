import Image from 'next/future/image';
import AboutUsHeroImage from '../public/images/aboutBackground.jpg';

export const OurMission = () => {
  return (
    <section className="h-full lg:h-[678px] w-full bg-[#94BB3C] my-20">
      <div className="mx-5 lg:mx-20 grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 lg:mt-52">
        <div className="w-full h-[300px] lg:h-[548px] bg-[#165248]">
          <Image
            src={AboutUsHeroImage}
            className="w-full h-full lg:h-[548px] object-cover box-border pl-3 pb-3"
            priority
            alt="Navbar"
          />
        </div>
        <div className="flex flex-col lg:ml-20">
          <h1 className="w-full text-center lg:text-left text-4xl lg:text-5xl font-sans  font-bold text-white hover:text-black mb-10">
            OUR MISSION
          </h1>
          <p className="w-full lg:w-2/4 text-center lg:text-left text-xl lg:text-2xl font-sans leading-10 font-bold text-white hover:text-black pb-5">
            Our mission is to provide the ultimate travel planning experience
            while becoming a one-stop shop for every travel service available in
            the industry.
          </p>
        </div>
      </div>
    </section>
  );
};
