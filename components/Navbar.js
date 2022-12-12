import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube} from "react-icons/fa";
import { BsFillPersonLinesFill, BsMoonStars, BsSun } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from 'next-themes';
import ThemeToggler from './ThemeToggler';
import {signIn} from 'next-auth/react'

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [NavabarText, setNavabarText] = useState("Home");
  const MainList = [
    { path: "", icon: <FaFacebookF />, style: "bg-blue-900",},
    { path: "", icon: <FaTwitter />, style: "bg-blue-500" },
    { path: "", icon: <FaLinkedinIn />, style: "bg-blue-700" },
    { path: "", icon: <FaYoutube />, style: "bg-red-500" },
  ];
  const router = useRouter();
  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    // when it will scrolldown greater than 90 it will have navbar will change it style
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  const NavbarTopic = [
    { path: "/", text: "Home" },
    { path: "/Jobs", text: "Jobs" },
    { path: "/Entertemiment", text: "Entertemiment" },
    { path: "/Courses", text: "Courses" },
    { path: "/Advices", text: "Advices" },
    { path: "/News", text: "News"}
  ];

  return (
    <div className={ shadow ? "bg-gray-200 dark:bg-slate-800 w-full h-24 py-5 fixed z-50 shadow-xl z-[100] ease-in-out duration-300": "bg-white dark:bg-slate-800 w-full h-24 py-5" && router.pathname == "/auth/signin" ? "hidden" : "py-5"}>
      <div className="flex flex-row justify-between items-center px-11 md:px-20">
        <Image src="/images/vercel.svg" width={100} height={60} alt="hulu jobs" />
        <div className="flex flex-1 flex-row items-center">
          <div className="hidden lg:flex items-center">
            <button onClick={()=>(
              signIn()
            )}>Login</button>
            {NavbarTopic.map((navbar, index) => (
              <Link key={index} href={navbar.path}>
                <a
                  onClick={(e) => setNavabarText(navbar.text)}
                  className={
                    router.pathname == navbar.path || ( router.pathname == "/DisplayJobs" && "/Jobs" == navbar.path ) || 
                    ( router.pathname == "/JobsByCategory" && "/Jobs" == navbar.path ) || ( router.pathname == "/JobsByLocation" && "/Jobs" == navbar.path ) ||
                    ( router.pathname == "/Course" && "/Courses" == navbar.path )
                      ? "border-b-4 border-blue-800 dark:border-white ml-20 text-2xl font-light text-black dark:text-white"
                      : "ml-20 text-2xl font-light text-black dark:text-white hover:border-b-4 border-blue-800"
                  }
                >
                  {navbar.text}
                </a>
              </Link>
            ))}
          </div>

        </div>
        <div className="hidden lg:flex">
          <ThemeToggler />
        </div>
        <div onClick={handleNav} className="lg:hidden float-right">
          <AiOutlineMenu size={30} />
        </div>
      </div>
      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70 z-50"
            : ""
        }
      >
        <div
          className={
            nav
              ? "dark:bg-slate-800 fixed left-0 top-0 w-[80%] sm:w-[60%] md:w-[45%] h-screen bg-white py-5 px-2 ease-in duration-500"
              : "dark:bg-slate-800 fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
              <Link href="/">
                <a>
                  <Image
                    src="/images/vercel.svg"
                    alt="hulu jobs"
                    width="100"
                    height="50"
                    className="cursor-pointer"
                  />
                </a>
              </Link>

              <div className="flex lg:hidden">
                <ThemeToggler />
              </div>
              <div
                onClick={handleNav}
                className="dark:text-white rounded-full shadow-lg shadow-gray-400 p-35 cursor-pointer"
              >
                <AiOutlineClose size={20} />
              </div>
            </div>
          </div>
          <div className="py-4 flex flex-col">
            <ul className="uppercase">
              {NavbarTopic.map((navbar, index) => (
                <Link key={index} href={navbar.path}>
                  <li
                    onClick={() => setNav(false)}
                    className={
                      router.pathname == navbar.path
                        ? "border-b-4 border-blue-800 dark:border-white ml-2 text-lg font-light text-black dark:text-white w-[40%] mb-5"
                        : "ml-2 text-lg font-light text-black dark:text-white hover:border-b-4 border-blue-800 dark:border-white w-[40%] mb-5"
                      }
                  >
                    {navbar.text}
                  </li>
                </Link>
              ))}
            </ul>
            <div className="pt-40">
              <p className="uppercase tracking-widest text-[#5651e5]">
                Let&#39;s Connect
              </p>
              <div className="flex items-center justify-between max-w-[330px] m-auto py-4">
                {MainList.map((main, index) => (
                  <Link key={index} href={main.path}>
                    <a target="_blank" rel="noreferrer">
                      <div
                        className={`${main.style} text-white rounded-full shadow-lg shadow-gray-400 p-4 hover:w-20 transition-all duration-1000 transform-cpu cursor-pointer hover:brightness-110 flex items-center justify-center`}
                      >
                        {main.icon}
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
