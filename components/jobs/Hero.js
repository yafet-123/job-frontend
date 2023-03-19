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
  const SearchList = [
    { type: 1, name: "job Type",},
    { type: 2, name: "Companies",},
  ];

  async function handleSearch(e){
    const data = await axios.post(`api/searchAdmin`,{
        "searchName": getSearchValue,
        "type": 1
    }).then(function (response) {
      const objOneData = response.data
          if(Array.isArray(objOneData)){
              setsearchValue(objOneData)
          }else{
              const values = []
              values.push(objOneData)
              setsearchValue(values)
          }
      }).catch(function (error) {
          console.log(error);
      });
  }


  return (
    <div className="w-full h-[20rem] lg:h-[25rem] bg-[#e6e6e6] bg-opacity-100 dark:bg-slate-700 relative">
      <div className="absolute top-0 lg:top-20 flex flex-col justify-between left-0 right-0 m-auto w-full lg:w-[70%]">
        <h1 className={`px-3 lg:px-0 text-lg mb-3 lg:mb-10 font-bold md:text-2xl text-center lg:text-5xl italic text-[#445960] opacity-100`}>
          All Ethiopian Jobs in One Place.
        </h1>

        <h5 className="italic text-sm mb-3 lg:mb-10 font-bold md:text-lg text-center lg:text-2xl text-[#445960] opacity-100">
          Find career opportunities in Ethiopia
        </h5>
        
        <div className="!h-16 w-full dark:border-slate-800 px-2">
          <div className="flex flex-col lg:flex-row justify-center items-center ">
            <input 
              value={searchValue}   
              placeholder="Carer level, Job Type, Company Name , Employment type"                         
              onChange={(e) => setsearchValue(e.target.value)}
              className="mb-5 lg:mb-0 duration-1000 ease-in-out delay-500 h-16 focus:w-full w-[90%] lg:w-1/2 bg-white outline-none md:pl-2 text-sm lg:text-lg border border[#009688] border-l-2 rounded-xl mr-2" 
            />

            <div className="h-16 bg-[#009688] text-white lg:px-3 flex items-center justify-center border border[#009688] border-l-2 rounded-xl px-5">
              <AiOutlineSearch size={20} />
              <button 
                onClick={()=> router.push({
                  pathname: '/AdvanceSearch',
                  query: { searchName: searchValue, searchtype: 1 },
                })} 
                className="text-xs md:text-xl text-white bg-[#009688] lg:px-3 flex items-center justify-center "
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
