import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineSearch, AiOutlineFacebook } from "react-icons/ai";
import axios from 'axios';

export default function AdvanceSearch() {
	const [selected , setselected] = useState("")
  const [getSearchValue,setgetSearchValue] = useState("")
	const router = useRouter();
  const advanceSearchList = [
    { name: "Job Type", type:1 , style: "bg-blue-400", styleHover:"bg-blue-800"},
    { name: "Job Name", type:1 , style: "bg-green-400", styleHover:"bg-blue-400" },
    { name: "Company Name", type:1 , style: "bg-red-400", styleHover:"bg-red-800" },
  ];

  async function handleSearch(e){
      const data = await axios.post(`api/searchJob`,{
          "searchName": getSearchValue,
          "type": e
      }).then(function (response) {
          console.log(response.data);
      }).catch(function (error) {
          console.log(error);
      });
  }

  return (
    <section className="flex flex-col w-full h-screen bg-gray-200 dark:bg-slate-700">
      <div className="max-w-2xl mx-auto mt-10 w-full px-10 md:px-0">
      	<div className="flex h-16 w-full border rounded-2xl border-white dark:border-slate-800 border rounded-2xl">
          <div className="h-full bg-blue-800 text-white px-3 flex items-center justify-center">
            <AiOutlineSearch size={20} />
          </div>
          <input className="bg-white dark:bg-slate-800 flex-1 outline-none pl-1 md:pl-6 text-lg" />
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-10">
          {advanceSearchList.map((search, index) => (
            <button 
              key={index}
              onClick={()=> handleSearch(search.type)}
              className={`py-2 h-full text-lg hover:${search.styleHover} md:text-2xl text-white px-2 md:px-3 flex items-center justify-center border rounded-2xl ${search.style}`}
            >
              Search by {search.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
