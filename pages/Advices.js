import React from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import {AdviceHead} from '../data/AdviceHead'
import { MainHeader } from '../components/MainHeader';

export default function Advices() {
	const router = useRouter()
  return (
    <React.Fragment>
      <MainHeader title="Advices" />
      <section className="flex flex-col w-full lg:h-screen px-5 lg:px-64 bg-[#ddd0c8] dark:bg-slate-700 pt-52">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10">
          { AdviceHead.map((data,index)=>(
            <button 
              className={`w-full flex flex-col justify-center items-center mb-10 my-10 p-10 rounded-xl ${data.backgroundColor}`} 
              key ={index}
              onClick = {()=>{
                router.push({
                  pathname:"/Advice",
                  query:{title:data.title}
                })
              }}
            >
              <h1 className="text-black text-3xl capitalize font-bold mb-5">{data.title}</h1>
              <p className="text-black text-xl font-normal mb-5">{data.description}</p>
            </button>
          ))}
        </div>
      </section>
    </React.Fragment>
  )
}