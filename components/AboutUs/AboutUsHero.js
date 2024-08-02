import Image from 'next/future/image';
import AboutUsImage from '../../public/images/bgImage1.avif';

export const AboutUsHero = () => {
  return (
    <div
      className={`flex justify-center items-center bg-fixed h-full bg-cover py-32 about-us-background`}
    >
      <div className="flex flex-col gap-8 font-bold text-center md:px-12 ">
        <div>
          <h1 className="text-white text-xl md:text-3xl ">
            {`Welcome to hulu media, your ultimate destination for job opportunities, educational courses, insightful blogs, 
            and engaging entertainment. Our mission is to bridge the gap between talent and opportunity, providing a platform that 
            empowers individuals and organizations alike. Whether you're a seasoned professional seeking new job prospects, eager 
            to enhance your skills through our curated courses, or looking to stay informed with our industry-leading blogs, we 
            have something for everyone. Additionally, our entertainment section offers a variety of content to help you relax 
            and unwind. At hulu media, we believe in the power of community and growth, ensuring that you have access to 
            the resources you need to succeed in today's dynamic world. Join us today and become a part of a community dedicated to 
            enriching lives and creating opportunities.`}
          </h1>
        </div>
      </div>
    </div>
  );
};
