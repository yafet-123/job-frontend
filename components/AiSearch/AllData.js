import { useRouter } from 'next/router'
export const AllData = ({AllAiData}) => {
  console.log(AllAiData)
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-full w-full lg:px-20 pb-10" >
      <ul className="flex w-full h-[37rem] lg:h-[43rem] flex-col flex-wrap gap-8 font-bold">
        { AllAiData.map((category, index)=>(
          <li key={index} className="text-center hover:opacity-80 text-lg lg:text-xl font-bold text-[#009688] lg:mb-2">
            <button
              onClick = {()=>{
                router.push({ 
                  pathname:`/AiSearch/${category.CategoryName}`,
                  query:{category_id:category.category_id}
                })
              }}
            >
              {category.CategoryName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};