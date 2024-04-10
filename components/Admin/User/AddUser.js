import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router'
import {DeleteUser} from './DeleteUser.js'
import {UpdateUser} from './UpdateUser.js'
import {FiEye, FiEyeOff} from 'react-icons/fi'
import BeatLoader from "react-spinners/BeatLoader";

export function AddUser() {
    const [typepassword, setTypepassword] = useState('password');
    const [typepasswordconfirm, setTypepasswordconfirm] = useState('password');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [UserName, setUserName] =useState("")
    const [email, setemail] = useState("")
    const [firstName, setfirstName] =useState("")
    const [lastName, setlastName] = useState("")
    const [age, setage] =useState("")
    const [password,setpassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passworderror,setpassworderror] = useState("")
    const [error,seterror] = useState("")
    async function register(e){
        e.preventDefault();
        if(confirmPassword === password){
            setpassworderror("")
            seterror("")
            setLoading(true)
            const data = await axios.post(`../api/registerUser`,{
                'UserName':UserName,
                'firstName':firstName,
                'lastName':lastName,
                'age':age,
                'Password':password,
                'email':email,
                'role':'admin'
            }).then(function (response) {
                console.log(response.data);
                router.reload()
            }).catch(function (error) {
                seterror("Creating user failed due to username is still exist or network error")
                setLoading(false)
            });
        }else{
            seterror("")
            setpassworderror("Password and confirm password should be same.")
            setLoading(false)
        }
                
    }

    return (
        <div className="px-0 lg:px-10 pt-20">
            <form className="max-w-7xl mx-auto mt-10" onSubmit={register} >
                <h1 className="text-black dark:text-white text-xl lg:text-4xl font-bold text-center italic">User</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-10 mx-2">
                    <div className="relative">
                        <input 
                            id="firstName" 
                            type="text" 
                            value={firstName}
                            required
                            className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            onChange={(e) => setfirstName(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            First Name
                        </label>
                    </div>
                    <div className="relative">
                        <input 
                            id="lastName" 
                            type="text" 
                            value={lastName}
                            required
                            className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            onChange={(e) => setlastName(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Last Name
                        </label>
                    </div>

                    <div className="relative">
                        <input 
                            id="age" 
                            type="text" 
                            value={age}
                            required
                            className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            onChange={(e) => setage(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Age
                        </label>
                    </div>

                    <div className="relative">
                        <input 
                            id="username" 
                            type="text" 
                            value={UserName}
                            required
                            className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            UserName
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-10 my-10 mx-2">
                    <div className="relative">
                        <input 
                            id="email" 
                            type="email" 
                            required
                            className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />

                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Email
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-10 mx-2">
                    <div className="relative">
                        <input 
                            id="password" 
                            required
                            type={typepassword}
                            className="block w-full px-3 text-sm lg:text-xl text-black dark:text-white bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        <div className="absolute right-10 text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-1/2">
                            {typepassword==="password"?(
                                <span className='icon-span' onClick={()=>setTypepassword("text")}>
                                  <FiEye size={30} />
                                </span>
                            ):(
                                <span className='icon-span' onClick={()=>setTypepassword("password")}>
                                  <FiEyeOff size={30} />
                                </span>
                            )}
                        </div>
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Password
                        </label>
                    </div>

                    <div className="relative">
                        <input 
                            id="ConfirmPassword" 
                            required
                            type={typepasswordconfirm}
                            className="block w-full px-3 text-sm lg:text-xl text-black dark:text-white bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="absolute right-10 text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-1/2">
                            {typepasswordconfirm==="password"?(
                                <span className='icon-span' onClick={()=>setTypepasswordconfirm("text")}>
                                  <FiEye size={30} />
                                </span>
                            ):(
                                <span className='icon-span' onClick={()=>setTypepasswordconfirm("password")}>
                                  <FiEyeOff size={30} />
                                </span>
                            )}
                        </div>
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Confirm Password
                        </label>
                    </div>
                </div>

                <div className="mx-2 my-5 lg:my-0 flex flex-col lg:flex-row justify-between">
                    <h1 className="text-red-600 dark:text-red-400 text-md lg:text-2xl font-bold text-left mb-5 lg:mb-0">
                        {passworderror || error}
                    </h1>
                    <button 
                        disabled={loading}
                        className={`float-right text-white font-medium rounded-lg text-xl p-4 text-center inline-flex items-center 
                            ${loading ? "bg-gray-200" : "bg-[#009688] hover:bg-[#009688] focus:ring-4 focus:ring-[#009688]" }`}
                    >
                        Submit
                    </button>
                </div>

                <div className="flex justify-center items-center mt-5">
                    <BeatLoader 
                        color="#36d7b7"
                        loading={loading}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </form>
        </div>
    );
}
