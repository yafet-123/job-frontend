import axios from 'axios';
import { useRouter } from 'next/router'
export function Deletecourse({setdeleteModalOn,deletecourseid}) {
    const router = useRouter();
	const handleOKClickFordelete = async() => {
        const data = await axios.delete(`../api/deletecourse/${deletecourseid}`,{
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
        setdeleteModalOn(false)
        router.reload()
    }

    const handleCancelClickFordelete = () => {
        setdeleteModalOn(false)
    }

	return(
		<div className="bg-neutral-300 dark:bg-slate-800 opacity-90 fixed inset-0 z-50   ">
            <div className="flex h-screen justify-center items-center ">
                <div className="flex-col justify-center bg-neutral-200 dark:bg-slate-500 py-24 px-5 lg:px-10 border-4 border-sky-500 rounded-xl ">
                    <div className="flex text-xl text-zinc-600 font-bold mb-10 dark:text-white" >Are you sure You want to delete ?</div>
                    <div className="flex">
                        <button onClick={handleOKClickFordelete} className=" rounded px-4 py-4 text-white  bg-green-400 hover:bg-green-600">Yes</button>
                        <button onClick={handleCancelClickFordelete} className="rounded px-4 py-4 ml-4 text-white bg-blue-400 hover:bg-blue-600">No</button>
                    </div>
                 </div>
            </div>
        </div>
	)
}