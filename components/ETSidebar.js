import { Items } from '../data/Entertemiment/AdeyMirafOne'

export function ETSidebar() {
  return (
    <div className='flex flex-col justify-between bg-gray-200 dark:bg-slate-600 p-3' >
      <ul className="flex flex-row lg:flex-col justify-between gap-10 h-[95%] scroll_width">
        {Items && Items.map((item, index) => {
          return (
            <li className='flex items-center text-center gap-4 transition-none p-3 cursor-pointer hover:text-gray-600 md:p-2'
            key={index}
            >
              {item.icon} {' '}<span className='font-semibold pr-4 flex'>{item.name}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
