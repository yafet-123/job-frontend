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
        <h1 className={`px-3 text-2xl mb-10 font-bold md:text-4xl lg:text-5xl ${ search == "job" ? " text-green-700 " : "text-yellow-500" } `}>
          Hulu Media Hulu Neger
        </h1>
      </div>
    </div>
  );
}
