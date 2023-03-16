import axios from 'axios';
import { useRouter } from 'next/router'
import { useState , useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown';
import { useSession } from "next-auth/react";
import RingLoader from "react-spinners/RingLoader";

export function UpdateEntertainment({setupdateModalOn, updateShortDescription, setupdateShortDescription, updateentertainmentid, updateheader, setupdateheader, updatelink ,setupdatelink, categories }) {
    const router = useRouter();
    const [categoryId,setCategoryId] = useState([])
    const { status, data } = useSession();
    const UserData = data.user;
    const [loading, setLoading] = useState(false);

	const handleOKClickForupdate = async() => {
        setLoading(true)
        const data = await axios.patch(`../api/updateentertainment/${updateentertainmentid}`,{
            "Header" : updateheader,
            "link" : updatelink,
            "ShortDescription": updateShortDescription,
            "categoryId": categoryId,
            "user_id": UserData.user_id,
        }).then(function (response) {
            console.log(response.data);
            router.reload()
        }).catch(function (error) {
            console.log(error);
            setLoading(false)
        });
        setupdateModalOn(false)
        
    }

    const handleCancelClickForupdate = () => {
        setupdateModalOn(false)
    }

	return(
		<div className="bg-neutral-300 dark:bg-slate-800 opacity-95 fixed inset-0 z-50   ">
            <div className="flex h-screen justify-center items-center ">
                <div className="flex-col justify-center bg-neutral-200 dark:bg-slate-500 py-24 px-5 lg:px-10 border-4 border-sky-500 rounded-xl ">
                    <div className="flex text-center text-xl text-zinc-600 font-bold mb-10 dark:text-white" >Update Category</div>
                    <div className="flex flex-col justify-between items-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="relative mb-10">
                                <input 
                                    id="Header" 
                                    type="text" 
                                    className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                    value={updateheader}
                                    onChange={(e) => setupdateheader(e.target.value)}
                                />
                                <label 
                                    htmlFor="floating_outlined" 
                                    className="absolute text-2xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-200 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                >
                                    Header
                                </label>
                            </div>

                            <div className="relative mb-10">
                                <input 
                                    id="Link" 
                                    type="text" 
                                    className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                    value={updatelink}
                                    onChange={(e) => setupdatelink(e.target.value)}
                                />
                                <label 
                                    htmlFor="floating_outlined" 
                                    className="absolute text-2xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-200 dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                >
                                    Link
                                </label>
                            </div>

                            <div className="relative mb-5">
                                <textarea  
                                    id="ShortDescription" 
                                    rows="7" 
                                    cols="50"
                                    required 
                                    className="block w-full px-3 text-md lg:text-xl text-black dark:text-white bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                    value={ShortDescription}
                                    onChange={(e) => setShortDescription(e.target.value)}
                                />
                                <label 
                                    htmlFor="floating_outlined" 
                                    className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/4 peer-placeholder-shown:top-1/4 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                >
                                    ShortDescription
                                </label>
                            </div>
                        </div>

                        <div className="w-full mb-5">
                            <Multiselect
                                displayValue="CategoryName"
                                
                                placeholder = "updated Category"
                                className="w-full px-3 text-xl text-black h-32 bg-neutral-200 py-5 border-2 border-black rounded-xl appearance-none dark:text-black dark:bg-slate-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                                onKeyPressFn={function noRefCheck(){}}
                                onRemove={function noRefCheck(){}}
                                onSearch={function noRefCheck(){}}
                                onSelect={(e)=>{
                                    e.map((data,index)=>(
                                       setCategoryId([...categoryId, data.category_id])
                                    ))
                                }}
                                options={categories}
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <button 
                            disabled={loading} 
                            onClick={handleOKClickForupdate} 
                            className={`rounded px-4 py-4  ${loading ? "text-black bg-gray-200" : "text-white  bg-green-400 hover:bg-green-600"}`}
                        >
                            Yes
                        </button>
                        <button onClick={handleCancelClickForupdate} className="rounded px-4 py-4 ml-4 text-white bg-blue-400 hover:bg-blue-600">No</button>
                    </div>

                    <div className="flex justify-center items-center mt-5">
                        <RingLoader 
                            color="#36d7b7"
                            loading={loading}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </div>
            </div>
        </div>
	)
}