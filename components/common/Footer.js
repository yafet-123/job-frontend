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
    { link: "Jobs", path: "/Jobs" },
    { link: "News", path: "/News" },
    { link: "Entertemiment", path: "/Entertemiment"},
    { link: "Courses", path: "/Course"},
    { link: "Blogs", path:"/Blogs" },
    { link: "About", path: "/About" },
  ];

  const router = useRouter();

  return (
    <footer className={ router.pathname == "/auth/signin" || router.pathname == "/ResetPassword" || router.pathname == '/Forgotpassword' ? "hidden" : "bg-neutral-600 dark:bg-slate-600 w-full"}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-10 bg-neutral-700 dark:bg-[#1B2637]">
        <div className="flex flex-col justify-center items-center lg:items-start space-y-5 mb-10 md:mb-0">
          <div className="">
            <Link href="/">
              <a>
                <Image
                  src="/images/logo5.png"
                  className=""
                  alt=""
                  width={300}
                  height={100}
                />
              </a>
            </Link>
          </div>

          <p className="text-md lg:text-xl text-white w-full text-center lg:text-left">
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
      <div className="flex justify-between items-center text-white h-full lg:h-8 mx-3 lg:mx-10">
        <div className="texl-normal text-sm lg:text-lg md:block">&copy;Hulu 2022.</div>

        <div className="texl-normal text-sm lg:text-lg md:block">Powered by Hulu Media</div>
      </div>
    </footer>
  );
}
