import React, {useState} from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Image from 'next/future/image'
import { useRouter } from 'next/router'

export function Hero() {
  const [search,setsearch] = useState("job")
  const router = useRouter();
  const [searchValue, setsearchValue] = useState("")

  return (
    <div className="w-full h-[20rem] lg:h-[25rem] bg-[#e6e6e6] bg-opacity-100 dark:bg-[#02201D] relative">
      <div className="absolute top-32 lg:top-44 flex flex-col justify-between left-0 right-0 m-auto w-full lg:w-[70%] px-2 lg:text-lg">
        <h1 className="px-3 lg:px-0 text-lg mb-3 lg:mb-10 font-bold md:text-2xl text-center lg:text-5xl italic text-[#445960] dark:text-white opacity-100">
          Hulu Media Hulu Neger
        </h1>

        <div className="!h-16 w-full dark:border-slate-800 px-2">
          <div className="flex flex-col lg:flex-row justify-center items-center ">
            <input 
              value={searchValue}   
              placeholder="Carer level, Job Type, Company Name , Employment type"                         
              onChange={(e) => setsearchValue(e.target.value)}
              className="text-black dark:text-white placeholder:font-bold mb-5 lg:mb-0 duration-1000 ease-in-out h-16 focus:w-full w-[90%] lg:w-[70%] bg-white dark:bg-[#1B2637] outline-none md:pl-2 text-sm lg:text-lg border border[#009688] border-l-2 rounded-xl mr-2" 
            />

            <div className="h-16 bg-[#009688] text-white lg:px-3 flex items-center justify-center border border[#009688] border-l-2 rounded-xl px-5">
              <AiOutlineSearch size={20} />
              <button 
                onClick={()=> router.push({
                  pathname: '/AdvanceSearch',
                  query: { searchName: searchValue },
                })} 
                className="font-bold text-xs md:text-xl text-white bg-[#009688] lg:px-3 flex items-center justify-center "
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
