import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async(req, res) => {
	const { 
		CompanyName,
		Image,
		JobsType,
		CareerLevel,
		EmploymentType,
		Salary,
		JobsDescreption,
		JobsRequirement,
		DeadLine,
		Apply,
		user_id,
		categoryId,
		LocationId
	} = req.body


	const Jobdata = await prisma.Job.create({
		data:{
			CompanyName,
			Image,
			JobsType,
			Location,
			CareerLevel,
			EmploymentType,
			Salary,
			JobsDescreption,
			JobsRequirement,
			DeadLine,
			Apply,
			user_id:Number(user_id),
			location_id: Number(LocationId)
		}
	});

	for (let j = 0; j < categoryId.length; j++) {
	  	const jobcategory = await prisma.JobCategory.create({
		    data:{
		      user_id : Number(user_id),
		      category_id : Number(categoryId[j]),
		      job_id : Number(job_id)
		    }
	  	})
	}
	
}