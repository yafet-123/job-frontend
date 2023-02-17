import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from "next/router";
import { useTheme } from 'next-themes';
import ThemeToggler from './ThemeToggler';
import {signIn} from 'next-auth/react'

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [NavabarText,setNavabarText] = useState("")
  const router = useRouter();
  const handleNav = () => {
    setNav(!nav);
  };

  const NavbarTopic = [
    { path: "/", name: "Home" },
    { path: "/Jobs", name: "Jobs" },
    { path: "/Entertemiment", name: "Entertemiment" },
    { path: "/Courses", name: "Courses" },
    { path: "/Advices", name: "Advices" },
    { path: "/News", name: "News"}
  ];

  const [colorChange, setColorchange] = useState(false);

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNavbarColor);
  }, []);

  return (
    <nav
      className={ router.pathname == "/auth/signin" ? "hidden" : `${
        colorChange ? 'bg-neutral-700 bg-opacity-80 dark:bg-slate-800 ' : 'bg-transparent'
      } w-full   lg:h-[100px] top-0 fixed z-50`}
    >
      <div className="lg:justify-between justify-around lg:px-4 mx-10 items-center lg:flex lg:py-[10px] ">
        <div className="flex items-center justify-between py-3 ">
          <Link href="/">
            <Image
              src="/images/logo.png"
              width={100} height={70}
              alt="Navbar"
            />
          </Link>
          <div className="lg:hidden ">
            <button
              className="p-2  text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
              onClick={() => setOpen(!open)}
            >
              {open === true ? (
                <AiOutlineClose color="white" size={30} />
              ) : (
                <AiOutlineMenu color="white" size={30} />
              )}
            </button>
          </div>
        </div>

        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 lg:block lg:pb-0 lg:mt-0 ${
              open ? 'flex' : 'hidden'
            }`}
          >
            <ul className="items-center justify-center space-y-8 lg:flex lg:space-x-8 lg:space-y-0">
              {NavbarTopic.map((link) => (
                <li
                  key={link.name}
                  className="md:ml-6 text-md font-medium md:my-0 my-7"
                >
                  <Link href={link.path}>
                    <a
                      onClick={(e) => setNavabarText(link.text)}
                      className={
                        router.pathname == link.path || ( router.pathname == "/DisplayJobs" && "/Jobs" == link.path ) || 
                        ( router.pathname == "/JobsByCategory" && "/Jobs" == link.path ) || ( router.pathname == "/JobsByLocation" && "/Jobs" == link.path ) ||
                        ( router.pathname == "/Course" && "/Courses" == link.path ) || ( router.pathname == "/Advice" && "/Advices" == link.path ) || 
                        ( router.pathname == "/DisplayNews" && "/News" == link.path )
                          ? "border-b-4 border-black dark:border-black md:ml-2 lg:ml-3 text-md lg:text-xl font-bold text-black dark:text-white"
                          : "md:ml-2 lg:ml-3 text-md lg:text-xl font-bold text-black dark:text-white hover:border-b-4 border-white"
                      }
                    >
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}

              <div className="flex ">
                <ThemeToggler />
              </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
