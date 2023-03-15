import { useRouter } from 'next/router'
import { AdviceHeadData } from '../../data/AdviceHead'

export function AdviceVerticalBar({AdviceHead}) {
  const router = useRouter()
  const { category_id } = router.query
  return (
    <div className='w-full h-full shadow-2xl shadow-zinc-900 bg-[#64748b] lg:bg-[#ddd0c8]' >
      <div className="flex flex-nowrap px-2 gap-2 lg:gap-10 scroll_width">
        <div className='gap-2 cursor-pointer hover:text-gray-600 w-full'>
          <button 
            onClick = {()=>{
              router.push({
                pathname:"/Advices"
              })
            }}
              className={ router.pathname == "/Advices" ? 'bg-[#ddd0c8] lg:bg-neutral-500 px-2 py-3 text-center text-black lg:text-white font-bold flex': 'w-full text-white lg:text-black hover:text-white text-center hover:bg-black px-2 py-3 font-bold flex' }
            >
              Home
            </button>
        </div>
        {AdviceHeadData.map((item, index) => (
          <div className='gap-2 cursor-pointer hover:text-gray-600 w-full whitespace-nowrap' key={index}>
            <button 
              onClick = {()=>{
                router.push({
                  pathname:"/Advice",
                  query:{title:item.title, category_id:item.id}
                })
              }}
              className={ item.id == category_id ? 'bg-[#ddd0c8] lg:bg-neutral-500 px-2 py-3 !w-full text-center text-black lg:text-white font-bold flex': 'w-full text-white lg:text-black hover:text-white text-center hover:bg-black px-2 py-3 font-bold flex' }
            >
              {item.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}