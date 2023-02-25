import React, {useState,useEffect} from "react";
import { useRouter } from 'next/router'
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu, AiFillDashboard, AiOutlineUser, AiOutlineFolderAdd } from "react-icons/ai";
import { MdOutlineCategory, MdLocationOn } from "react-icons/md";
import { BsNewspaper } from 'react-icons/bs'
import {GiNewspaper} from 'react-icons/gi'
import Link from 'next/link'
import { useSession, signIn, signOut  } from "next-auth/react";
import { FiLogOut } from "react-icons/fi"
import { BiDownArrow } from "react-icons/bi"
import { BsDisplay } from 'react-icons/bs'

export function VerticalNavbar({onChange, data}){
    const SideBarList = [
        { link: "dashboard", icon: <AiFillDashboard size={25}/>, name: "Dashboard",},
        { link: "/Admin/User", icon: <AiOutlineUser size={25}/>, name: "User",},
        { link: "addJob", icon: <AiOutlineFolderAdd size={25}/>, name: "Add Job" },
        { link: "/Admin/JobDisplay", icon: <BsDisplay size={25}/>, name: "Display Job" },
        { link: "/Admin/Category", icon: <MdOutlineCategory size={25}/>, name: "Category" },
        { link: "/Admin/Location", icon: <MdLocationOn size={25}/>, name: "Location" },
        { link: "/Admin/NewsCategory", icon: <BsNewspaper size={25}/>, name: "News Category" },
        { link: "/Admin/JobDisplay", icon: <GiNewspaper size={25}/>, name: "News" },
        { link: "/Admin/EntertainmentCategory", icon: <BsNewspaper size={25}/>, name: "Entertainment Category" },
        { link: "/Admin/Entertainment", icon: <GiNewspaper size={25}/>, name: "Entertainment" },
    ];
	const router = useRouter();
    const [sideBar , setsideBar] = useState(false);
    const handleSideBar = () => {
        setsideBar(!sideBar);
    };

	return(
            <div className={`flex h-full sticky top-0 bottom-0 ${sideBar ? "w-10 lg:w-28" : "w-16 lg:w-96"} pt-24`}>
                <nav className="w-full h-screen flex flex-col py-8 px-4 bg-neutral-300 dark:bg-slate-800 scroll_width">
                    <div className="flex justify-between ml-5">
                        <h1 className={`text-2xl font-bold text-black dark:text-white ${sideBar ? "hidden" : "hidden lg:flex"}`}>Admin Page</h1>
                        <button 
                            onClick={handleSideBar} 
                            className={`hidden lg:flex text-black dark:text-white hover:text-slate-800 focus:outline-none ${ sideBar ? "flex justify-center items-center" : ""} `}
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
                                            router.push({
                                                pathname:side.link,
                                            })
                                        }}
                                        className="w-full flex items-center p-2 lg:p-4 text-xs lg:text-sm p-4 text-black hover:text-white dark:text-white hover:bg-slate-800 dark:hover:bg-white dark:hover:text-slate-800 rounded-xl"
                                    >
                                            {side.icon}
                                            <span className={`ml-4 font-semibold ${sideBar ? 'hidden' : 'hidden lg:flex' } `}>
                                                {side.name}
                                            </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-auto flex flex-col">
                        <Link href="/">
                            <a className="flex items-center p-2 lg:p-4 text-xl text-black hover:text-white dark:text-white hover:bg-slate-800 dark:hover:bg-white dark:hover:text-slate-800 rounded-xl hover:bg-white rounded-xl">
                                <BsDisplay size={25} />
                            </a>
                        </Link>

                        
                        <button 
                            onClick={() => signOut({
                                callbackUrl: '/auth/signin'
                            })} 
                            className="flex items-center p-2 lg:p-4 text-xl text-black hover:text-white dark:text-white hover:bg-slate-800 dark:hover:bg-white dark:hover:text-slate-800 rounded-xl hover:bg-white rounded-xl" href="#">
                            <FiLogOut size={25} />
                            <span className={`ml-4 text-lg font-semibold ${sideBar ? "hidden" : "flex"} `}>Log Out</span>
                        </button>
                    </div>
                </nav>
            </div>
	)
}