import React, {useState,useEffect} from "react";
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
import { MainHeader } from '../components/MainHeader';
import { ETSidebar } from '../components/ETSidebar';
export default function Entertemiment(){
	return(
		<React.Fragment>
      		<MainHeader title="Entertemiment" />
			<section className="flex flex-col w-full h-full bg-gray-300 dark:bg-slate-700 pt-32">
				<div className='h-full flex flex-col lg:flex-row'>
		        	<ETSidebar />
		        	<Content />
		        </div> 
			</section>
		</React.Fragment>
	)
}

