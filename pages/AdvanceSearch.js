import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineSearch, AiOutlineFacebook } from "react-icons/ai";
import axios from 'axios';
import moment from 'moment';

export default function AdvanceSearch() {
	const [selected , setselected] = useState("")
  const [error , seterror] = useState("")
  const [getSearchValue,setgetSearchValue] = useState("")
	const router = useRouter();
  const [searchValue,setsearchValue] = useState([])
  const [type,settype] = useState()
  const advanceSearchList = [
    { type:1 , name: "Job Type" , style: "bg-blue-400", styleHover:"bg-blue-800"},
    { type:2 , name: "Job Name" , style: "bg-green-400", styleHover:"bg-blue-400" },
    { type:3 , name: "Company Name" , style: "bg-red-400", styleHover:"bg-red-800" },
  ];

  async function handleSearch(e){
    settype(e)
    setsearchValue([])
    if(getSearchValue == ""){
        seterror("Please Insert a value")
        setsearchValue([])
    }else{
      const data = await axios.post(`api/searchClientJob`,{
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
        seterror("")       
        }).catch(function (error) {
            console.log(error);
        });
      }
    }

  console.log(searchValue)

  return (
    <section className="flex flex-col w-full h-screen bg-gray-200 dark:bg-slate-700">
      <div className="max-w-2xl mx-auto my-10 w-full px-10 md:px-0">
      	<div className="flex h-16 w-full border rounded-2xl border-white dark:border-slate-800 border rounded-2xl">
          <div className="h-full bg-blue-800 text-white px-3 flex items-center justify-center">
            <AiOutlineSearch size={20} />
          </div>
          <input
            id="search"
            type="text"
            value={getSearchValue}
            onChange={(e) => setgetSearchValue(e.target.value)} 
            className="bg-white dark:bg-slate-800 flex-1 outline-none pl-1 md:pl-6 text-lg" 
          />
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

      { error == "" ? 
        <div>
          { searchValue == "" ? 
            <h1 className="text-black dark:text-white text-xl font-bold text-center italic">
                No data can be found
            </h1>
            :
            <div className="md:max-w-7xl md:mx-auto bg-gray-200 dark:bg-slate-800 w-full h-[40rem] border dark:border-slate-800 rounded-lg md:mt-10 shadow-2xl shadow-sky-200 flex flex-col overflow-y-scroll">
              {searchValue.map((data, index) => (
                <button
                  className="flex justify-around items-center mb-5 even:bg-white dark:bg-slate-700 px-10 py-5 group"
                  key={index}
                  type = "button"
                  onClick = {()=>{
                    router.push({
                      pathname:"/DisplayJobs",
                      query:{job_id:data.job_id}
                    })
                  }}
                >
                  <div className="flex flex-col w-1/2">
                    <h1 className="text-left font-bold text-sm md:text-lg lg:text-xl text-blue-500 dark:text-white group-hover:text-orange-500">
                      {data.JobsType}
                    </h1>
                    <h1 className="text-left font-light text-xs md:text-sm lg:text-lg text-blue-500 dark:text-white group-hover:text-orange-500">
                      {data.CompanyName}
                    </h1>
                  </div>
                  <div className="flex flex-col w-1/2">
                    <h1 className="font-light text-xs md:text-sm lg:text-lg text-blue-500 dark:text-white text-right group-hover:text-orange-500">
                      {moment(data.createDate).utc().format('YYYY-MM-DD')}
                    </h1>
                    <h1 className="font-light text-xs md:text-sm lg:text-lg text-blue-500 dark:text-white text-right group-hover:text-orange-500">
                      {data.Location}
                    </h1>
                  </div>
                </button>
              ))}
            </div>
          }
        </div>
        :
        <h1 className="text-black dark:text-white text-xl font-bold text-center italic">{error}</h1>
      }
    </section>
  );
}
