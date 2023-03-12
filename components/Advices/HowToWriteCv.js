import Link from "next/link";
import { useRouter } from 'next/router'
import Image from 'next/image'
import {HowToWriteCvData} from '../../data/HowToWriteCvData'
export function HowToWriteCv(){
	return(
		<section className="flex flex-col w-full h-full px-0 bg-[#d1cbc7] dark:bg-slate-700">
			<div className="py-20 px-10">
				<h1 className="font-bold text-3xl md:text-4xl lg:text-5xl capitalize mb-5 text-center">
					How to Write a CV
				</h1>
				<Image 
					src="/images/cvLarge.jpg" 
					width={2000} 
					height={750}
					alt="CV"
				/>
				<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed my-5 w-full">
					The purpose of a curriculum vitae (CV) is to provide a prospective employer with a summary of your education, 
					employment history, skills, achievements and interests.
				</p>

				{ HowToWriteCvData.map((data,index)=>(
					<div key={index} className="flex flex-col">
						<h3 className="font-semibold text-xl md:text-2xl lg:text-3xl capitalize mb-5 text-left">
							{data.title}
						</h3>
						<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed mb-5 w-full">
							{data.description}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}