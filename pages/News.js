import React from "react";
import Image from "next/future/image";
import Link from "next/link";
import { NewsTemplate } from "../data/NewsTemplate.js"
import { MainHeader } from '../components/MainHeader';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AboutUsImage1 from '../public/images/bgImage1.avif';
import AboutUsImage2 from '../public/images/bgImage2.avif';
import AboutUsImage3 from '../public/images/bgImage3.avif';
import AboutUsImage4 from '../public/images/bgImage4.avif';

export default function News() {
  var settings = {
    dots: true,
    lazyLoad: true,
    fade: true,
    infinite: true,
    autoplay: true,
    // speed: 2000,
    // autoplaySpeed: 2000,
    // slidesToScroll: 1,
    autoplay: true
  };
  return (
    <React.Fragment>
      <MainHeader title="News" />
      <section className="w-full h-full bg-white dark:!bg-slate-700 py-32">
        <div className="max-w-7xl mx-auto flex flex-col">
          <h1 className="text-center text-3xl lg:text-7xl font-bold my-10 italic">Trending</h1>
          <Slider {...settings}>
            <div className="!flex flex-col lg:flex-row px-2 w-full h-full lg:h-96">
                <div className="w-full lg:w-1/2 h-52 lg:!h-96">
                  <Image
                    src={AboutUsImage1}
                    layout="raw" 
                    className="!bg-cover w-full !h-full border rounded-xl"
                    alt="latest news image"
                  />
                </div>

                <div className="w-full lg:w-3/4 flex flex-col lg:mx-10 lg:pl-5">
                  <h3 className="mb-5">
                    <span className="text-lg lg:text-2xl font-bold dark:text-white text-black"> Category Name </span>
                    <span className="font-normal text-md lg:text-lg dark:text-white text-gray-600">
                       - Date of the post
                    </span>
                  </h3>

                  <h1 className="text-xl lg:text-4xl font-extrabold dark:text-white text-black tracking-wide leading-snug lg:w-3/4">
                    Your most customers are your greater source of learning.
                  </h1>

                  <p className="mt-5 leading-loose font-sans text-sm lg:text-lg font-medium tracking-wide text-left dark:text-white text-slate-700">
                    {`So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my 
                    way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of 
                    all living things but I tell you Jerry at that moment, I was a marine biologist.`}
                  </p>
                </div>
            </div>

            <div className="!flex flex-col lg:flex-row px-2 w-full h-full lg:h-96">
                <div className="w-full lg:w-1/2 h-52 lg:!h-96">
                  <Image
                    src={AboutUsImage2}
                    layout="raw" 
                    className="!bg-cover w-full !h-full border rounded-xl"
                    alt="latest news image"
                  />
                </div>

                <div className="w-full lg:w-3/4 flex flex-col lg:mx-10 lg:pl-5">
                  <h3 className="mb-5">
                    <span className="text-lg lg:text-2xl font-bold dark:text-white text-black"> Category Name </span>
                    <span className="font-normal text-md lg:text-lg dark:text-white text-gray-600">
                       - Date of the post
                    </span>
                  </h3>

                  <h1 className="text-xl lg:text-4xl font-extrabold dark:text-white text-black tracking-wide leading-snug lg:w-3/4">
                    Your most customers are your greater source of.
                  </h1>

                  <p className="mt-5 leading-loose font-sans text-sm lg:text-lg font-medium tracking-wide text-left dark:text-white text-slate-700">
                    {`This next/image component uses browser native lazy loading, which may fallback to eager loading for older browsers before 
                    Safari 15.4. When using the blur-up placeholder, older browsers before Safari 12 will fallback to empty placeholder. When 
                    using styles with width/height of auto, it is possible to cause Layout Shift on older browsers before Safari 15 that don't 
                    preserve the aspect ratio. For more details, see this MDN video.`}
                  </p>
                </div>
            </div>

            <div className="!flex flex-col lg:flex-row px-2 w-full h-full lg:h-96">
                <div className="w-full lg:w-1/2 h-52 lg:!h-96">
                  <Image
                    src={AboutUsImage3}
                    layout="raw" 
                    className="!bg-cover w-full !h-full border rounded-xl"
                    alt="latest news image"
                  />
                </div>

                <div className="w-full lg:w-3/4 flex flex-col lg:mx-10 lg:pl-5">
                  <h3 className="mb-5">
                    <span className="text-lg lg:text-2xl font-bold dark:text-white text-black"> Category Name </span>
                    <span className="font-normal text-md lg:text-lg dark:text-white text-gray-600">
                       - Date of the post
                    </span>
                  </h3>

                  <h1 className="text-xl lg:text-4xl font-extrabold dark:text-white text-black tracking-wide leading-snug lg:w-3/4">
                    Your most customers are your greater source of learning.
                  </h1>

                  <p className="mt-5 leading-loose font-sans text-sm lg:text-lg font-medium tracking-wide text-left dark:text-white text-slate-700">
                    {`First, the value of sizes is used by the browser to determine which size of the image to download, from next/image's 
                    automatically-generated source set. When the browser chooses, it does not yet know the size of the image on the page, 
                    so it selects an image that is the same size or larger than the viewport. The sizes property allows you to tell the 
                    browser that the image will actually be smaller than full screen. If you don't specify a sizes value in an image with 
                    the fill property, a default value of 100vw (full screen width) is used.`}
                  </p>
                </div>
            </div>

            <div className="!flex flex-col lg:flex-row px-2 w-full h-full lg:h-96">
                <div className="w-full lg:w-1/2 h-52 lg:!h-96">
                  <Image
                    src={AboutUsImage4}
                    layout="raw" 
                    className="!bg-cover w-full !h-full border rounded-xl"
                    alt="latest news image"
                  />
                </div>

                <div className="w-full lg:w-3/4 flex flex-col lg:mx-10 lg:pl-5">
                  <h3 className="mb-5">
                    <span className="text-lg lg:text-2xl font-bold dark:text-white text-black"> Category Name </span>
                    <span className="font-normal text-md lg:text-lg dark:text-white text-gray-600">
                       - Date of the post
                    </span>
                  </h3>

                  <h1 className="text-xl lg:text-4xl font-extrabold dark:text-white text-black tracking-wide leading-snug lg:w-3/4">
                    Your most customers are your greater source of learning.
                  </h1>

                  <p className="mt-5 leading-loose font-sans text-sm lg:text-lg font-medium tracking-wide text-left dark:text-white text-slate-700">
                    
                    {`The <Image /> component accepts a number of additional properties beyond those which are required. This section describes 
                    the most commonly-used properties of the Image component. Find details about more rarely-used properties in the Advanced 
                    Props section`}
                  </p>
                </div>
            </div>
          </Slider>

          <div className="bg-white dark:bg-slate-700 py-5 px-2 lg:px-10 w-full h-full">      
            <h1 className="text-center text-3xl lg:text-5xl font-bold my-5 italic">Latest News</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-10 mb-5 w-full h-full">
              {NewsTemplate.map((data,index)=>(
                <div key={index} className="flex flex-col w-full h-full lg:mt-20 float-right">
                  <Image
                    src={AboutUsImage4}
                    layout="raw" 
                    className="!bg-cover w-full !h-64 border rounded-xl"
                    alt="latest news image"
                  />
                  <div className="w-full flex flex-col my-5">
                    <h3 className="mb-5">
                      <span className="text-md lg:text-lg font-bold dark:text-white text-black"> Category Name </span>
                      <span className="font-normal text-sm lg:text-md dark:text-white text-gray-600">
                         - Date of the post
                      </span>
                    </h3>

                    <h1 className="text-lg lg:text-2xl font-extrabold dark:text-white text-black tracking-wide leading-snug">
                      Your most customers are your greater source of learning.
                    </h1>

                    <p className="mt-5 leading-loose font-sans text-sm lg:text-md font-medium tracking-wide text-left dark:text-white text-slate-700">
                      {`The component accepts a number of additional properties beyond those which are required. This section describes 
                      the most commonly-used properties of the Image component. Find details about more rarely-used properties in the Advanced 
                      Props section.`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
