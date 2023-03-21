import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import Image from 'next/image'
import {InterviewQuestionAndAnswer} from '../../data/InterviewQuestionAndAnswer'
export function JobInterview(){
	return(
		<section className="flex flex-col w-full h-full px-0">
			<div className="py-20 px-2 lg:px-10">
				<h1 className="font-bold text-3xl md:text-4xl lg:text-5xl capitalize mb-5 text-center">
					Job Interview Tips
				</h1>
				<Image 
					src="/images/interviewLarge.jpg" 
					width={2000} 
					height={750}
					alt="interview"
				/>				
				<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed my-5 w-full">
					<span className="text-2xl font-bold">Job Interviews</span> are a great way for an employer to get to know more about you and determine whether or 
					not you are right for an open position. However, all too often, young professionals overlook the 
					fact that interviews are also a time to gauge whether they will fit in and find success at the 
					organization. It’s not only a time for the interviewer to ask you questions, it’s also a time 
					for you to ask the interviewer questions. Asking several focused questions can highlight your 
					qualifications, demonstrate confidence, and reinforce your commitment to the job and company.
				</p>

				<div className="flex flex-col mb-5">
					<div className="flex flex-col">
						<h3 className="font-semibold text-xl md:text-2xl lg:text-3xl capitalize mb-5 text-left">
							Pre-Interview Research
						</h3>

						<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed mb-5 w-full">
							Research and analyze the position and the company before the interview in effort to 
							determine whether or not there is a fit.  Take the time to prepare your own thoughtful 
							questions for interviewers to respond to during the interview so that you are able to 
							better determine whether or not the position and company are a fit for you.
						</p>
					</div>

					<div className="flex flex-col">
						<h3 className="font-semibold text-xl md:text-2xl lg:text-3xl capitalize mb-5 text-left">
							Interview
						</h3>

						<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed mb-5 w-full">
							Most interviews have a schedule – which makes it easier to follow along and prepare.  
							The employer will talk about their organization, ask about your skills and experience 
							and what you have to offer.  A sample problem or situation may be offered for you to 
							offer a solution.  Think through it and analyze it like a class problem. 
							Teamwork is important to offer as are concise answers. A timeline will 
							usually be offered. If not, ask for one. 
						</p>

						<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed mb-5 w-full">
							When asked a question during an interview remember to keep your answers short. While it is 
							true that you should answer many of the questions in a precise manner, there are 
							also instances where you have to give detailed and somewhat longer answers. 
							If you are asked about a specific task in your previous job that you performed 
							really well, be sure to elaborate on your answer. Providing too short of a 
							response to a question requiring an example means you’re not selling yourself well enough. 
							That said, be sure not to ramble. Generally, limit your more detailed responses to 2-3 
							minutes. You can practice this by rehearsing verbal presentations of key qualifications 
							in your resume. 
						</p>	
						<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed mb-5 w-full">
							Be ready to convey your relevant skills, interests, and goals. Practice explaining your 
							strengths and accomplishments ahead of time and have your elevator pitch ready.  If they 
							ask you what your salary expectation, it is a good idea to know the starting salary range 
							for your major so that you are able to provide realistic information.
						</p>
					</div>

					<div className="flex flex-col">
						<h3 className="font-semibold text-xl md:text-2xl lg:text-3xl capitalize mb-5 text-left">
							How to answer common interview questions
						</h3>

						<ul className="">
							{ InterviewQuestionAndAnswer.map((data,index)=>(
								<li key={index} className="list-decimal font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed my-5 w-full">
									<span className="font-semibold text-2xl block mb-5">{data.question}</span> 
									<span className="font-semibold text-2xl mr-5"> How to answer:</span>
									{data.answer}
								</li>
							))
						}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}