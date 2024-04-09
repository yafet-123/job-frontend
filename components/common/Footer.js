import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaPhone,FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { useRouter } from "next/router";
import { MdEmail } from "react-icons/md";
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
            Hulu Neger is a platform dedicated to posting various content, including job applications, blogs, and more. It serves as a comprehensive 
            hub for users to engage with informative and diverse materials
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
          <Link
            target="_blank"
            className="flex flex-row items-center gap-2 hover:text-gray-300"
            href={`tel:${+251934731038}`}
          >
            <span className="flex items-center">
              <FaPhone />{" "}
              <p className="ml-2 md:ml-3 cursor-pointer">+251-934-73-10-38</p>
            </span>
          </Link>
          <Link
            target="_blank"
            className="flex flex-row items-center gap-2 hover:text-gray-300"
            href={`tel:${+251912843692}`}
          >
            <span className="flex items-center">
              <FaPhone />{" "}
              <p className="ml-2 md:ml-3 cursor-pointer">+251-912-84-36-92</p>
            </span>
          </Link>
          <Link
            target="_blank"
            className="flex flex-row items-center gap-2 hover:text-gray-300"
            href="mailto:yafetaddisu123@gmail.com"
          >
            <span className="flex items-center">
              <MdEmail />{" "}
              <p className="ml-2 md:ml-3 cursor-pointer">
                yafetaddisu123@gmail.com
              </p>
            </span>
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center text-white h-full lg:h-8 mx-3 lg:mx-10">
        <div className="texl-normal text-sm lg:text-lg md:block">&copy;Hulu Media 2024.</div>

        <div className="texl-normal text-sm lg:text-lg md:block">Powered by Hulu Media</div>
      </div>
    </footer>
  );
}
