import React from 'react';

export const Hero = ({
  title,
  subtitle,
}) => {
  return (
    <div className="flex justify-center items-center lg:px-20" >
      <div className="flex flex-col gap-8 font-bold text-center md:pt-10">
        <div>
          <h1 className="text-3xl lg:text-5xl font-bold text-[#009688]  lg:mb-2">{title}</h1>
        </div>
        <div>
          <p className="text-black dark:text-white text-md md:text-xl m-4 font-normal !leading-9">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};
