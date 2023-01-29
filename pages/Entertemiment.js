import React, {useState,useEffect} from "react";
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
import { AdeyMirafOne } from '../data/Entertemiment/AdeyMirafOne'
import { MainHeader } from '../components/MainHeader';
export default function Entertemiment(){
	return(
		<React.Fragment>
      		<MainHeader title="Entertemiment" />
			<section className="flex flex-col w-full h-full bg-gray-300 dark:bg-slate-700 pt-32">
				<div className="flex flex-col p-5 pb-20">
					<div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
						{AdeyMirafOne.map((data,index)=>(
							<iframe 
								key={index} 
								className="rumble" 
								width="100%" 
								height="100%" 
								src="https://rumble.com/embed/v1rccs0/?pub=4" 
								frameBorder="0" 
								allowFullScreen>
							</iframe>
						))}
						
					</div>
				</div>
			</section>
		</React.Fragment>
	)
}