import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router'
import Image from 'next/image'
import {DeleteLocation} from './DeleteLocation'
import {UpdateLocation} from './UpdateLocation'

export function AddLocation({locations}) {
    const router = useRouter();
    console.log(locations)
    const [LocationName, setLocationName] = useState("")
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deletelocationid,setdeletelocationid] = useState()
    const [updatelocationid,setupdatelocationid] = useState()
    const [updatelocationname,setupdatelocationname] = useState("")
    const [image, setImage] = useState()
    const [imagesecureUrl, setimagesecureUrl] = useState()
    const [saveUpload, setsaveUpload] = useState(false)
    async function registerLocation(){
        const formData = new FormData();
        
        formData.append('file', image)

        formData.append('upload_preset', 'my_upload')

        const imageUpload = await fetch(`https://api.cloudinary.com/v1_1/df7hlpjcj/image/upload`,{
            method:'POST',
            body: formData
        }).then(r=>console.log(r))
        console.log(imageUpload.secure_url)
        

        if(saveUpload){
            const data = await axios.post(`api/addlocation`,{
                "LocationName": LocationName,
                "user_id": 20,
                "Image":imagesecureUrl,
            }).then(function (response) {
                console.log(response.data);

            }).catch(function (error) {
                console.log(error);
            });
            
        }
    }

    const clickedFordelete = () => {
        setdeleteModalOn(true)
    }

    const clickedForupdate = () => {
        setupdateModalOn(true)
    }

    return (
        <div className="px-0 lg:px-10 h-full">
            <div className="max-w-7xl mx-auto mt-10">
                <h1 className="text-black dark:text-white text-xl lg:text-4xl font-bold text-center italic">Location</h1>
                <div className="flex flex-col my-10 w-full px-2">
                    <div className="relative flex-1">
                        <input 
                            id="LocationName" 
                            type="text" 
                            className="block w-full px-3 text-md lg:text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={LocationName}
                            onChange={(e) => setLocationName(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Location Name
                        </label>
                    </div>

                    <div className="grid grid-cols-1 gap-5 my-10">
                        <div className="flex items-center justify-center w-full">
                            <label 
                                htmlFor="dropzone-file" 
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-black border rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-gray-100 dark:border-black dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <p className="text-sm lg:text-lg text-black dark:text-white mb-5">Upload Location Image</p>
                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-xs lg:text-sm text-black dark:text-white"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
                            </label>
                        </div>
                    </div>

                    <div className={image == null ? "hidden" : "flex justify-center items-center mb-10"}>
                        <Image 
                            src={image == null ? "/images/bgImage1.avif" :URL.createObjectURL(image)} 
                            width={500} height={200} 
                            alt="image that will be displayed" 
                            className="w-full"
                        />
                    </div>
                    
                    <button 
                        onClick={()=> registerLocation() }
                        className="float-right mx-2 flex justify-between rounded-xl w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-xl px-4 py-4 text-center inline-flex items-center"
                    >
                        Submit
                    </button>     
                </div>
            </div>

            <div className="m-2 lg:m-5">
                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-slate-800 border-b-2 border-gray-200">
                            <tr>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Id</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Location Name</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Image</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created By</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {locations.map((data,index)=>(
                                <tr key={index} className="even:bg-white odd:bg-gray-200 even:dark:bg-gray-900 odd:dark:bg-gray-800 w-full">
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <p className="font-bold text-blue-500 dark:text-white hover:underline">{data.location_id}</p>
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {data.LocationName}
                                    </td>

                                     <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <Image src={data.Image == null ? "/images/bgImage1.avif" : data.Image} width={50} height={50} alt="image that will be displayed" />
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {moment(data.createDate).utc().format('YYYY-MM-DD')}
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {data.userName}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                clickedForupdate()
                                                setupdatelocationid(data.location_id)
                                                setupdatelocationname(data.LocationName)
                                            }}
                                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                            Edit
                                        </button>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <button 
                                            onClick={() => {
                                                clickedFordelete()
                                                setdeletelocationid(data.location_id)
                                            }}
                                            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                    {locations.map((data,index)=>(
                        <div key={index} className="bg-white dark:bg-slate-800 space-y-3 p-2 lg:p-4 rounded-lg shadow">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-blue-500 dark:text-white font-bold hover:underline">
                                        <span className="text-lg">Id : </span> 
                                        <span className="text-sm ">{data.location_id}</span>
                                    </p>
                                </div>

                                <Image src={data.Image == null ? "/images/bgImage1.avif" : data.Image} width={50} height={50} alt="image that will be displayed" />
                            </div>

                            <div className="font-bold text-gray-700 dark:text-white">
                                <span className="text-lg">Category Name : </span> 
                                <span className="text-sm ">{data.LocationName}</span>
                            </div>
                            <div className="font-bold text-gray-700 dark:text-white">
                                <span className="text-lg">Created By : </span> 
                                <span className="text-sm ">{data.userName}</span>
                            </div>
                            <div className="font-bold text-black dark:text-white">
                                <span className="text-lg">createDate : </span> 
                                <span className="text-sm ">{moment(data.createDate).utc().format('YYYY-MM-DD')}</span>
                            </div>
                            <div className="font-bold text-black dark:text-white">
                                <span className="text-lg">Modified Date : </span> 
                                <span className="text-sm ">{moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <button 
                                    onClick={() => {
                                        clickedForupdate()
                                        setupdatelocationid(data.location_id)
                                        setupdatelocationname(data.LocationName)
                                    }}
                                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                    Edit
                                </button>

                                <button 
                                    onClick={() => {
                                        clickedFordelete()
                                        setdeletelocationid(data.location_id)
                                    }}
                                    className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {deletemodalOn && 
                <DeleteLocation setdeleteModalOn={setdeleteModalOn} deletelocationid={deletelocationid} />
            }

            {updatemodalOn && 
                <UpdateLocation updatelocationid={updatelocationid} setupdateModalOn={setupdateModalOn} updatelocationname={updatelocationname} setupdatelocationname={setupdatelocationname} />
            }
        </div>
  );
}
