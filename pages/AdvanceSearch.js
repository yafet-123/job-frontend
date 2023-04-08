import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineSearch, AiOutlineFacebook } from "react-icons/ai";
import axios from 'axios';
import moment from 'moment';
import { MainHeader } from '../components/common/MainHeader';
import { CompanyJobs } from '../components/jobs/CompanyJobs'
import RiseLoader from "react-spinners/RiseLoader";

export default function AdvanceSearch() {
  const router = useRouter();
  const shareUrl = router.asPath
  const { searchName } = router.query
	const [selected , setselected] = useState("")
  const [error , seterror] = useState("")
  const [getSearchValue,setgetSearchValue] = useState(searchName)
  const [searchValue,setsearchValue] = useState([])
  const [loading, setloading] = useState(false)
  useEffect(()=>{
    handleSearch()
  },[])

  async function handleSearch(){
    if(getSearchValue == ""){
        seterror("Please Insert a value")
        setsearchValue([])
    }
    else{
      setloading(true)
      const data = await axios.post(`api/searchClientJob`,{
          "searchName": getSearchValue,
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
            setloading(false)
        });
        setloading(false)
      }
    }

  return ( 
    <React.Fragment>
      <MainHeader title="AdvanceSearch" />
      <div className="flex flex-col bg-[#e6e6e6] bg-opacity-100 dark:bg-[#02201D] pt-32 px-3 lg:px-72">
        <div className="!h-16 w-full dark:border-slate-800 px-2 my-10" >
          <div className="flex flex-col lg:flex-row justify-center items-center" >
            <input 
              value={getSearchValue}   
              placeholder="Carer level, Job Type, Company Name , Employment type"                         
              onChange={(e) => setgetSearchValue(e.target.value)}
              className="text-black dark:text-white placeholder:font-bold mb-5 lg:mb-0 duration-1000 ease-in-out h-16 focus:w-full w-[90%] lg:w-[70%] bg-white dark:bg-[#1B2637] outline-none md:pl-2 text-sm lg:text-lg border border[#009688] border-l-2 rounded-xl mr-2" 
            />

            <div className="h-16 bg-[#009688] hover:bg-opacity-50 text-white lg:px-3 flex items-center justify-center border border[#009688] border-l-2 rounded-xl px-5">
              <AiOutlineSearch size={20} />
              <button 
                onClick={() => handleSearch()}
                className="font-bold text-xs md:text-xl text-white bg-transparent lg:px-3 flex items-center justify-center "
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center my-5">
          <RiseLoader 
            color="#36d7b7"
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>

        { error == "" ? 
          <div>
            { searchValue == "" ? 
              <h1 className="text-black dark:text-white text-xl font-bold text-center italic my-5">
                  { loading ?  "please wait ..." : "No data can be found"}
              </h1>
              :
              <CompanyJobs jobs={searchValue} shareUrl={shareUrl} />
            }
          </div>
          :
          <h1 className="text-black dark:text-white text-xl font-bold text-center italic">{error}</h1>
        }
      </div>
    </React.Fragment>
  );
}
