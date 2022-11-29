import Link from "next/link";
import React from "react";
import Image from "next/image";

function MissionAndVision() {
  return (
    <div
      id="MissionAndVision"
      className="w-full h-full bg-gray-200 bg-cover bg-center flex flex-col justify-between items-center px-5 md:flex-row lg:px-52 mb-24 pb-20 "
    >
      <div className="w-96 h-96 md:w-102 md:h-96  text-white flex flex-col mt-24 border-4 p-5 backdrop-opacity-1 backdrop-invert bg-white/20">
        <h1 className="font-bold text-4xl md:text-5xl my-4 text-center">
          Mission
        </h1>
        <p className="text-lg md:text-xl my-2 w-130 text-center">
          To reverse degradation of natural environment, and support societies
          and government to build a future in which humans live in harmony with
          nature, by conservation biodiversity, promoting sustainable and
          equitable use of renewable natural resources.
        </p>
      </div>

      <div className="w-96 h-96 md:w-102 md:h-96 text-white flex flex-col mt-52 border-4 p-5 backdrop-opacity-1 backdrop-invert bg-white/20">
        <h1 className="font-bold text-4xl md:text-5xl my-4 text-center">
          Vision
        </h1>
        <p className="text-lg md:text-xl my-2 w-130 text-center ">
          A healthy and prosperous society that values, conserves and
          sustainably uses nature.
        </p>
      </div>
    </div>
  );
}

export default MissionAndVision;
