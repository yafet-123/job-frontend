import React from "react";
import Image from "next/image";
export default function About() {
  return (
    <section
      id="History"
      className="bg-slate-300 w-full pt-40 pb-20 px-5 md:px-96"
    >
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div className="flex flex-col w-full lg:w-130 px-10 lg:px-0">
          <h1 className="text-amber-800 font-bold text-4xl md:text-5xl my-4">
            {" "}
            We are Hulu Media
          </h1>
          <p className="text-black text-left md:text-lg my-2 w-full ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at
            justo nulla. In blandit vulputate leo at vehicula. Nunc bibendum
            ligula eu sollicitudin scelerisque. Etiam dapibus felis ligula, non
            blandit ipsum sollicitudin a. Vestibulum ut ex nec erat tempus
            laoreet sed ac felis. Mauris tempor sit amet tortor vel consectetur.
            Cras ultricies lectus laoreet purus pellentesque, ac cursus nibh
            aliquam. Nulla venenatis vestibulum libero at bibendum. Nullam
            molestie elit ipsum, pulvinar laoreet odio eleifend nec.
          </p>
        </div>
        <div className="flex flex-row mt-10 md:mt-0 lg:mb-40">
          <div className="lg:inline-flex relative w-96 h-96 border rounded-full bg-transparent lg:bg-amber-700">
            <div className="lg:absolute lg:bottom-1/4 lg:left-2/4 about-background w-96 h-96 border rounded-full mx-auto lg:mx-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
