import React, {useState} from "react";
import { AiOutlineSearch, AiOutlineFacebook } from "react-icons/ai";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
export function Hero() {
  const [search,setsearch] = useState("job")
  return (
    <div className="hero-background w-full h-[30rem] lg:h-[40rem] flex justify-center items-center">
      <div className="flex flex-col w-full md:w-[40rem] h-96 px-5">
        <h1 className={`text-4xl mb-5 font-bold md:text-4xl lg:text-5xl ${ search == "job" ? " text-yellow-900 " : "text-green-900" } `}>
          Better Job. Better Talent
        </h1>
        <div className="flex mb-2">
          <button className={`text-xl md:text-2xl lg:text-3xl mr-10 ${ search == "job" ? " bg-yellow-400 " : "" } p-4  rounded-xl`} onClick={() => setsearch("job")}>Jobs</button>
          <button className={`text-xl md:text-2xl lg:text-3xl ${ search == "companies" ? " bg-green-400 " : "" } p-4 rounded-xl`} onClick={() => setsearch("companies")}>Companies</button>
        </div>

        { search == "job" ? (
            <div className="flex h-16 w-full">
              <div className="h-full bg-blue-800 text-white px-3 flex items-center justify-center">
                <AiOutlineSearch size={20} />
              </div>

              <input className="flex-1 outline-none pl-1 md:pl-6 text-lg" />
              <button className="text-lg md:text-2xl text-white bg-yellow-400 px-2 md:px-3 flex items-center justify-center">
                Search
              </button>
            </div>
          )
          :(
            <div className="flex h-16 w-full">
              <div className="h-full bg-blue-800 text-white px-3 flex items-center justify-center">
                <AiOutlineSearch size={20} />
              </div>

              <input className="flex-1 outline-none pl-1 md:pl-6 text-lg" />
              <p className="text-lg md:text-2xl text-white bg-green-400 px-2 md:px-3 flex items-center justify-center">
                Search
              </p>
            </div>
          )
        }
      </div>
    </div>
  );
}
