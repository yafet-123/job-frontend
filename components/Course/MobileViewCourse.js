import { useRouter } from 'next/router'
import { CourseSideBar } from "./CourseSideBar"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export function MobileViewCourse({chapter, CategoryName, courses, handleChapter}) {
  const router = useRouter()
  return (
    <div className={ chapter ? "lg:hidden fixed left-0 top-20 w-full h-screen bg-black/70 z-10" : "" }>
      <div className={chapter ? "fixed left-0 top-20 w-[70%] h-screen bg-white py-10 ease-in duration-500" : "fixed left-[-100%] top-20 ease-in duration-500" }>
        <div> 
            <div onClick={handleChapter} className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer float-right mr-5">
              <AiOutlineClose size={15} />
            </div>   
        </div>
        <div className="py-4 flex flex-col mt-10 w-full">
          <CourseSideBar CategoryName={CategoryName} courses={courses} handleChapter={handleChapter} />
        </div>
      </div>
    </div>
  )
}