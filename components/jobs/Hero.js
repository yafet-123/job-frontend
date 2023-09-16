import React, {useState} from "react";
import { AiOutlineSearch, AiOutlineFacebook } from "react-icons/ai";
import { FaFacebookF,FaLinkedinIn,FaTwitter,FaYoutube} from "react-icons/fa";
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { CiTwitter } from "react-icons/ci";
import AboutUsHeroImageOne from '../../public/images/bgImage1.avif';

export function Hero() {
  const [search,setsearch] = useState("job")
  const router = useRouter();
  const [searchValue, setsearchValue] = useState("")

  async function handleSearch(e){
        e.preventDefault()
        router.push({
          pathname: '/AdvanceSearch',
          query: { searchName: searchValue },
        })
    }


  return (
    <div className="w-full h-[20rem] lg:h-[20rem] bg-[#e6e6e6] bg-opacity-100 dark:bg-[#02201D] relative">
      <div className="absolute top-0 lg:top-20 flex flex-col justify-between left-0 right-0 m-auto w-full lg:w-[70%]">
        <h1 className={`px-3 lg:px-0 text-lg mb-3 lg:mb-10 font-bold md:text-2xl text-center lg:text-5xl italic text-[#445960] dark:text-white opacity-100`}>
          All Ethiopian Jobs in One Place.
        </h1>

        <h5 className="italic text-sm mb-3 lg:mb-10 font-bold md:text-lg text-center lg:text-2xl text-[#445960] opacity-100 dark:text-white">
          Find career opportunities in Ethiopia
        </h5>
        
        <form className="!h-16 w-full dark:border-slate-800 px-2" onSubmit={handleSearch}>
          <div className="flex flex-col lg:flex-row justify-center items-center ">
            <input 
              value={searchValue} 
              required  
              placeholder="Carer level, Job Type, Company Name , Employment type"                         
              onChange={(e) => setsearchValue(e.target.value)}
              className="text-black dark:text-white placeholder:font-bold mb-5 lg:mb-0 duration-1000 ease-in-out h-16 focus:w-full w-[90%] lg:w-[70%] bg-white dark:bg-[#1B2637] outline-none md:pl-2 text-sm lg:text-lg border border[#009688] border-l-2 rounded-xl mr-2" 
            />

            <div className="h-16 bg-[#009688] hover:bg-opacity-50 text-white lg:px-3 flex items-center justify-center border border[#009688] border-l-2 rounded-xl px-5">
              <AiOutlineSearch size={20} />
              <button 
                className="font-bold text-xs md:text-xl text-white bg-transparent lg:px-3 flex items-center justify-center "
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
