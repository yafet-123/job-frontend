import React from "react";
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';

export function DisplayUser({users}) {
    console.log(users)
    return (
        <div className="m-2 lg:m-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                { users.map((user,index)=>(
                    <div className="bg-white dark:bg-slate-800 p-5 border rounded-2xl" key={index}>
                        <div className="flex flex-col">
                            <h1 className="text-black dark:text-white flex justify-between my-5 font-bold text-lg md:text-xl">
                                Id 
                                <span className="font-normal font-medium text-left">{user.user_id}</span>
                            </h1>

                            <h1 className="text-black dark:text-white flex justify-between my-5 font-bold text-lg md:text-xl ">
                                UserName 
                                <span className="font-normal font-medium">{user.UserName}</span>
                            </h1>

                            <h1 className="text-black dark:text-white flex justify-between my-5 font-bold text-lg md:text-xl">
                                Email 
                                <span className={ `font-normal font-medium ${user.email ? " " : "text-red-800"}`}>
                                    { user.email ? user.email : "No Email Address" }
                                </span>
                            </h1>

                            <h1 className="text-black dark:text-white flex justify-between my-5 font-bold text-lg md:text-xl">
                                Created Date 
                                <span className="font-normal font-medium">{moment(user.CreatedDate).utc().format('YYYY-MM-DD')}</span>
                            </h1>

                            <h1 className="text-black dark:text-white flex justify-between my-5 font-bold text-lg md:text-xl">
                                Modified Date 
                                <span className="font-normal font-medium">{moment(user.ModifiedDate).utc().format('YYYY-MM-DD')}</span>
                            </h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  );
}
