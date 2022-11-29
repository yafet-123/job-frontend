import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
export function Footer() {
  const socialMediaLinks = [
    { path: <FaFacebookF size={20} /> },
    { path: <FaLinkedinIn size={20} /> },
    { path: <FaTwitter size={20} /> },
    { path: <FaYoutube size={20} /> },
  ];

  const quickLinks = [
    { link: "Home" },
    { link: "Course" },
    { link: "Advices" },
  ];

  const aboutUsLinks = [
    { link: "About", path: "/About" },
    { link: "Mission/Vision", path: "/ MissionAndVision" },
    { link: "Our Team", path: "" },
  ];

  return (
    <footer className="bg-blue-400 w-full">
      <div className="flex flex-col lg:flex-row justify-between p-10 bg-blue-500">
        <div className="flex flex-col items-center justify-between space-y-5 md:items-start w-full md:w-1/4 mb-10 md:mb-0">
          <div className="">
            <Link href="/">
              <a>
                <Image
                  src="/images/vercel.svg"
                  className=""
                  alt=""
                  width={100}
                  height={35}
                />
              </a>
            </Link>
          </div>

          <p className="text-xl text-white w-full lg:w-3/4 text-center lg:text-left">
            Lorem ipsum dolor sit amet, consectetur adipisicing elitadipisicing
            elit.
          </p>
          <div className="flex justify-center items-center space-x-4">
            {socialMediaLinks.map((paths, index) => {
              return (
                <Link key={index} href="#">
                  <a className="text-white">{paths.path}</a>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 w-full lg:w-3/4">
          <div className="flex flex-col space-y-2 text-white justify-center items-center">
            <h1 className="text-2xl font-bold">Quick Links</h1>
            {quickLinks.map((links, index) => {
              return (
                <Link key={index} href="#">
                  <a className="text-lg hover:text-orange-500">{links.link}</a>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col space-y-2 text-white justify-center items-center">
            <h1 className="text-2xl font-bold">About Us</h1>
            {aboutUsLinks.map((links, index) => {
              return (
                <Link key={index} href={links.path}>
                  <a className=" text-lg hover:text-orange-500">{links.link}</a>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col space-y-2 text-white justify-center items-center">
            <h1 className="text-2xl font-bold">Contact Info</h1>
            <p href="#" className="text-lg hover:text-orange-500">
              Jobs finder
            </p>
            <p className="text-lg hover:text-orange-500">+251-934-73-10-38</p>
            <p className="text-lg hover:text-orange-500">+251-934-73-10-38</p>
            <Link href="yafetaddisu123@gmail.com">
              <a className="text-lg hover:text-orange-500">
                yafetaddisu123@gmail.com
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center text-white h-full lg:h-8 mx-3 lg:mx-10">
        <div className="texl-normal lg:text-lg md:block">&copy;Hulu 2022.</div>

        <div className="texl-normal lg:text-lg md:block">Powered by Hulu Media</div>
      </div>
    </footer>
  );
}
