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

import { FiLogOut } from "react-icons/fi"
import { BiDownArrow } from "react-icons/bi"

export function VerticalNavbar({onChange}){
    const SideBarList = [
        { title: "dashboard", icon: <FaFacebookF size={25}/>, name: "Dashboard",},
        { title: "addUser", icon: <FaFacebookF size={25}/>, name: "Add User",},
        { title: "displayUser", icon: <FaTwitter size={25}/>, name: "Display User" },
        { title: "addJob", icon: <FaLinkedinIn size={25}/>, name: "Add Job" },
        { title: "", icon: <FaYoutube size={25}/>, name: "Display Job" },
        { title: "addCategory", icon: <FaLinkedinIn size={25}/>, name: "Add Category" },
        { title: "", icon: <FaYoutube size={25}/>, name: "Display Category" },
    ];
	const router = useRouter();
    const [sideBar , setsideBar] = useState(true);
    const handleSideBar = () => {
        setsideBar(!sideBar);
    };
    console.log(sideBar)
	return(
            <div className={`flex ${sideBar ? "w-24" : "w-96"}`}>
                <nav className="w-full h-screen flex flex-col h-full py-8 px-4 overflow-auto bg-gray-400">
                    <div className="flex justify-between ml-5">
                        <h1 className={`text-2xl font-bold text-black ${sideBar ? "hidden" : "flex"}`}>Admin Page</h1>
                        <button 
                            onClick={handleSideBar} 
                            className={`text-black hover:text-white focus:outline-none ${ sideBar ? "flex justify-center items-center" : ""} `}
                        >
                            <AiOutlineMenu size={35} />
                        </button>
                    </div>
                    <div className="mt-10">
                        <ul>
                            {SideBarList.map((side, index) => (
                                <li className="mb-4" key={index}>
                                    <button 
                                        onClick = {()=>{
                                            onChange(side.title)
                        
                                        }}
                                        className="w-full flex items-center p-4 text-xl p-4 text-black hover:bg-white rounded-xl"
                                    >
                                            {side.icon}
                                            <span className={`ml-4 font-semibold ${sideBar ? 'hidden' : 'flex' } `}>
                                                {side.name}
                                            </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`mt-auto flex flex-col`}>
                        <Link  href="/">
                            <a className="flex items-center p-4 text-xl text-black hover:bg-white rounded-xl" href="#">
                                <FaLinkedinIn size={25} />
                                <span className={`ml-4 text-lg font-semibold ${sideBar ? "hidden" : "flex"} `}>Profile</span>
                            </a>
                        </Link>

                        <Link  href="/">
                            <a className="flex items-center p-4 text-xl text-black hover:bg-white rounded-xl" href="#">
                                <FiLogOut size={25} />
                                <span className={`ml-4 text-lg font-semibold ${sideBar ? "hidden" : "flex"} `}>Log Out</span>
                            </a>
                        </Link>
                    </div>
                </nav>
            </div>
	)
}