import React from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AdviceHeadData } from '../data/AdviceHead'
import { MainHeader } from '../components/MainHeader';

export default function Advices() {
	const router = useRouter()
  return (
    <React.Fragment>
      <MainHeader title="Hulu Media : Advices" />
      <section className="flex flex-col w-full lg:h-screen px-5 lg:px-52 bg-[#e6e6e6] dark:bg-[#02201D] pt-52">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10">
          { AdviceHeadData.map((data,index)=>(
            <button 
              className={`w-full flex flex-col justify-center items-center mb-10 my-10 p-10 rounded-xl hover:scale-110 duration-1000 ease-in-out ${data.backgroundColor}`} 
              key ={index}
              onClick = {()=>{
                router.push({
                  pathname:"/Advice",
                  query:{title:data.title, category_id:data.id}
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