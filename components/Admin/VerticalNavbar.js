import React, {useState,useEffect} from "react";
import { useRouter } from 'next/router'
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import Link from 'next/link'
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export function VerticalNavbar(){
    const SideBarList = [
        { path: "", icon: <FaFacebookF />, name: "Dashboard",},
        { path: "", icon: <FaFacebookF />, name: "Add User",},
        { path: "", icon: <FaTwitter />, name: "Display User" },
        { path: "", icon: <FaLinkedinIn />, name: "Add Job" },
        { path: "", icon: <FaYoutube />, name: "Display Job" },
        { path: "", icon: <FaLinkedinIn />, name: "Add Category" },
        { path: "", icon: <FaYoutube />, name: "Display Category" },
    ];
	const router = useRouter();
    const [sideBar , setsideBar] = useState(true);
    const handleSideBar = () => {
        setsideBar(!sideBar);
    };
    console.log(sideBar)
	return(
            <div className={`flex ${sideBar ? "w-24" : "w-96"}`}>
                <nav className="w-full h-screen flex flex-col h-full py-8 px-4 overflow-auto bg-gray-900">
                    <div className="flex justify-between ml-5">
                        <h1 className={`text-2xl font-bold text-white ${sideBar ? "hidden" : "flex"}`}>Admin Page</h1>
                        <button onClick={handleSideBar} className="text-white hover:text-gray-300 focus:outline-none">
                            <AiOutlineMenu size={40} />
                        </button>
                    </div>
                    <div className="mt-10">
                        <ul>
                            {SideBarList.map((side, index) => (
                                <li className="mb-4" key={index}>
                                    <Link  href={side.path}>
                                        <a  target="_blank" rel="noreferrer" 
                                            className="flex items-center p-4 text-xl p-4 text-white hover:bg-gray-800 rounded-xl"
                                        >
                                            {side.icon}
                                            <span className={`ml-4 font-semibold ${sideBar ? 'hidden' : 'flex' } `}>
                                                {side.name}
                                            </span>
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`mt-auto flex flex-col`}>
                        <Link  href="/">
                            <a className="flex items-center p-4 text-white hover:bg-gray-800 rounded-xl" href="#">
                                <FaLinkedinIn />
                                <span className={`ml-4 text-lg font-semibold ${sideBar ? "hidden" : "flex"} `}>Profile</span>
                            </a>
                        </Link>

                        <Link  href="/">
                            <a className="flex items-center p-4 text-white hover:bg-gray-800 rounded-xl" href="#">
                                <FaLinkedinIn />
                                <span className={`ml-4 text-lg font-semibold ${sideBar ? "hidden" : "flex"} `}>Log Out</span>
                            </a>
                        </Link>
                    </div>
                </nav>
            </div>
	)
}