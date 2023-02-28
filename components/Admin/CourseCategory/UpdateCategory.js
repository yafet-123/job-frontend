import axios from 'axios';
import { useRouter } from 'next/router'
export function UpdateCategory({setupdateModalOn, updatecategoryname, setupdatecategoryname, updatecategoryid, updateShortDescription ,setupdateShortDescription ,updatecolor ,setupdatecolor}) {
    const router = useRouter();
	const handleOKClickForupdate = async() => {
        const data = await axios.patch(`api/updatecourseCategory/${updatecategoryid}`,{
            "CategoryName": updatecategoryname,
            "ShortDescription":updateShortDescription,
            "color":updatecolor,
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
        setupdateModalOn(false)
        router.reload()
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10 px-2">
                            <div className="relative flex-1">
                                <input 
                                    id="Category" 
                                    type="text" 
                                    required
                                    className="block w-full px-3 text-md lg:text-xl text-black dark:text-white bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                    value={updatecategoryname}
                                    onChange={(e) => setupdatecategoryname(e.target.value)}
                                />
                                <label 
                                    htmlFor="floating_outlined" 
                                    className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                >
                                    Categories
                                </label>
                            </div>

                            <div className="relative mb-5">
                                <input 
                                    id="color" 
                                    type="text" 
                                    required
                                    className="block w-full px-3 text-md lg:text-xl text-black dark:text-white bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                    value={updatecolor}
                                    onChange={(e) => setupdatecolor(e.target.value)}
                                />
                                <label 
                                    htmlFor="floating_outlined" 
                                   className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                >
                                    Color
                                </label>
                            </div>

                    </div>

                    <div className="relative my-5">
                        <textarea  
                            id="ShortDescription" 
                            rows="7" 
                            cols="50"
                            required 
                            className="block w-full px-3 text-md lg:text-xl text-black dark:text-white bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={updateShortDescription}
                            onChange={(e) => setupdateShortDescription(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/4 peer-placeholder-shown:top-1/4 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            ShortDescription
                        </label>
                    </div>
                    </div>
                    <div className="flex">
                        <button onClick={handleOKClickForupdate} className=" rounded px-4 py-4 text-white  bg-green-400 hover:bg-green-600">Yes</button>
                        <button onClick={handleCancelClickForupdate} className="rounded px-4 py-4 ml-4 text-white bg-blue-400 hover:bg-blue-600">No</button>
                    </div>
                </div>
            </div>
        </div>
	)
}