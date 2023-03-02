import React, {useState,useEffect} from "react";
import moment from 'moment';
import { useRouter } from 'next/router'

export function Content({indvidualCourses}) {
     const router = useRouter()
     return (
            <div className="w-full h-full mt-10 lg:mt-0 px-20">
                <div  className="!text-black mt-5 " dangerouslySetInnerHTML={{ __html: indvidualCourses.content }} />
            </div>
     )
}
     