import { Items } from '../data/Entertemiment/AdeyMirafOne'
import { useRouter } from 'next/router'

export function ETSidebar({categories}) {
  const router = useRouter()
  const { category_id } = router.query
  return (
    <div className='flex flex-col justify-between bg-gray-300 dark:bg-slate-600' >
      <ul className="flex flex-row lg:flex-col gap-10 h-[50rem] overflow-y-scroll scroll_width">
        <li className='flex text-center gap-2 transition-none cursor-pointer hover:text-gray-600 '>
          <button 
            onClick = {()=>{
              router.push({
                pathname:"/Entertemiment"
              })
            }}
              className='w-full hover:text-white hover:bg-black px-2 py-3 font-bold flex'
            >
              Dashboard
            </button>
        </li>
        {categories.map((item, index) => (

            <li className='flex text-center gap-2 transition-none cursor-pointer hover:text-gray-600'
            key={index}
            >
              <button 
                onClick = {()=>{
                  router.push({
                    pathname:"/EntertemimentByCategory",
                    query:{category_id:item.category_id}
                  })
                }}
                className={ item.category_id == category_id ? 'hover:text-white hover:bg-black px-2 py-3 bg-neutral-500 w-full text-center text-white font-bold flex' : 'w-full hover:text-white hover:bg-black px-2 py-3 font-bold flex' }
              >
                {item.CategoryName}
              </button>
            </li>
        ))}
      </ul>
    </div>
  )
}
