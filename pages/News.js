import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NewsTemplate } from "../data/NewsTemplate.js"
import { MainHeader } from '../components/MainHeader';

export default function News() {
  return (
    <React.Fragment>
      <MainHeader title="News" />
      <section className="flex flex-col w-full h-full px-0 md:px-24 bg-gray-200 dark:bg-slate-700 ">
        <div className="bg-white dark:bg-slate-800 py-10 px-10 w-full h-full pt-32">      
          <Image 
            src="/images/news.jpg" 
            width={2000} 
            height={500}
            alt="news"
          />
          <h1 className="text-center w-full uppercase text-7xl font-medium mt-5 text-blue-700 font-bold">
            Hulu Media News
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 w-full h-full">
            {NewsTemplate.map((data,index)=>(
              <div key={index} className="flex flex-col w-full h-full mt-20 float-right">
                <Image
                  src={data.image}
                  width={500}
                  height={500}
                  className="border rounded-xl w-full md:w-96 h-96"
                  alt="news"
                />
                <div className="flex flex-col justify-between mt-5 md:mt-0">
                  <h1 className="text-left w-full uppercase text-3xl font-medium my-5">
                    {data.title}
                  </h1>
                  <p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed mb-5 w-full h-40 text-ellipsis overflow-hidden">
                    {data.description}
                  </p>
                  <button className="text-center capitalize text-lg font-bold p-5 bg-blue-700 hover:bg-gray-200 border rounded-xl w-1/2 text-white hover:text-blue-700">
                    More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
