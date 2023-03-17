import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineSearch, AiOutlineFacebook } from "react-icons/ai";
import axios from 'axios';
import moment from 'moment';
import { MainHeader } from '../components/MainHeader';

export default function AdvanceSearch() {
  const router = useRouter();
  const { searchName } = router.query
  const { searchtype } = router.query
	const [selected , setselected] = useState("")
  const [error , seterror] = useState("")
  const [getSearchValue,setgetSearchValue] = useState(searchName)
  const [searchValue,setsearchValue] = useState([])
  const [type,settype] = useState(searchtype)
  const advanceSearchList = [
    { type:1 , name: "Job Type" , styleHover:"bg-green-800" , style: "bg-blue-400"},
    { type:2 , name: "Career Level", styleHover:"bg-green-800" , style: "bg-green-400"},
    { type:3 , name: "Company Name" , styleHover:"bg-red-800" , style: "bg-red-400" },
    { type:4 , name: "Employment Type" , styleHover:"bg-sky-800" , style: "bg-sky-400" },  
  ];

  console.log(getSearchValue)

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
    <React.Fragment>
      <MainHeader title="AdvanceSearch" />
      <div className="flex flex-col bg-[#ddd0c8] dark:bg-slate-700 pt-32 px-3 lg:px-32">
        <div className="max-w-2xl mx-auto my-10 w-full md:px-0">
        	<div className="flex h-16 w-full border rounded-2xl border-white dark:border-slate-800 border">
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

        <div className="mx-2 lg:mx-52 mt-10 grid grid-cols-2 md:grid-cols-3 gap-10">
            {advanceSearchList.map((search, index) => (
              <button 
                key={search.type}
                onClick={()=> {
                  handleSearch()
                  settype(search.type)
                }}
                className={`py-2 py-5 text-lg ${search.style} hover:${search.styleHover} md:text-2xl text-white px-2 md:px-3 flex items-center justify-center border rounded-2xl`}
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
              <div className="flex flex-col w-full bg-[#ddd0c8] dark:bg-slate-700 p-3 lg:border-l-2 px-3 lg:px-20">
                {searchValue?.map((data, index) => (
                  <div key={index} className="flex flex-col w-full bg-[#d1cbc7] dark:bg-slate-800 mb-10 p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <Link href="/DisplayJobs">
                          <a className="text-sm lg:text-2xl text-blue-600 font-bold">Job Type: {data.JobsType} </a>
                        </Link>
                        <p className="text-xs lg:text-lg text-blue-500">Posted: {moment(data.ModifiedDate).utc().format('MMM DD')}</p>
                      </div>

                      <div className="flex flex-col-reverse md:flex-row">
                        <ul className="mt-10 w-full lg:w-3/4">
                          <li className="flex flex-row justify-between items-center w-full mb-5">
                            <h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Company Name:</h1>
                            <p className="text-xs lg:text-lg text-left w-1/2">{data.CompanyName}</p>
                          </li>

                          <li className="flex flex-row justify-between items-center w-full mb-5">
                            <h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Location:</h1>
                            <p className="text-xs lg:text-lg text-left w-1/2">{data.Location}</p>
                          </li>

                          <li className="flex flex-row justify-between items-center w-full mb-5">
                            <h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Career Level:</h1>
                            <p className="text-xs lg:text-lg text-left w-1/2">{data.CareerLevel}</p>
                          </li>

                          <li className="flex flex-row justify-between items-center w-full mb-5">
                            <h1 className="text-md lg:text-xl font-bold capitalize text-left w-1/2">Dead Line</h1>
                            <p className="text-xs lg:text-lg text-left w-1/2">{moment(data.DeadLine).utc().format('MMM DD')}</p>
                          </li>
                        </ul>

                         <Image src="/images/vercel.svg" width={100} height={100} alt="image" />
                      </div>

                      <div 
                        className="text-sm lg:text-lg font-normal mb-5 h-36 overflow-hidden" 
                        dangerouslySetInnerHTML={{ __html: data.JobsDescreption }} 
                      />

                      <Link 
                        href={{
                          pathname: '/DisplayJobs',
                          query:{job_id:data.job_id}
                        }}
                      >
                        <a className="my-5 text-yellow-600 text-sm lg:text-xl">
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
    </React.Fragment>
  );
}
