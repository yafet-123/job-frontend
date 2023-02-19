import { Items } from '../data/Entertemiment/AdeyMirafOne'
import { useRouter } from 'next/router'

export function ETSidebar({categories}) {
  const router = useRouter()
  return (
    <div className='flex flex-col justify-between bg-gray-300 dark:bg-slate-600 p-3' >
      <ul className="flex flex-row lg:flex-col justify-between gap-10 h-[95%] scroll_width">
        {categories.map((item, index) => (
            <li className='flex items-center text-center gap-4 transition-none p-3 cursor-pointer hover:text-gray-600 md:p-2'
            key={index}
            >
              <button 
                onClick = {()=>{
                  router.push({
                    pathname:"/EntertemimentByCategory",
                    query:{category_id:item.category_id}
                  })
                }}
                className='font-semibold pr-4 flex'
              >
                {item.CategoryName}
              </button>
            </li>
        ))}
      </ul>
    </div>
  )
}
