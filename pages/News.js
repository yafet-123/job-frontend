import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NewsTemplate } from "../data/NewsTemplate.js"
import { MainHeader } from '../components/MainHeader';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AboutUsImage from '../public/images/bgImage3.avif';

export default function News() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <React.Fragment>
      <MainHeader title="News" />
      <section className="flex flex-col w-full h-full bg-white dark:bg-slate-700 py-32 px-56">
        <h1 className="text-center text-xl lg:text-3xl">Lates News</h1>
        <Slider {...settings}>
          <div className="!flex flex-col lg:flex-row h-full pl-5">
              <Image
                src={AboutUsImage}
                width={1000}
                height={1000}
                className="border border-black rounded-xl w-full"
                alt="latest news image"
              />

              <div className="flex flex-col my-20 lg:mx-10">
                <h3 className="mb-5">
                  <span className="text-2xl font-bold text-black"> Category Name </span>
                  <span className="font-normal text-lg text-gray-600">
                     - Date of the post
                  </span>
                </h3>

                <h1 className="text-xl lg:text-4xl font-extrabold text-black tracking-wide leading-snug lg:w-3/4">
                  Your most unhappy customers are your greater source of learning.
                </h1>

                <p className="mt-5 leading-loose font-sans text-lg font-medium tracking-wide text-left text-slate-700">
                  So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my 
                  way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of 
                  all living things but I tell you Jerry at that moment, I was a marine biologist.
                </p>
              </div>
          </div>
        </Slider>
      </section>
    </React.Fragment>
  );
}
