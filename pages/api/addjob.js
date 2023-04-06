import { prisma } from '../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleaddjob(req, res){
	const { 
		CompanyName,
		Image,
		JobsName,
		CareerLevel,
		Salary,
		Description,
		shortDescription,
		DeadLine,
		categoryId,
		LocationId,
		user_id
	} = req.body

	let createJobCategory = []

	for (let j = 0; j < categoryId.length; j++) {
		createJobCategory.push({
			user_id : Number(user_id),
			category_id : Number(categoryId[j]),
		})
	}

	const Jobdata = await prisma.Job.create({
		data:{
			CompanyName,
			Image,
			JobsName,
			CareerLevel,
			EmploymentType,
			Salary,
			JobsDescreption,
			JobsRequirement,
			DeadLine,
			Apply,
			user_id:Number(user_id),
			JobCategory:{
				create: createJobCategory
			}
			location_id:Number(LocationId),
		}
	});



	// for (let j = 0; j < categoryId.length; j++) {
	//   	const jobcategory = await prisma.JobCategory.create({
	// 	    data:{
	// 	      user_id : Number(user_id),
	// 	      category_id : Number(categoryId[j]),
	// 	      job_id : Number(Jobdata.job_id)
	// 	    }
	//   	})
	// }

	res.json(Jobdata)
	
}