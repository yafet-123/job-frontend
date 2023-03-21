import { useRouter } from 'next/router'
import { AdviceHeadData } from '../../data/AdviceHead'

export function AdviceVerticalBar({AdviceHead}) {
  const router = useRouter()
  const { category_id } = router.query
  return (
    <div className='w-full h-full shadow-2xl shadow-zinc-900' >
      <div className="flex flex-nowrap px-2 gap-2 lg:gap-10 overflow-x-scroll">
        <div className='flex text-center lg:gap-2 transition-none cursor-pointer whitespace-nowrap hover:text-gray-600 w-full'>
          <button 
            onClick = {()=>{
              router.push({
                pathname:"/Advices"
              })
            }}
              className={ router.pathname == "/Advices" ? 'bg-[#009688] dark:bg-[#009688] px-2 py-3 w-full text-center text-white font-bold flex': 'w-full text-black dark:text-white hover:text-[#009688] hover:text-center hover:bg-white dark:hover:bg-[#009688] px-2 py-3 font-bold flex' }
            >
              Home
            </button>
        </div>
        {AdviceHeadData.map((item, index) => (
          <div className='flex text-center lg:gap-2 transition-none cursor-pointer whitespace-nowrap hover:text-gray-600 w-full' key={index}>
            <button 
              onClick = {()=>{
                router.push({
                  pathname:"/Advice",
                  query:{title:item.title, category_id:item.id}
                })
              }}
              className={ item.id == category_id ? 'bg-[#009688] dark:bg-[#009688] px-2 py-3 w-full text-center text-white font-bold flex': 'w-full text-black dark:text-white hover:text-[#009688] hover:text-center hover:bg-white dark:hover:bg-[#009688] px-2 py-3 font-bold flex' }
            >
              {item.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}