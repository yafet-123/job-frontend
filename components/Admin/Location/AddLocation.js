import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import Image from 'next/image'
import GridLoader from "react-spinners/GridLoader";

export function AddLocation({locations}) {
    const router = useRouter();
    const [LocationName, setLocationName] = useState("")
    const [image, setImage] = useState()
    const { status, data } = useSession();
    const [error,seterror] = useState("")
    const UserData = data?.user;
    const [active, setActive] = useState(false)
    const [loading, setLoading] = useState(false);
    async function imageUploadData() {
        const formData = new FormData();
        let imagesecureUrl = ""
        formData.append('file', image)

        formData.append('upload_preset', 'my_upload')

        const imageUpload = await fetch(`https://api.cloudinary.com/v1_1/df7hlpjcj/image/upload`,{
            method:'POST',
            body: formData
        }).then(r=>
            r.json()
            
        )
        imagesecureUrl = imageUpload.secure_url
        return imagesecureUrl
    }

    async function addLocation(){
        const imageData = await imageUploadData()
        seterror("")
        setLoading(true)
        const data = await axios.post(`../api/addlocation`,{
            "LocationName": LocationName,
            "user_id": UserData.user_id,
            "Image":imageData,
        }).then(function (response) {
            console.log(response.data);
            router.reload()
        }).catch(function (error) {
            seterror("Creating Location Failed")
            setLoading(false)
        });
    }

    function registerLocation(e){
        e.preventDefault()
        addLocation()
    }

    return (
        <div className="px-0 lg:px-10 pt-20">
            <form className="max-w-7xl mx-auto mt-10" onSubmit={registerLocation}>
                <h1 className="text-black dark:text-white text-xl lg:text-4xl font-bold text-center italic">Location</h1>
                <div className="flex flex-col my-10 w-full px-2">
                    <div className="relative flex-1">
                        <input  
                            id="LocationName" 
                            type="text" 
                            required
                            className="block w-full px-3 text-md lg:text-xl text-black dark:text-white bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={LocationName}
                            onChange={(e) => setLocationName(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Location Name
                        </label>
                    </div>

                    <div className="grid grid-cols-1 gap-5 my-10">
                        <div className="flex items-center justify-center w-full">
                            <label 
                                htmlFor="dropzone-file" 
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-black border rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-gray-100 dark:border-black dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                    
                    <div className="mx-2 my-5 lg:my-0 flex flex-col lg:flex-row justify-between">
                        <h1 className="text-red-600 dark:text-red-400 text-md lg:text-2xl font-bold text-left mb-5 lg:mb-0">
                            {error}
                        </h1>

                        <button
                            disabled={loading} 
                            className={`float-right mx-2 flex justify-between rounded-xl w-32 text-white font-medium text-xl px-4 py-4 text-center inline-flex items-center
                                ${loading ? "bg-gray-200" : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300" }`}
                        >
                            Submit
                        </button>
                    </div>

                    <div className="flex justify-center items-center mt-5">
                        <GridLoader 
                            color="#36d7b7"
                            loading={loading}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </div>
            </form>
        </div>
  );
}
