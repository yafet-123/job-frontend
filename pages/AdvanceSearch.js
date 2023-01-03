import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineSearch, AiOutlineFacebook } from "react-icons/ai";
import axios from 'axios';
import moment from 'moment';

export default function AdvanceSearch() {
  const router = useRouter();
  const { searchName } = router.query
  const { searchtype } = router.query
  console.log(searchName)
	const [selected , setselected] = useState("")
  const [error , seterror] = useState("")
  const [getSearchValue,setgetSearchValue] = useState(searchName)
  const [searchValue,setsearchValue] = useState([])
  const [type,settype] = useState(searchtype)
  const advanceSearchList = [
    { type:1 , name: "Job Type" , style: "bg-blue-400", styleHover:"bg-blue-800"},
    { type:2 , name: "CareerLevel" , style: "bg-green-400", styleHover:"bg-blue-400" },
    { type:3 , name: "Company Name" , style: "bg-red-400", styleHover:"bg-red-800" },
    { type:4 , name: "Employment Type" , style: "bg-sky-400", styleHover:"bg-sky-800" },
    { type:5 , name: "Employment Type" , style: "bg-orange-400", styleHover:"bg-orange-800" },
    
  ];

  useEffect(()=>{
    handleSearch()
  },[])

  async function handleSearch(){
    if(getSearchValue == ""){
        seterror("Please Insert a value")
        setsearchValue([])
    }else{
      const data = await axios.post(`api/searchClientJob`,{
          "searchName": getSearchValue,
          "type": type
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
    <div className="flex flex-col bg-gray-200 dark:bg-slate-700">
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
      </div>

      <div className="mx-10 lg:mx-52 mt-10 grid grid-cols-2 md:grid-cols-3 gap-10">
          {advanceSearchList.map((search, index) => (
            <button 
              key={index}
              onClick={()=> {
                handleSearch()
                settype(search.type)
              }}
              className={`py-2 py-5 text-lg hover:${search.styleHover} md:text-2xl text-white px-2 md:px-3 flex items-center justify-center border rounded-2xl ${search.style}`}
            >
              Search by {search.name}
            </button>
          ))}
        </div>

      { error == "" ? 
        <div>
          { searchValue == "" ? 
            <h1 className="text-black dark:text-white text-xl font-bold text-center italic">
                No data can be found
            </h1>
            :
            <div className=" flex flex-col w-full lg:w-full bg-gray-200 dark:bg-slate-700 p-3 lg:border-l-2 px-5 lg:px-20">
              {searchValue?.map((data, index) => (
                <div key={index} className="flex flex-col w-full bg-gray-300 dark:bg-slate-800 mb-10 p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <Link href="/DisplayJobs">
                        <a className="text-2xl text-blue-600 font-bold">Job Type: {data.JobsType} </a>
                      </Link>
                      <p className="text-lg text-blue-500">Posted: {moment(data.ModifiedDate).utc().format('MMM DD')}</p>
                    </div>

                    <div className="flex flex-col-reverse md:flex-row items-center">
                      <ul className="mt-10 w-3/4">
                        <li className="flex flex-row justify-between w-full mb-5">
                          <h1 className="text-xl font-bold capitalize text-left w-1/2">Company Name:</h1>
                          <p className="text-lg text-left w-1/2">{data.CompanyName}</p>
                        </li>

                        <li className="flex flex-row justify-between w-full mb-5">
                          <h1 className="text-xl font-bold capitalize text-left w-1/2">Location:</h1>
                          <p className="text-lg text-left w-1/2">{data.Location}</p>
                        </li>

                        <li className="flex flex-row justify-between w-full mb-5">
                          <h1 className="text-xl font-bold capitalize text-left w-1/2">Career Level:</h1>
                          <p className="text-lg text-left w-1/2">{data.CareerLevel}</p>
                        </li>

                        <li className="flex flex-row justify-between w-full mb-5">
                          <h1 className="text-xl font-bold capitalize text-left w-1/2">Dead Line</h1>
                          <p className="text-lg text-left w-1/2">{moment(data.DeadLine).utc().format('MMM DD')}</p>
                        </li>
                      </ul>

                       <Image src="/images/vercel.svg" width={100} height={100} alt="image" />
                    </div>

                    <div 
                      className="text-lg font-normal mb-5 h-36 overflow-hidden" 
                      dangerouslySetInnerHTML={{ __html: data.JobsDescreption }} 
                    />

                    <Link 
                      href={{
                        pathname: '/DisplayJobs',
                        query:{job_id:data.job_id}
                      }}
                    >
                      <a className="my-5 text-yellow-600 text-xl">
                        view detail
                      </a>
                    </Link>
                  </div>
              ))}
            </div>
          }
        </div>
        :
        <h1 className="text-black dark:text-white text-xl font-bold text-center italic">{error}</h1>
      }
    </div>
  );
}
