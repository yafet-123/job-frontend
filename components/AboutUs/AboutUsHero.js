import Image from 'next/future/image';
import AboutUsImage from '../../public/images/AboutUsImage.jpg';

export const AboutUsHero = () => {
  return (
    <section className="w-full h-[450px] bg-green-400">
      
        <Image
          src={AboutUsImage}
          className="w-full h-[450px] object-cover lg:object-cover brightness-75"
          priority
          alt="AboutUs"
        />
   
    </section>
  );
};
