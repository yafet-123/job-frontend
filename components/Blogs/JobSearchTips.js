import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import Image from 'next/image'
export function JobSearchTips(){
	return(
		<section className="flex flex-col w-full h-full px-0">
			<div className="py-20 px-2 lg:px-10">
				<h1 className="font-bold text-3xl md:text-4xl lg:text-5xl capitalize mb-5 text-center">
					Job Searching Tips
				</h1>
				<Image 
					src="/images/jobSearchLarge.jpg" 
					width={2000} 
					height={750}
					alt="job search"
				/>
				<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed my-5 w-full">
					Job searching, it’s a stressful time. Whether you are leaving University and 
					looking for your first full time job or you are looking to move careers, everyone goes 
					through the same experience; Preparation, Applications and Interviews.
				</p>

				<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed mb-5 w-full">
					In Ethiopia September and later summer are the two busiest points in the year for company hiring. 
					In September you have people starting the new year, moving on with their life plan, 
					looking for a change or honestly sometimes just better salaries.
				</p>

				<div className="flex flex-col mb-5">
					<h2 className="font-bold text-2xl md:text-3xl lg:text-4xl capitalize my-5 text-center">
						Steps to find a better job
					</h2>
					<div className="flex flex-col">
						<h3 className="font-semibold text-xl md:text-2xl lg:text-3xl capitalize mb-5 text-left">
							Stage 1: Your CV
						</h3>
						<Image 
							src="/images/cvLarge.jpg" 
							width={500} 
							height={500}
							alt="CV"
						/>
						<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed mb-5 w-full">
							The first step is to work on your CV. It’s your representation in the hiring world. 
							Just like dressing well for an interview to make an impression, you need to achieve 
							the same with your CV. It must be tidy, organised and have no errors. If a hiring manager 
							finds a spelling mistake (although a mistake that could easily happen to anyone) to 
							them this means you lack attention to detail. It’s the little things that push you over 
							the top. Keep it simple and choose a professional layout, don’t include pictures or 
							crazy fonts (unless you are a performer or applying to artistic design jobs). 
							Most importantly, ensure that all your skills and experience relevant to the role are listed.
						</p>
						<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed mb-5 w-full">
							University graduates and younger candidates are not expected to have more than two 
							A4 pages to their CV because you are “less experienced” in the working world.
						</p>

					</div>

					<div className="flex flex-col">
						<h3 className="font-semibold text-xl md:text-2xl lg:text-3xl capitalize mb-5 text-left">Stage 2: Cover Letter</h3>
						<Image 
							src="/images/letter-of-application.jpg" 
							width={500} 
							height={500}
							alt="letter of applications"
						/>

						<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed my-5 w-full">
							There is much discussion lately throughout job agencies about whether a cover letter is important. 
							Having just gone through the job hunting process myself whilst simultaneously being involved in hiring 
							at my current company, I can assure you that it is an important aspect of your application. It shows 
							that you have read the job description and are genuinely interested in the position. It’s easy to 
							shoot off applications to hundreds of roles via Reed or Indeed for example. However, if you put 
							time into your cover letter, you are far more likely to make an impression on the reader.
						</p>	
					</div>

					<div className="flex flex-col">
						<h3 className="font-semibold text-xl md:text-2xl lg:text-3xl capitalize mb-5 text-left">Stage 3: Applications</h3>
						<Image 
							src="/images/applicationForm.jpg" 
							width={500} 
							height={500}
							alt="application form"
						/>
						<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed my-5 w-full">
							This is probably the hardest part of the job hunting process and I’ll be honest with you, 
							it takes time. The trick is to apply to everything relevant. Sometimes you may feel you 
							are not 100% what they are looking for butm to be honest, that’s their decision. Remember, 
							it will never hurt you to apply. Find jobs that match your experience level, don’t always 
							worry about the salary band as different places and industries have different breakdowns. 
							Work off of the job description, as this is a better indication of the role.
						</p>	
						<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed mb-5 w-full">
							This part will take time, it will feel draining and it will have its ups and downs. 
							However, you have the opportunity to go nuts at this point. The more applications 
							you complete, the higher your response rate will be. Many companies will not respond 
							unless you make it through a certain round and they are the hardest because you never 
							really know. It’s easier in a way receiving rejections because then you can move on. 
						</p>

						<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed mb-5 w-full">
							Keep going no matter what. If you are having a particularly bad day with several rejections, 
							don’t be disheartened. Take that day to relax and focus on something positive, then return 
							with fire in your belly the next day. Some say applying to hundreds on one day a week is 
							a good approach. However, jobs open every day and get snatched up quick.
						</p>
					</div>

					<div className="flex flex-col">
						<h3 className="font-semibold text-xl md:text-2xl lg:text-3xl capitalize mb-5 text-left">Stage 4: Interviews</h3>
						<Image 
							src="/images/interviewLarge.jpg" 
							width={500} 
							height={500}
							alt="interview"
						/>
						<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed my-5 w-full">
							Many feel that this section of the process is the most stressful, but remember 
							you are already doing well if you have reached this stage. The company is 
							interested in you and they want to meet you in person. You have already 
							completed three stages to get there, so remember it’s their chance to meet 
							you but also your chance to meet them and make sure the role is what you want.
						</p>

						<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed mb-5 w-full">
							Prior to your interview, you must do some research. Look up the company and 
							read what they are about (even if you already did this when applying). 
							See if you can find some details about the people you will be meeting and 
							plan some of your answers.
						</p>	
						<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed mb-5 w-full">
							The first impression is key, so look up your route and plan ahead. If you don’t know the area, 
							don’t just get the earlier train, get the one earlier again. Give yourself time. If you arrive 
							late it looks bad but you will also be flustered and nervous. Arriving early gives you time to 
							relax, have some water and mentally prepare for the meeting ahead.
						</p>

						<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed mb-5 w-full">
							Finally, be yourself. This is the most important advice I can give you. 
							If you get a job by being something you are not, it will only lead to more 
							problems down the line. Rejection is not a reflection on you personally. 
							You got to the interview stage meaning you were a strong candidate. There are 
							many reasons someone else may have got the final job but just remember, that will be you 
							when it’s the right job. Keep the faith!
						</p>
					</div>

					<div className="flex flex-col">
						<h3 className="font-semibold text-xl md:text-2xl lg:text-3xl capitalize mb-5 text-left">Stage 5: Offers and acceptance</h3>
						<Image 
							src="/images/jobOfferLarge.jpg" 
							width={500} 
							height={500}
							alt="job offer"
						/>
						<p className="font-sans text-black dark:text-white text-left text-xl antialiased not-italic tracking-wide leading-relaxed my-5 w-full">
							If it is your dream job, dream salary and perfect location then by all means accept on the 
							spot. However, if like me you have several interviews lined up in a small space of time, 
							it is ok to be honest with the company. You can let them know that you have another 
							interview that afternoon or the following morning and ask if they mind you letting them
							know after that meeting. This not only shows you are a desirable candidate but it also 
							gives you the chance to really consider the offer. Then when you make your decision 
							you will be 100% sure it’s what you want.
						</p>	
					</div>
				</div>

				<div className="flex flex-col items-center justify-center">
					<h1 className="font-bold text-3xl md:text-4xl lg:text-5xl capitalize mb-5 text-center text-blue-700">
						Good Luck
					</h1>
					<Image 
						src="/images/goodLuck.jpg" 
						width={500} 
						height={500}
						alt="good luck"
					/>
				</div>
			</div>
		</section>
	)
}