import React, {useState,useEffect} from "react";
import moment from 'moment';
import { useRouter } from 'next/router'

export function Content({indvidualCourses}) {
    console.log(indvidualCourses)
    const router = useRouter()
    return (
            <div className="w-full h-full mt-10 lg:mt-0 px-3 lg:px-20">
                <h1 className="text-left lg:text-center pt-3 lg:pt-10 group-hover:underline text-lg lg:text-2xl font-extrabold dark:text-slate-300 text-slate-600 tracking-wide leading-snug mb-5">
                    {indvidualCourses[0]?.title}
                </h1>
                <div  className="!text-black mt-5 pt-10" dangerouslySetInnerHTML={{ __html: indvidualCourses[0]?.content }} />
            </div>
     )
}
     