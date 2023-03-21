import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AdviceHeadData } from '../data/AdviceHead'
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdOutlineSubject } from 'react-icons/md'
import { MainHeader } from '../components/MainHeader';
import { HowToWriteCv } from "../components/Advices/HowToWriteCv"
import { JobInterview } from "../components/Advices/JobInterview"
import { JobSearchTips } from "../components/Advices/JobSearchTips"
import { AdviceSideBar } from "../components/Advices/AdviceSideBar"
import { AdviceVerticalBar } from "../components/Advices/AdviceVerticalBar"

export default function Advice() {
	const [selected , setselected] = useState("How To Write Cv")
	const router = useRouter();
  const { title } = router.query


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
      <MainHeader title="Hulu Media : Advice" />
      <section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-32 px-2 lg:px-44">
      	<div className="bg-gray-200 dark:bg-slate-700 flex lg:hidden w-full h-16 flex flex-row items-center px-5 lg:px-10 justify-between mb-5">
      		<div onClick={handleAdviceList} className="md:hidden text-white z-10 text-black dark:text-white">
            <MdOutlineSubject size={30} /> 
          </div>
      	</div>

        <div className="flex flex-col px-0 lg:px-5">
          <AdviceVerticalBar />
        	<div className="flex flex-col lg:flex-row h-full ">
        		<div className="hidden lg:flex w-1/4 h-screen bg-gray-200 dark:bg-slate-700 overflow-y-scroll scroll_width sticky top-20 bottom-0">
        			<AdviceSideBar title={title} onChange={handleChange} handleAdviceList={handleAdviceList} /> 
        		</div>

        		<div className="w-full lg:w-3/4 h-full bg-gray-200 dark:bg-slate-700">
        			{ title == "Carer Advice For job seeker" && selected == "How To Write Cv" && <HowToWriteCv />}
              { title == "Carer Advice For job seeker" && selected == "Job Interview" && <JobInterview />}
              { title == "Carer Advice For job seeker" && selected == "Job Search Tips" && <JobSearchTips />}
        		</div>
        	</div>
        </div>

      	<div
          className={
            adviceList
              ? "md:hidden fixed left-0 top-20 w-full h-screen bg-gray-200 dark:bg-slate-700 z-10"
              : ""
          }
        >
          <div
            className={
              adviceList
                ? "fixed left-0 top-20 w-[70%] h-screen bg-gray-300 dark:bg-slate-800 py-10 ease-in duration-500"
                : "fixed left-[-100%] top-20 ease-in duration-500"
            }
          >
            <div>
                <div
                  onClick={handleAdviceList}
                  className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer text-black dark:text-white float-right mr-5"
                >
                  <AiOutlineClose size={15} />
                </div> 
            </div>
            <div className="py-4 flex flex-col mt-10 w-full overflow-y-scroll scroll_width">
              <AdviceSideBar title={title} onChange={handleChange} handleAdviceList={handleAdviceList} />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
