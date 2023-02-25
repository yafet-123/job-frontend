import { VerticalNavbar } from "../components/Admin/VerticalNavbar";
import { DashBoard } from "../components/Admin/DashBoard";
import { AddNews } from "../components/Admin/AddNews";
import { useSession } from "next-auth/react";
import { useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { MainHeader } from '../components/MainHeader';
import React from 'react'



export default function Admin() {
  const [selected , setselected] = useState("dashboard")
  const { status, data } = useSession();
  // console.log(jobCategory)
  const router = useRouter();
  // useEffect(() => {
  //   if (status === "unauthenticated") router.replace("/auth/signin");
  // }, [status]);


  function handleChange(newValue) {
      setselected(newValue);
  }
  // if (status === "authenticated")
    return (
      <React.Fragment>
        <MainHeader title="Admin" />
        <div className="flex bg-neutral-300 dark:bg-slate-700">
          <VerticalNavbar onChange={handleChange} data={data} />
          
        </div>
      </React.Fragment>
  );

}

