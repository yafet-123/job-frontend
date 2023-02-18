import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export function Content() {
     return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
               <ReactPlayer className="w-full h-full" url='https://rumble.com/embed/v1rccs0/?pub=4' />
               <ReactPlayer className="w-full h-full" url='https://rumble.com/embed/v1rccs0/?pub=4' />
               <ReactPlayer className="w-full h-full" url='https://rumble.com/embed/v1rccs0/?pub=4' />
               <ReactPlayer className="w-full h-full" url='https://rumble.com/embed/v1rccs0/?pub=4' />
               <ReactPlayer className="w-full h-full" url='https://rumble.com/embed/v1rccs0/?pub=4' />
               <ReactPlayer className="w-full h-full" url='https://rumble.com/embed/v1rccs0/?pub=4' />
               <ReactPlayer className="w-full h-full" url='https://rumble.com/embed/v1rccs0/?pub=4' />
               <ReactPlayer className="w-full h-full" url='https://rumble.com/embed/v1rccs0/?pub=4' />
               <ReactPlayer className="w-full h-full" url='https://rumble.com/embed/v1rccs0/?pub=4' />
          </div>
     )
}
     