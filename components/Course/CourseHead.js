import { useRouter } from 'next/router'

export function CourseHead({categories}) {
  const router = useRouter()
  const { category_id } = router.query
  return (
    <div className='flex justify-between shadow-2xl shadow-zinc-900' >
      <ul className="flex flex-row">
        { categories.map((data,index)=>(
          <li className='flex text-center lg:gap-2 transition-none cursor-pointer hover:text-gray-600'
            key={index}
          >
            <button 
              onClick = {()=>{
                router.push({
                  pathname:"/Course",
                  query:{title:data.title}
                })
              }}
              key={index} 
              className={
                router.query.title == data.title
                  ? "bg-black mr-10 text-2xl font-bold text-white p-4"
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
