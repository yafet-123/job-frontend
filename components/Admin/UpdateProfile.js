import axios from 'axios';
import { useRouter } from 'next/router'
import { useState,useEffect, useContext} from 'react'
import ReactModal from "react-modal";
import Loader from '../common/Loading'

export function UpdateProfile({updateuserid,updatefirstName,updatelastName,updateage,updateUserName,updateemail,setupdateModalOn,setupdatefirstName,setupdatelastName,setupdateage,setupdateUserName,setupdateemail}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
    const handleOKClickForupdate = async() => {
        setLoadingModalIsOpen(true)
        const data = await axios.patch(`../api/updateProfile/${updateuserid}`,{
            "firstName": updatefirstName,
            "lastName":updatelastName,
			"age":updateage,
			"UserName":updateUserName,
			"email":updateemail,
        }).then(function (response) {
            console.log(response.data);
            router.push('/Admin')
        }).catch(function (error) {
            console.log(error);
            setLoadingModalIsOpen(false)
        });
        setupdateModalOn(false)
       
    }

    const handleCancelClickForupdate = () => {
        setupdateModalOn(false)
    }

	return(
		<div className="bg-gray-200 dark:bg-slate-800 opacity-95 fixed inset-0 z-50   ">
            <div className="flex h-screen justify-center items-center ">
                <div className="flex-col justify-center bg-white dark:bg-slate-500 py-24 px-5 lg:px-10 border-4 border-sky-500 rounded-xl ">
                    <div className="flex text-center text-xl text-zinc-600 font-bold mb-10 dark:text-white" >Update Profile</div>
                    <div className="flex flex-col justify-between items-center">
                    	<div className="relative mb-10 w-full">
	                        <input 
	                        	id="email" 
	                        	type="text" 
	                           	className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
	                           	value={updateUserName}
	                            onChange={(e) => setupdateusername(e.target.value)}
	                        />
		                    <label 
		                        htmlFor="floating_outlined" 
		                        className="absolute text-2xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
		                    >
		                        UserName
		                    </label>
	                    </div>
                    	<div className="flex flex-col lg:flex-row justify-between items-center mb-5">
	                        <div className="relative mb-10 lg:px-2">
	                            <input 
	                            	id="firstName" 
	                            	type="text" 
	                            	className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
	                            	value={updatefirstName}
	                            	onChange={(e) => setupdatefirstName(e.target.value)}
	                            />
	                            <label 
	                                htmlFor="floating_outlined" 
	                                className="absolute text-2xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
	                            >
	                                First Name
	                            </label>
	                        </div>

	                        <div className="relative mb-10 lg:px-2">
	                            <input 
	                            	id="lastName" 
	                            	type="text" 
	                               	className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
	                               	value={updatelastName}
	                               	onChange={(e) => setupdatelastName(e.target.value)}
	                           	/>
		                        <label 
		                            htmlFor="floating_outlined" 
		                            className="absolute text-2xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
		                        >
		                            Last Name
		                        </label>
	                        </div>
	                    </div>

	                    <div className="flex flex-col lg:flex-row justify-between items-center mb-5">
	                        <div className="relative mb-10 lg:px-2">
	                            <input 
	                            	id="age" 
	                            	type="text" 
	                            	className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
	                            	value={updateage}
	                            	onChange={(e) => setupdateage(e.target.value)}
	                            />
	                            <label 
	                                htmlFor="floating_outlined" 
	                                className="absolute text-2xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
	                            >
	                                Age
	                            </label>
	                        </div>

	                        <div className="relative mb-10 lg:px-2">
	                            <input 
	                            	id="email" 
	                            	type="text" 
	                               	className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
	                               	value={updateemail}
	                               	onChange={(e) => setupdateemail(e.target.value)}
	                           	/>
		                        <label 
		                            htmlFor="floating_outlined" 
		                            className="absolute text-2xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
		                        >
		                            Email
		                        </label>
	                        </div>
	                    </div>
                    </div>
                    <div className="flex">
                        <button 
                            disabled={loading}
                            onClick={handleOKClickForupdate} 
                            className={`rounded px-4 py-4  ${loading ? "text-black bg-gray-200" : "text-white  bg-[#009688] hover:bg-[#009688]"}`}
                        >
                            Yes
                        </button>
                        <button onClick={handleCancelClickForupdate} className="rounded px-4 py-4 ml-4 text-white bg-blue-400 hover:bg-blue-600">No</button>
                    </div>

                    <ReactModal
                        isOpen={LoadingmodalIsOpen}
                        // onRequestClose={closeModal}
                        className="flex items-center justify-center w-full h-full"
                    >
                        <Loader />
                    </ReactModal>
                </div>
           	</div>
        </div>
	)
}