import React from "react";
import { useState,useEffect, useContext} from 'react'

export function DisplayUser({users}) {
    console.log(users)
    return (
        <div className="m-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                { users.map((user,index)=>(
                    <div className="bg-white p-5 border rounded-2xl" key={index}>
                        <div className="flex flex-col">
                            <h1 className="flex justify-between my-5 font-bold text-lg md:text-xl">
                                Id 
                                <span className="font-normal font-medium">{user.user_id}</span>
                            </h1>

                            <h1 className="flex justify-between my-5 font-bold text-lg md:text-xl ">
                                UserName 
                                <span className="font-normal font-medium">{user.UserName}</span>
                            </h1>

                            <h1 className="flex justify-between my-5 font-bold text-lg md:text-xl">
                                Email 
                                <span className="font-normal font-medium">{user.email}</span>
                            </h1>

                            <h1 className="flex justify-between my-5 font-bold text-lg md:text-xl">
                                Password 
                                <span className="font-normal font-medium">{user.Password}</span>
                            </h1>
                        
                            <h1 className="flex justify-between my-5 font-bold text-lg md:text-xl">
                                Email 
                                <span className="font-normal font-medium">{user.CreatedDate}</span>
                            </h1>

                            <h1 className="flex justify-between my-5 font-bold text-lg md:text-xl">
                                Password 
                                <span className="font-normal font-medium">{user.ModifiedDate}</span>
                            </h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  );
}
