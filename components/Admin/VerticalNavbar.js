import React, {useState,useEffect} from "react";
import { useRouter } from 'next/router'
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu, AiFillDashboard, AiOutlineUser, AiOutlineFolderAdd } from "react-icons/ai";
import { MdOutlineCategory, MdLocationOn } from "react-icons/md";
import Link from 'next/link'
import { useSession, signIn, signOut  } from "next-auth/react";
import { FiLogOut } from "react-icons/fi"
import { BiDownArrow } from "react-icons/bi"
import { BsDisplay } from 'react-icons/bs'

export function VerticalNavbar({onChange}){
    const SideBarList = [
        { title: "dashboard", icon: <AiFillDashboard size={25}/>, name: "Dashboard",},
        { title: "addUser", icon: <AiOutlineUser size={25}/>, name: "User",},
        { title: "addJob", icon: <AiOutlineFolderAdd size={25}/>, name: "Add Job" },
        { title: "displayJob", icon: <BsDisplay size={25}/>, name: "Display Job" },
        { title: "addCategory", icon: <MdOutlineCategory size={25}/>, name: "Category" },
        { title: "addlocation", icon: <MdLocationOn size={25}/>, name: "Location" },
    ];
	const router = useRouter();
    const { status, data } = useSession();
    const [sideBar , setsideBar] = useState(true);
    const handleSideBar = () => {
        setsideBar(!sideBar);
    };
    console.log(data)
	return(
            <div className={`flex h-screen ${sideBar ? "w-24" : "w-96"}`}>
                <nav className="w-full h-screen flex flex-col py-8 px-4 overflow-auto bg-white dark:bg-slate-800">
                    <div className="flex justify-between ml-5">
                        <h1 className={`text-2xl font-bold text-black dark:text-white ${sideBar ? "hidden" : "flex"}`}>Admin Page</h1>
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
                                            onChange(side.title)
                        
                                        }}
                                        className="w-full flex items-center p-4 text-xl p-4 text-black hover:text-white dark:text-white hover:bg-slate-800 dark:hover:bg-white dark:hover:text-slate-800 rounded-xl"
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
                            <a className="flex items-center p-4 text-xl text-black hover:text-white dark:text-white hover:bg-slate-800 dark:hover:bg-white dark:hover:text-slate-800 rounded-xl hover:bg-white rounded-xl" href="#">
                                <BsDisplay size={25} />
                                <span className={`ml-4 text-lg font-semibold ${sideBar ? "hidden" : "flex"} `}>{data.user.name}</span>
                            </a>
                        </Link>

                        
                        <button 
                            onClick={() => signOut({
                                callbackUrl: '/auth/signin'
                            })} 
                            className="flex items-center p-4 text-xl text-black hover:text-white dark:text-white hover:bg-slate-800 dark:hover:bg-white dark:hover:text-slate-800 rounded-xl hover:bg-white rounded-xl" href="#">
                            <FiLogOut size={25} />
                            <span className={`ml-4 text-lg font-semibold ${sideBar ? "hidden" : "flex"} `}>Log Out</span>
                        </button>
                    </div>
                </nav>
            </div>
	)
}