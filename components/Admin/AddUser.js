import React from "react";
import { useState,useEffect, useContext} from 'react'

export function AddUser() {
    return (
        <div className="max-w-7xl mx-auto mt-10">
            <h1 className="text-black text-4xl font-bold text-center italic">Add User</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
                <input 
                    className="shadow appearance-none border rounded w-full py-4 px-3 text-xl text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="username" 
                    type="text"
                    placeholder="username"
                />

                <input 
                    className="shadow appearance-none border rounded w-full py-4 px-3 text-xl text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="username" 
                    type="email"
                    placeholder="Email"
                />

                <input 
                    className="shadow appearance-none border rounded w-full py-4 px-3 text-xl text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="username" 
                    type="password"
                    placeholder="password"
                />

                <input 
                    className="shadow appearance-none border rounded w-full py-4 px-3 text-xl text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="username" 
                    type="password"
                    placeholder="confirmPassword"
                />
            </div>

            <button 
                className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-4 py-4 text-center inline-flex items-center"
            >
                Submit
            </button>
        </div>
  );
}
