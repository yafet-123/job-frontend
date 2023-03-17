import React from 'react'
import Image from 'next/future/image';
import About from '../../public/images/logo1.png';
import Mission from '../../public/images/mission.avif';
import Vision from '../../public/images/vision.jpg';

export const FollowingTheDream = ({jobcount,newCount,entertainmentcount}) => {
  const FollowingTheDreamData = [
    {
    id: 1,
    numbers: jobcount,
    title: 'Jobs',
  },
  {
    id: 2,
    numbers: newCount,
    title: 'News',
  },
  {
    id: 3,
    numbers: entertainmentcount,
    title: 'Entertainment',
  },
  ];
  return (
    <React.Fragment>
      <div className="flex flex-col lg:flex-row items-center md:my-20 my-16 md:px-16 px-4">
        <div className="w-full !h-32 lg:!h-64 relative">
          <Image
            src={About}
            fill
            className="!bg-cover w-full !h-full"
            alt="latest news image"
          />
        </div>
        <div className="flex flex-col text-left justify-center lg:w-3/4  text-[#165248] dark:text-white">
          <p className="md:text-2xl font-semibold text-md text-lg text-left">
            Hulumedia is one the most online recruitment provider in ethiopia, 
            The website advertises jobs across a wide range of job types by different employers, 
            inlcuding private, local, international, who are hiring in ethiopia.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:px-16 px-2 text-center">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex flex-col justify-between lg:px-10">
            <div className="w-full !h-52 lg:!h-72 opacity-50 relative">
              <Image
                src={Mission}
                fill
                className="!bg-cover w-full !h-full"
                alt="latest news image"
              />
            </div>
            <h1 className="md:text-5xl font-bold text-4xl my-10">OUR VISION</h1>
            <p className="md:text-2xl md:font-semibold text-md text-lg">
              We are proud to offer excellent quality and value for money in our
              tours, which give you the chance to experience your chosen
              destination in an authentic and exciting way.
            </p>
          </div>
      
          <div className="flex flex-col justify-between lg:px-10">
            <div className="w-full !h-52 lg:!h-72 opacity-50 relative">
              <Image
                src={Vision}
                fill
                className="!bg-cover w-full !h-full"
                alt="latest news image"
              />
            </div>
            <h1 className="md:text-5xl font-bold text-4xl my-10">OUR MISSION</h1>
            <p className="md:text-2xl md:font-semibold text-md text-lg">
              Our mission is to provide the ultimate travel planning experience
              while becoming a one-stop shop for every travel service available
              in the industry.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-around items-center bg-[#165248] dark:bg-slate-800 my-16">
        <h1 className="md:text-5xl font-bold text-4xl text-center text-white mt-6">
          Following the Dream
        </h1>
        <div className="flex md:flex-row flex-col justify-between gap-8 m-8">
          {FollowingTheDreamData.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col items-center text-center bg-white gap-4 p-10 hover:shadow-2xl rounded-xl shadow-lg shadow-slate-800"
              >
                <h1 className="md:text-6xl font-bold text-5xl text-[#165248]">
                  {item.numbers}+
                </h1>
                <h1 className="md:text-3xl font-bold text-2xl text-[#165248]">
                  {item.title}
                </h1>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4 text-[#165248] dark:text-white my-5 px-4">
        <h1 className="md:text-5xl font-bold text-4xl text-center m-6">
          What Makes Us Different?
        </h1>
        <ul className="text-justify md:px-16 ">
          <li className="md:text-2xl font-semibold text-lg">
            ● We offer every traveller a lifetime loyalty programme to ensure
            that they continue to travel sustainably.
          </li>
          <li className="md:text-2xl font-semibold  text-lg my-2">
            ● We have the experience, skills, and resources to make sure that
            your journey runs smoothly and environmentally friendly.
          </li>
          <li className="md:text-2xl font-semibold  text-lg my-2">
            ● We’ve embraced technology within our fleet and office,
            transforming our processes to ensure that we can monitor all our
            vehicles and journeys in close detail.
          </li>
          <li className="md:text-2xl font-semibold  text-lg my-2">
            ● We ensure that all travel is done with purpose and to create
            positive impact to every community and ecosystem that we visit.
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
