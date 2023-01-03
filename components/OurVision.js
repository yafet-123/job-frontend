import Image from 'next/future/image';
import AboutUsHeroImageOne from '../public/images/AboutUsImage.jpg';

export const OurVision =  () => {
  return (
    <section className="h-full lg:h-[678px] w-full my-20">
      <div className="px-5 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 bg-[#165248]">
        <div className="flex flex-col mt-10 lg:mt-52">
          <h1 className="w-full text-center lg:text-left text-4xl lg:text-5xl font-sans  font-bold text-white hover:text-black mb-10">
            OUR VISION
          </h1>
          <p className="w-full lg:w-3/4 text-center lg:text-left text-xl lg:text-2xl font-sans leading-10 font-bold text-white hover:text-black pb-5">
            We are proud to offer excellent quality and value for money in our
            tours, which give you the chance to experience your chosen
            destination in an authentic and exciting way.
          </p>
        </div>

        <div className="w-full h-[300px] lg:h-[548px] bg-[#94BB3C] lg:-mt-24 mb-10">
          <Image
            src={AboutUsHeroImageOne}
            className="w-full h-full lg:h-[548px] object-cover box-border pl-3 pb-3"
            priority
            alt="Navbar"
          />
        </div>
      </div>
      <div className="text-center mx-16">
        <button className="my-10 w-full lg:w-96 font-sans font-extrabold text-3xl py-5 bg-[#94BB3C] hover:bg-white text-white hover:text-[#94BB3C] border-8 border-[#165248] rounded-md">
          Get In Touch
        </button>
      </div>
    </section>
  );
};
