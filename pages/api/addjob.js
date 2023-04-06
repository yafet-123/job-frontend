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
		Descreption,
		shortDescreption,
		DeadLine,
		categoryId,
		LocationId,
		user_id
	} = req.body

	let createJobCategory = []
	let createLocationCategory = []

	for (let j = 0; j < categoryId.length; j++) {
		createJobCategory.push({
			user_id : Number(user_id),
			category_id : Number(categoryId[j]),
		})
	}

	for (let i = 0; i < LocationId.length; i++) {
		createLocationCategory.push({
			user_id : Number(user_id),
			location_id : Number(LocationId[i]),
		})
	}

	const Jobdata = await prisma.Job.create({
		data:{
			CompanyName,
			Image,
			JobsName,
			CareerLevel,
			Salary,
			Descreption,
			shortDescreption,
			DeadLine,
			user_id:Number(user_id),
			JobCategory:{
				create: createJobCategory
			},
			JobLocation:{
				create: createLocationCategory
			}
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