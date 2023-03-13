import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import {AdviceHead} from '../data/AdviceHead'
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {MdOutlineSubject} from 'react-icons/md'
import { MainHeader } from '../components/MainHeader';
import { HowToWriteCv } from "../components/Advices/HowToWriteCv"
import { JobInterview } from "../components/Advices/JobInterview"
import { JobSearchTips } from "../components/Advices/JobSearchTips"


import { AdviceSideBar } from "../components/AdviceSideBar"

export default function Advice() {
	const [selected , setselected] = useState("How To Write Cv")
	const router = useRouter();
  const { title} = router.query

  const [adviceList, setadviceList] = useState(false);
  const handleAdviceList = () => {
    setadviceList(!adviceList);
  };

  const [advices, setadvices] = useState(false);
  const handleadvices = () => {
    setadvices(!advices);
  };

  function handleChange(newValue) {
      setselected(newValue);
  }

  return (
    <React.Fragment>
      <MainHeader title="Advice" />
      <section className="flex flex-col w-full h-full bg-[#ddd0c8] dark:bg-slate-600 pt-32 px-5 lg:px-44">
      	<div className="flex lg:hidden w-full h-16 bg-[#d1cbc7] flex flex-row items-center px-5 lg:px-10 justify-between">
      		<div onClick={handleAdviceList} className="md:hidden text-white z-10">
            <MdOutlineSubject size={30} /> 
          </div>

          <button onClick={handleadvices} className="lg:hidden text-white flex items-center">
            <span className="ml-5 font-bold text-xl hover:text-blue-400">Advices</span>
          </button>
      	</div>
      	<div className="flex flex-col lg:flex-row h-full px-0 lg:px-5">
      		<div className="hidden lg:flex w-1/4 h-screen bg-[#d1cbc7] dark:bg-slate-800 overflow-y-scroll scroll_width sticky top-20 bottom-0">
      			<AdviceSideBar title={title} onChange={handleChange} handleAdviceList={handleAdviceList} /> 
      		</div>

      		<div className="w-full lg:w-3/4 h-full bg-[#d1cbc7] dark:bg-slate-700">
      			{ title == "Carer Advice For job seeker" && selected == "How To Write Cv" && <HowToWriteCv />}
            { title == "Carer Advice For job seeker" && selected == "Job Interview" && <JobInterview />}
            { title == "Carer Advice For job seeker" && selected == "Job Search Tips" && <JobSearchTips />}
      		</div>
      	</div>

      	<div
          className={
            adviceList
              ? "md:hidden fixed left-0 top-20 w-full h-screen bg-black/70 dark:bg-slate-700 z-10"
              : ""
          }
        >
          <div
            className={
              adviceList
                ? "fixed left-0 top-20 w-[70%] h-screen bg-white py-10 ease-in duration-500"
                : "fixed left-[-100%] top-20 ease-in duration-500"
            }
          >
            <div>
                <div
                  onClick={handleAdviceList}
                  className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer float-right mr-5"
                >
                  <AiOutlineClose size={15} />
                </div> 
            </div>
            <div className="py-4 flex flex-col mt-10 w-full overflow-y-scroll scroll_width">
              <AdviceSideBar title={title} onChange={handleChange} handleAdviceList={handleAdviceList} />
            </div>
          </div>
        </div>

        <div
          className={
            advices
              ? "md:hidden fixed left-0 top-20 w-full h-screen bg-black/70 dark:bg-slate-700 z-10"
              : ""
          }
        >
          <div
            className={
              advices
                ? "fixed right-0 top-20 w-[70%] h-screen bg-white py-10 ease-in duration-500"
                : "fixed right-[-100%] top-20 ease-in duration-500"
            }
          >
            <div>
              
                <div
                  onClick={handleadvices}
                  className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer float-left ml-3"
                >
                  <AiOutlineClose size={15} />
                </div> 
            </div>
            <div className="py-4 flex flex-col mt-10 w-full">
              <h1 className="text-center font-bold text-xl">Job Category</h1>
              { AdviceHead.map((data,index)=>(
                <button 
                  onClick = {()=>{
                    router.push({
                      pathname:"/Advice",
                      query:{title:data.title}
                    })
                    handleadvices()
                  }}
                  key={index} 
                  className={
                    router.query.title == data.title
                      ? "w-full pl-5 mt-5 p-3 text-xl text-left font-normal text-black hover:bg-gray-300 hover:text-orange-500 hover:bg-gray-300 hover:text-orange-500"
                      : "w-full pl-5 mt-5 p-3 text-xl text-left font-normal text-black hover:bg-gray-300 hover:text-orange-500"
                    }
                >
                  {data.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
