import { useRouter } from 'next/router'
import { CourseHeadData } from '../../data/courseHead'
import { MdOutlineSubject } from 'react-icons/md'
import { Content } from './Content'
import { CourseSideBar } from "./CourseSideBar"

export function Main({CategoryName, courses, handleChapter, handleCourse, indvidualCourses}) {
  const router = useRouter()
  return (
    <div className="flex flex-col lg:flex-row h-full px-0 lg:px-20 ">
      <div className="hidden lg:flex w-1/4 h-screen bg-gray-200 overflow-y-scroll scroll_width sticky top-0 bottom-0">
        <CourseSideBar CategoryName={CategoryName} handleCourse={handleCourse} courses={courses} handleChapter={handleChapter} />
      </div>
      <Content indvidualCourses={indvidualCourses} />     
    </div>
  )
}