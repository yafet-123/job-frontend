import React from "react";
import Image from "next/image";
import AboutImage from "../public/images/aboutBackground.jpg"

export default function About() {
  return (
    <div className="w-full h-full">
      <section className="h-full lg:h-[695px] w-full bg-[#165248] mb-10">
        <div className="max-w-5xl mx-auto flex flex-col justify-between items-center py-20">
          <h1 className="w-full text-center text-5xl font-sans leading-[50px] font-bold text-white hover:text-[#94BB3C] mb-10">
            ABOUT US
          </h1>
          <p className="w-full px-10 text-center text-lg lg:text-3xl font-sans leading-10 font-bold text-white hover:text-[#94BB3C] mb-24">
            Eco-travel Ethiopia was founded to offer environmentally-friendly
            tours. our commitment is as reflected in our name offering tours with
            a softer footprint. We believe that Protecting the places we visit is
            necessary to ensure we can continue to introduce travelers to the
            spectacular beauty of Ethiopia.
          </p>
          <button className="mt-10 px-10 font-sans font-extrabold text-center text-2xl py-5 bg-[#94BB3C] hover:bg-black text-white hover:text-[#94BB3C] border-2 border-white rounded-md">
            Read More
          </button>
        </div>
      </section>

      
    </div>
  );
}
