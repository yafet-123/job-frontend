import axios from 'axios';
import { useRouter } from 'next/router'
import { useState,useEffect, useContext} from 'react'
import BeatLoader from "react-spinners/BeatLoader";

export function DeleteUser({setdeleteModalOn,deleteuserid}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
	const handleOKClickFordelete = async() => {
        setLoading(true)
        const data = await axios.delete(`../api/deleteuser/${deleteuserid}`,{
        }).then(function (response) {
            console.log(response.data);
            router.reload()
        }).catch(function (error) {
            console.log(error);
            setLoading(false)
        });
        setdeleteModalOn(false)
    }

    const handleCancelClickFordelete = () => {
        setdeleteModalOn(false)
    }
	return(
		<div className="bg-gray-200 dark:bg-slate-800 opacity-90 fixed inset-0 z-50   ">
            <div className="flex h-screen justify-center items-center ">
                <div className="flex-col justify-center bg-white dark:bg-slate-500 py-24 px-5 lg:px-10 border-4 border-sky-500 rounded-xl ">
                    <div className="flex text-xl text-zinc-600 font-bold mb-10 dark:text-white" >Are you sure You want to delete User ?</div>
                    <div className="flex">
                    	<button 
                            disabled={loading} 
                            onClick={handleOKClickFordelete} 
                            className={`rounded px-4 py-4  ${loading ? "text-black bg-gray-200" : "text-white  bg-green-400 hover:bg-green-600"}`}
                        >
                            Yes
                        </button>
                    	<button onClick={handleCancelClickFordelete} className="rounded px-4 py-4 ml-4 text-white bg-blue-400 hover:bg-blue-600">No</button>
                 	</div>
                    <div className="flex justify-center items-center mt-10">
                        <BeatLoader 
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