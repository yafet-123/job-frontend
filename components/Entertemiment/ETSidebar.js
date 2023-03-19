import { useRouter } from 'next/router'

export function ETSidebar({categories}) {
  const router = useRouter()
  const { category_id } = router.query
  return (
    <div className='flex flex-col justify-between shadow-2xl shadow-zinc-900 bg-[#e6e6e6] dark:bg-[#02201D]' >
      <ul className="flex flex-row lg:flex-col px-2 lg:pt-5 gap-3 lg:gap-10 lg:h-[50rem] lg:mb-5 w-full lg:w-80 sticky top-0 bottom-0 scroll_width">
        <li className='flex text-center gap-2 transition-none cursor-pointer whitespace-nowrap hover:text-gray-600 lg:pt-5'>
          <button 
            onClick = {()=>{
              router.push({
                pathname:"/Entertemiment"
              })
            }}
              className={ router.pathname == "/Entertemiment" ? 'bg-[#009688] dark:bg-[#1B2637] px-2 py-3 w-full text-center text-white font-bold flex': 'w-full text-black dark:text-white hover:text-[#009688] hover:text-center hover:bg-white dark:hover:bg-[#009688] px-2 py-3 font-bold flex' }
            >
              Dashboard
            </button>
        </li>
        {categories.map((item, index) => (

            <li className='flex text-center lg:gap-2 transition-none cursor-pointer whitespace-nowrap hover:text-gray-600 w-full'
            key={index}
            >
              <button 
                onClick = {()=>{
                  router.push({
                    pathname:"/EntertemimentByCategory",
                    query:{category_id:item.category_id}
                  })
                }}
                className={ item.category_id == category_id ? 'bg-[#009688] dark:bg-[#1B2637] px-2 py-3 w-full text-center text-white font-bold flex': 'w-full text-black dark:text-white hover:text-[#009688] hover:text-center hover:bg-white dark:hover:bg-[#009688] px-2 py-3 font-bold flex' }
              >
                {item.CategoryName}
              </button>
            </li>
        ))}
      </ul>
    </div>
  )
}
