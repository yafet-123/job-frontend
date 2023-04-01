import { useRouter } from 'next/router'
import Link from 'next/link'

export const AllData = ({AllAiData}) => {
  console.log(AllAiData)
  const router = useRouter();
  return (
    <div className="flex h-full w-full lg:px-20 pb-10" >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-10 mb-5 w-full h-full">
        { AllAiData.map(({Header,service,description,link}, index)=>(
          <div key={index} className="flex flex-col w-full bg-white dark:bg-slate-600 border rounded-2xl p-10 group hover:bg-slate-100">
            <h3 className="font-bold text-xl lg:text-2xl mb-5 text-left w-full group-hover:text-[#009688] dark:group-hover:text-black">{Header}</h3>
            <p className="flex flex-row w-3/4 flex-wrap">
              { service.map((data,index)=>(
                <span key={index} className="mr-2 px-2 bg-[#009688] text-xs lg:text-sm font-bold dark:text-white text-white border rounded-2xl mb-2">
                  {data}
                </span>
              ))}
            </p>

            <p className="text-left font-normal my-5 text-md lg:text-lg group-hover:text-[#009688] dark:group-hover:text-black">
              {description}
            </p>

            <div className="flex items-center justify-center">
              <Link
                href={link}
              >
                <a className="text-center text-white bg-[#009688] border rounded-2xl text-lg lg:text-xl font-bold hover:bg-white hover:text-[#009688] p-2">Visit Website</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};