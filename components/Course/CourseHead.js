import { useRouter } from 'next/router'
import { CourseHeadData } from '../../data/courseHead'

export function CourseHead({categories}) {
  const router = useRouter()
  const { category_id } = router.query
  return (
    <div className='flex justify-between shadow-2xl w-full' >
      <ul className="flex flex-row w-full">
        { CourseHeadData.map((data,index)=>(
          <li className='flex text-center lg:gap-2 transition-none cursor-pointer hover:text-gray-600'
            key={index}
          >
            <button 
              onClick = {()=>{
                router.push({
                  pathname:data.link,
                  query:{CategoryName:data.title,id:1}
                })
              }}
              key={index} 
              className={
                router.query.CategoryName == data.title
                  ? "bg-[#ddd0c8] mr-10 text-2xl font-bold text-black p-4"
                  : "mr-10 text-2xl font-bold text-white hover:border-b-4 border-blue-800"
                }
              >
                {data.title}
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}
