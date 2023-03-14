import Image from 'next/future/image';
import Vision from '../public/images/aboutBackground.jpg';

export const OurVision =  () => {
  return (
    <section className="my-10 lg:my-20">
      <div className="flex md:flex-row flex-col text-center md:text-left md:h-[500px] bg-[#165248] gap-10 lg:gap-36 md:justify-center justify-center md:mt-32 lg:my-8 py-10 lg:py-0">
        <div className="flex flex-col gap-4 justify-center md:justify-start md:my-8 md:w-[500px] my-5 mx-4 text-white  md:text-left">
          <h1 className="md:text-4xl text-3xl font-bold text-white justify-center">
            OUR VISION
          </h1>
          <h3 className="md:text-2xl text-xl font-normal text-white">
            We are proud to offer excellent quality and value for money in our
            tours, which give you the chance to experience your chosen
            destination in an authentic and exciting way.
          </h3>
        </div>

        <div className="w-full lg:w-[500px] h-[300px] lg:h-[500px] lg:bg-[#94BB3C] lg:-mt-20 mb-1 px-5 lg:px-0">
          <Image
            src={Vision}
            className="w-full lg:w-[500px] h-full lg:h-[500px] object-cover box-border lg:pl-3 lg:pb-3 hover:scale-110 transition duration-500"
            priority
            alt="Navbar"
          />
        </div>
      </div>

      <div className="text-center mx-16">
        <button className="my-10 w-full lg:w-96 font-sans font-extrabold text-xl lg:text-3xl py-5 bg-[#94BB3C] hover:bg-white text-white hover:text-[#94BB3C] border-8 border-[#165248] rounded-md">
          Get In Touch
        </button>
      </div>
    </section>
  );
};
