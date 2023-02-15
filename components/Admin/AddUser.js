import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router'
import {DeleteUser} from './DeleteUser.js'
import {UpdateUser} from './UpdateUser.js'
import {FiEye, FiEyeOff} from 'react-icons/fi'

export function AddUser({users}) {
    const [typepassword, setTypepassword] = useState('password');
    const [typepasswordconfirm, setTypepasswordconfirm] = useState('password');
    const router = useRouter();
    const [UserName, setUserName] =useState("")
    const [email, setemail] = useState("")
    const [password,setpassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deleteuserid,setdeleteuserid] = useState()
    const [updateuserid,setupdateuserid] = useState()
    const [updateemail, setupdateemail] = useState("")
    const [updateusername,setupdateusername] = useState("")
    const [passworderror,setpassworderror] = useState("")
    const [error,seterror] = useState("")
    async function register(e){
        e.preventDefault();
        if(confirmPassword === password){
            setpassworderror("")
            seterror("")
            const data = await axios.post(`api/registerUser`,{
                'UserName':UserName,
                'Password':password,
                'email':email,
                'role':'admin'
            }).then(function (response) {
                console.log(response.data);
                router.reload()
            }).catch(function (error) {
                seterror("Creating user failed due to username is still exist or network error")
            });
        }else{
            seterror("")
            setpassworderror("Password and confirm password should be same.")
        }
                
    }

    const clickedFordelete = () => {
        setdeleteModalOn(true)
    }

    const clickedForupdate = () => {
        setupdateModalOn(true)
    }

    return (
        <div className="px-0 lg:px-10">
            <form className="max-w-7xl mx-auto mt-10" onSubmit={register} >
                <h1 className="text-black dark:text-white text-xl lg:text-4xl font-bold text-center italic">User</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-10 mx-2">
                    <div className="relative">
                        <input 
                            id="username" 
                            type="text" 
                            value={UserName}
                            required
                            className="block w-full px-3 text-sm lg:text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-sm lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-300 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            UserName
                        </label>
                    </div>

                    <div className="relative">
                        <input 
                            id="email" 
                            type="email" 
                            required
                            className="block w-full px-3 text-sm lg:text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />

                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-sm lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-300 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Email
                        </label>
                    </div>

                    <div className="relative">
                        <input 
                            id="password" 
                            required
                            type={typepassword}
                            className="block w-full px-3 text-sm lg:text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        <div className="absolute right-10 text-sm lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-1/2">
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
                            className="absolute text-sm lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-300 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Password
                        </label>
                    </div>

                    <div className="relative">
                        <input 
                            id="ConfirmPassword" 
                            required
                            type={typepasswordconfirm}
                            className="block w-full px-3 text-sm lg:text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="absolute right-10 text-sm lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-1/2">
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
                            className="absolute text-sm lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-300 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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
                        className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl p-4 text-center inline-flex items-center"
                    >
                        Submit
                    </button>
                </div>
            </form>

            <div className="p-2 lg:p-5">
                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-neutral-100 dark:bg-slate-800 border-b-2 border-gray-200">
                            <tr>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Id</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">User Name</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Email</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((data,index)=>(
                                <tr key={index} className="even:bg-neutral-300 odd:bg-neutral-200 even:dark:bg-gray-900 odd:dark:bg-gray-800 w-full">
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <p className="font-bold text-blue-500 dark:text-white hover:underline">{data.user_id}</p>
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {data.UserName}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <h1 className="text-black dark:text-white flex justify-between my-5 font-bold text-lg md:text-xl">
                                            <span className={ `font-normal font-medium ${data.email ? " " : "text-red-800"}`}>
                                                { data.email ? data.email : "No Email Address" }
                                            </span>
                                        </h1>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {moment(data.createDate).utc().format('YYYY-MM-DD')}
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                clickedForupdate()
                                                setupdateuserid(data.user_id)
                                                setupdateusername(data.UserName)
                                                setupdateemail(data.email)
                                            }} 
                                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                            Edit
                                        </button>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <button 
                                            onClick={() => {
                                                clickedFordelete()
                                                setdeleteuserid(data.user_id)
                                            }}
                                            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:hidden">
                    {users.map((data,index)=>(
                        <div key={index} className=" bg-neutral-200 dark:bg-slate-800 space-y-3 p-2 lg:p-4 rounded-lg shadow overflow-scroll">
                            <div>
                                <p className="text-blue-500 dark:text-white font-bold hover:underline">
                                    <span className="text-lg">Id : </span> 
                                    <span className="text-sm ">{data.user_id}</span>
                                </p>
                            </div>
                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">User Name : </span>
                                <span className="text-md">{data.UserName} </span>
                            </div>

                            <div className="text-md lg:text-lg text-gray-700 dark:text-white font-bold break-words ">
                                Email : <span className={ `font-normal font-medium ${data.email ? " " : "text-red-800"}`}>
                                    { data.email ? data.email : "No Email Address" }
                                </span>
                            </div>

                            <div className="text-black font-bold dark:text-white">
                              <span className="text-lg">createDate : </span>
                              <span className="text-sm">{moment(data.createDate).utc().format('YYYY-MM-DD')}</span>
                            </div>
                            <div className="text-black font-bold dark:text-white">
                              <span className="text-lg">Modified Date : </span>
                              <span className="text-sm">{moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <button
                                    onClick={() => {
                                        clickedForupdate()
                                        setupdateuserid(data.user_id)
                                        setupdateusername(data.UserName)
                                        setupdateemail(data.email)
                                    }}  
                                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        clickedFordelete()
                                        setdeleteuserid(data.user_id)
                                    }} 
                                    className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {deletemodalOn && 
                <DeleteUser setdeleteModalOn={setdeleteModalOn} deleteuserid={deleteuserid}/>
            }

            {updatemodalOn && 
                <UpdateUser setupdateModalOn={setupdateModalOn} updateuserid={updateuserid} updateemail={updateemail} updateusername={updateusername} setupdateemail={setupdateemail} setupdateusername={setupdateusername} />
            }

        </div>
    );
}
