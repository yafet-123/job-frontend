import React from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import {AdviceHead} from '../data/AdviceHead'

export default function Advices() {
	const router = useRouter()
  return (
    <section className="flex flex-col w-full h-full px-5 md:px-10 bg-gray-300 dark:bg-slate-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
  )
}