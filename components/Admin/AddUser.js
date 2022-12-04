import React from "react";
import { useState,useEffect, useContext} from 'react'

export function AddUser() {
    const [UserName, setUserName] =useState("")
    const [email, setemail] = useState("")
    const [password,setpassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    async function handleSearch(e){
        const data = await axios.post(`api/searchPatient`,{
            "searchName": getSearchValue,
            "type": e
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="max-w-7xl mx-auto mt-10">
            <h1 className="text-black text-4xl font-bold text-center italic">Add User</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
                <div className="relative">
                    <input 
                        id="username" 
                        type="text" 
                        className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={UserName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <label 
                        for="floating_outlined" 
                        className="absolute text-xl text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        UserName
                    </label>
                </div>

                <div className="relative">
                    <input 
                        id="email" 
                        type="email" 
                        className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                    <label 
                        for="floating_outlined" 
                        className="absolute text-xl text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        Email
                    </label>
                </div>

                <div className="relative">
                    <input 
                        id="password" 
                        type="password" 
                        className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                    <label 
                        for="floating_outlined" 
                        className="absolute text-xl text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        Password
                    </label>
                </div>

                <div className="relative">
                    <input 
                        id="ConfirmPassword" 
                        type="password" 
                        className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label 
                        for="floating_outlined" 
                        className="absolute text-xl text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        Confirm Password
                    </label>
                </div>
            </div>

            <button 
                className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-4 py-4 text-center inline-flex items-center"
            >
                Submit
            </button>
        </div>
  );
}
