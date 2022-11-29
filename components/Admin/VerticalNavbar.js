import React, {useState,useEffect} from "react";
import { useRouter } from 'next/router'
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";

export function VerticalNavbar(){
    const MainList = [
        { path: "", icon: <FaFacebookF />, style: "bg-blue-900",},
        { path: "", icon: <FaTwitter />, style: "bg-blue-500" },
        { path: "", icon: <FaLinkedinIn />, style: "bg-blue-700" },
        { path: "", icon: <FaYoutube />, style: "bg-red-500" },
    ];
	const router = useRouter();
	return(
            <div className="hidden lg:flex w-1/4">
                <nav className="w-full h-screen flex flex-col h-full py-8 px-4 overflow-auto bg-gray-900">
                    <div className="text-right">
                        <button className="text-white hover:text-gray-300 focus:outline-none">
                            <AiOutlineMenu size={40} />
                        </button>
                    </div>
                    <div className="">
                        <a className="inline-block mb-12" href="#">
                            <img className="h-7" src="trizzle-assets/logos/trizzle-logo.svg" alt="" />
                        </a>
                        <ul>
                            {MainList.map((main, index) => (
                                <li className="mb-4" key={index}>
                                    <Link  href={main.path}>
                                        <a className="flex items-center p-4 text-white bg-blue-500 rounded-xl" href="#">
                                          <svg width="20" height="20" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 11H1C0.734784 11 0.48043 11.1054 0.292893 11.2929C0.105357 11.4804 0 11.7348 0 12V19C0 19.2652 0.105357 19.5196 0.292893 19.7071C0.48043 19.8946 0.734784 20 1 20H8C8.26522 20 8.51957 19.8946 8.70711 19.7071C8.89464 19.5196 9 19.2652 9 19V12C9 11.7348 8.89464 11.4804 8.70711 11.2929C8.51957 11.1054 8.26522 11 8 11ZM7 18H2V13H7V18ZM19 0H12C11.7348 0 11.4804 0.105357 11.2929 0.292893C11.1054 0.48043 11 0.734784 11 1V8C11 8.26522 11.1054 8.51957 11.2929 8.70711C11.4804 8.89464 11.7348 9 12 9H19C19.2652 9 19.5196 8.89464 19.7071 8.70711C19.8946 8.51957 20 8.26522 20 8V1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0ZM18 7H13V2H18V7ZM19 11H12C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12V19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11ZM18 18H13V13H18V18ZM8 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H8C8.26522 9 8.51957 8.89464 8.70711 8.70711C8.89464 8.51957 9 8.26522 9 8V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0ZM7 7H2V2H7V7Z" fill="currentColor"></path>
                                          </svg>
                                          <span className="ml-4 text-sm font-semibold">Overview</span>
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-auto flex items-center justify-center">
                        <a className="flex items-center p-4 text-gray-300 hover:bg-gray-800 rounded-xl" href="#">
                            <span className="text-gray-400">
                                <svg width="22" height="22" viewbox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.46458 3.95725C9.85508 2.34758 12.1449 2.34758 12.5354 3.95725C12.594 4.19907 12.7089 4.42363 12.8707 4.61267C13.0324 4.8017 13.2366 4.94987 13.4664 5.0451C13.6963 5.14033 13.9454 5.17995 14.1935 5.16071C14.4415 5.14148 14.6816 5.06394 14.894 4.93442C16.3084 4.07275 17.9282 5.69158 17.0665 7.10692C16.9372 7.31927 16.8597 7.55914 16.8406 7.80704C16.8214 8.05494 16.8609 8.30387 16.9561 8.5336C17.0512 8.76332 17.1992 8.96736 17.388 9.12913C17.5768 9.2909 17.8012 9.40583 18.0428 9.46458C19.6524 9.85508 19.6524 12.1449 18.0428 12.5354C17.8009 12.594 17.5764 12.7089 17.3873 12.8707C17.1983 13.0324 17.0501 13.2366 16.9549 13.4664C16.8597 13.6963 16.8201 13.9454 16.8393 14.1935C16.8585 14.4415 16.9361 14.6816 17.0656 14.894C17.9273 16.3084 16.3084 17.9282 14.8931 17.0665C14.6807 16.9372 14.4409 16.8597 14.193 16.8406C13.9451 16.8214 13.6961 16.8609 13.4664 16.9561C13.2367 17.0512 13.0326 17.1992 12.8709 17.388C12.7091 17.5768 12.5942 17.8012 12.5354 18.0428C12.1449 19.6524 9.85508 19.6524 9.46458 18.0428C9.40599 17.8009 9.29113 17.5764 9.12935 17.3873C8.96757 17.1983 8.76344 17.0501 8.53357 16.9549C8.3037 16.8597 8.0546 16.8201 7.80653 16.8393C7.55846 16.8585 7.31844 16.9361 7.106 17.0656C5.69158 17.9273 4.07183 16.3084 4.9335 14.8931C5.06284 14.6807 5.14025 14.4409 5.15944 14.193C5.17863 13.9451 5.13906 13.6961 5.04393 13.4664C4.94881 13.2367 4.80082 13.0326 4.612 12.8709C4.42318 12.7091 4.19885 12.5942 3.95725 12.5354C2.34758 12.1449 2.34758 9.85508 3.95725 9.46458C4.19907 9.40599 4.42363 9.29113 4.61267 9.12935C4.8017 8.96757 4.94987 8.76344 5.0451 8.53357C5.14033 8.3037 5.17995 8.0546 5.16071 7.80653C5.14148 7.55846 5.06394 7.31844 4.93442 7.106C4.07275 5.69158 5.69158 4.07183 7.10692 4.9335C8.02358 5.49083 9.21158 4.99767 9.46458 3.95725Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                  <path d="M11 13.75C12.5188 13.75 13.75 12.5188 13.75 11C13.75 9.48122 12.5188 8.25 11 8.25C9.48122 8.25 8.25 9.48122 8.25 11C8.25 12.5188 9.48122 13.75 11 13.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                            <span className="ml-4 text-sm font-semibold">Settings</span>
                        </a>
                        <a className="flex items-center p-4 text-gray-300 hover:bg-gray-800 rounded-xl" href="#">
                            <span className="text-gray-400">
                                <svg width="22" height="22" viewbox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.8333 7.33335V5.50002C12.8333 5.01379 12.6402 4.54747 12.2964 4.20366C11.9525 3.85984 11.4862 3.66669 11 3.66669H4.58333C4.0971 3.66669 3.63079 3.85984 3.28697 4.20366C2.94315 4.54747 2.75 5.01379 2.75 5.50002V16.5C2.75 16.9863 2.94315 17.4526 3.28697 17.7964C3.63079 18.1402 4.0971 18.3334 4.58333 18.3334H11C11.4862 18.3334 11.9525 18.1402 12.2964 17.7964C12.6402 17.4526 12.8333 16.9863 12.8333 16.5V14.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M6.41675 11H19.2501M19.2501 11L16.5001 8.25M19.2501 11L16.5001 13.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                            <span className="ml-4 text-sm font-semibold">Log Out</span>
                        </a>
                    </div>
                </nav>
            </div>
	)
}