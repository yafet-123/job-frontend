import React, {useState} from "react";
import { AiOutlineSearch, AiOutlineFacebook } from "react-icons/ai";
import { FaFacebookF,FaLinkedinIn,FaTwitter,FaYoutube} from "react-icons/fa";
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { CiTwitter } from "react-icons/ci";
import AboutUsHeroImageOne from '../public/images/bgImage1.avif';

export function HomeHero() {
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
        "type": e
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
    <div className="w-full h-[50rem] bg-[#ddd0c8] dark:bg-slate-700 relative">
      <div className="absolute top-44 flex flex-col justify-between left-0 right-0 m-auto w-full lg:w-[70%]">
        <h1 className='text-green-700 text-2xl mb-10 font-bold md:text-4xl lg:text-5xl'>
          Hulu Media Hulu Neger
        </h1>

        <div>
          <div className="flex h-16 w-[70%] border rounded-2xl border-white dark:border-slate-800 rounded-2xl">
              <div className="h-full bg-blue-800 text-white lg:px-3 flex items-center justify-center">
                <AiOutlineSearch size={20} />
              </div>
              <input 
                value={searchValue}                            
                onChange={(e) => setsearchValue(e.target.value)}
                className="flex-1 bg-white outline-none md:pl-6 text-sm lg:text-lg" />
              <button 
                onClick={()=> router.push({
                  pathname: '/AdvanceSearch',
                  query: { searchName: searchValue, searchtype: 1 },
                })} 
                className="text-xs md:text-xl text-white bg-green-400 lg:px-3 flex items-center justify-center"
              >
                Search
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
