import React, {useState} from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from 'next/router'

export const SearchBar = () => {
  const [searchValue, setsearchValue] = useState("")
  const router = useRouter();
  return (
    <div className="lg:px-2 my-10">
       <div className="flex flex-col justify-center items-center ">
         <input 
           value={searchValue}   
           placeholder="Enter Search Term ..."                         
           onChange={(e) => setsearchValue(e.target.value)}
           className="px-10 text-black dark:text-white placeholder:font-bold mb-5 lg:mb-0 duration-1000 ease-in-out h-16 focus:w-[90%] lg:focus:w-[60%] w-[80%] lg:w-[50%] bg-white dark:bg-[#1B2637] outline-none md:pl-2 text-sm lg:text-lg border border[#009688] border-l-2 rounded-xl mr-2" 
         />
        <div className="h-16 bg-[#009688] hover:bg-opacity-50 text-white dark:text-black lg:px-3 flex items-center justify-center border border[#6471DD] border-l-2 rounded-xl px-5 mt-5">
          <AiOutlineSearch size={20} />
          <button className="font-bold text-xs md:text-xl text-white dark:text-black lg:px-3 flex items-center justify-center">
            Search
          </button>
        </div>
          </div>
        </div>
  );
};