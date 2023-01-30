import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { useRouter } from "next/router";
export function Footer() {
  const socialMediaLinks = [
    { path: <FaFacebookF size={20} /> },
    { path: <FaLinkedinIn size={20} /> },
    { path: <FaTwitter size={20} /> },
    { path: <FaYoutube size={20} /> },
  ];

  const quickLinks = [
    { link: "Home", path:"/" },
    { link: "Course", path:"/" },
    { link: "Advices", path:"/" },
    { link: "About", path: "/About" },
  ];

  const router = useRouter();

  return (
    <footer className={ router.pathname == "/auth/signin" ? "hidden" : "bg-[#94BB3C] dark:bg-slate-600 w-full"}>
      <div className="flex flex-col lg:flex-row justify-between p-10 bg-[#165248] dark:bg-slate-800">
        <div className="flex flex-col items-center justify-between space-y-5 md:items-start w-full md:w-1/4 mb-10 md:mb-0">
          <div className="">
            <Link href="/">
              <a>
                <Image
                  src="/images/logo.jpg"
                  className=""
                  alt=""
                  width={100}
                  height={60}
                />
              </a>
            </Link>
          </div>

          <p className="text-md lg:text-xl text-white w-full lg:w-3/4 text-center lg:text-left">
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 w-full lg:w-3/4">
          <div className="flex flex-col space-y-2 text-white justify-center items-center">
            <h1 className="text-lg lg:text-2xl font-bold">Quick Links</h1>
            {quickLinks.map((links, index) => {
              return (
                <Link key={index} href={links.path}>
                  <a className="text-md lg:text-lg hover:text-orange-500">{links.link}</a>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col space-y-2 text-white justify-center items-center">
            <h1 className="text-lg lg:text-2xl font-bold">Contact Info</h1>
            <p href="#" className="text-md lg:text-lg hover:text-orange-500">
              Jobs finder
            </p>
            <p className="text-md lg:text-lg hover:text-orange-500">+251-934-73-10-38</p>
            <p className="text-md lg:text-lg hover:text-orange-500">+251-934-73-10-38</p>
            <Link href="yafetaddisu123@gmail.com">
              <a className="text-sm lg:text-lg hover:text-orange-500">
                yafetaddisu123@gmail.com
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center text-white h-full lg:h-8 mx-3 lg:mx-10">
        <div className="texl-normal text-sm lg:text-lg md:block">&copy;Hulu 2022.</div>

        <div className="texl-normal text-sm lg:text-lg md:block">Powered by Hulu Media</div>
      </div>
    </footer>
  );
}
