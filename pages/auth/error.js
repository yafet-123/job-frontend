import React from 'react'
import { MainHeader } from '../../components/MainHeader';
import { useRouter } from "next/router";

export default function Error () {
  const { error } = useRouter().query;
  console.log(error)
  return(
    <React.Fragment>
      <MainHeader title="SignIn Error Page" />
      <div className="w-full h-screen bg-gray-100 dark:bg-slate-700 pt-24">
        <div className="flex flex-col justify-center items-center ">
          <p>{error}</p>
        </div>
      </div>
    </React.Fragment>
  )
};