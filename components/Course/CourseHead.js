import { useRouter } from 'next/router'

export function CourseHead({categories}) {
  const router = useRouter()
  const { category_id } = router.query
  return (
    <div className='flex justify-between shadow-2xl shadow-zinc-900 w-full' >
      <ul className="flex flex-row w-full">
        { categories.map((data,index)=>(
          <li className='flex text-center lg:gap-2 transition-none cursor-pointer hover:text-gray-600'
            key={index}
          >
            <button 
              onClick = {()=>{
                router.push({
                  pathname:"/Course",
                  query:{CategoryName:data.CategoryName, courseId:1}
                })
              }}
              key={index} 
              className={
                router.query.CategoryName == data.CategoryName
                  ? "bg-green-500 mr-10 text-2xl font-bold text-white p-4"
                  : "mr-10 text-2xl font-bold text-white hover:border-b-4 border-blue-800"
                }
              >
                {data.CategoryName}
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}
