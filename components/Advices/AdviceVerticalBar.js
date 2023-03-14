import { useRouter } from 'next/router'
import { AdviceHeadData } from '../../data/AdviceHead'

export function AdviceVerticalBar({AdviceHead}) {
  const router = useRouter()
  const { category_id } = router.query
  return (
    <div className='w-full h-full shadow-2xl shadow-zinc-900 bg-[#64748b] lg:bg-[#ddd0c8]' >
      <ul className="flex flex-row px-2 gap-2 lg:gap-10  scroll_width">
        <li className='flex text-center gap-2 cursor-pointer hover:text-gray-600 w-full'>
          <button 
            onClick = {()=>{
              router.push({
                pathname:"/Advices"
              })
            }}
              className={ router.pathname == "/Advices" ? 'bg-[#ddd0c8] lg:bg-neutral-500 px-2 py-3 w-full text-center text-black lg:text-white font-bold flex': 'w-full text-white lg:text-black hover:text-white hover:text-center hover:bg-black px-2 py-3 font-bold flex' }
            >
              Home
            </button>
        </li>
        {AdviceHeadData.map((item, index) => (
          <li className='flex text-center lg:gap-2 cursor-pointer hover:text-gray-600 w-full'
            key={index}
          >
            <button 
              onClick = {()=>{
                router.push({
                  pathname:"/Advice",
                  query:{title:item.title, category_id:item.id}
                })
              }}
              className={ item.id == category_id ? 'bg-[#ddd0c8] lg:bg-neutral-500 px-2 py-3 !w-full text-center text-black lg:text-white font-bold flex': 'w-full text-white lg:text-black hover:text-white hover:text-center hover:bg-black px-2 py-3 font-bold flex' }
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}