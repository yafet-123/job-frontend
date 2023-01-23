import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async(req, res) => {
	const {updatejobid} = req.query
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

	let createJobCategory = []

	for (let j = 0; j < categoryId.length; j++) {
		createJobCategory.push({
			category_id : Number(categoryId[j]),
		})
	}

	const data = await prisma.Job.update({
		where:{job_id:Number(updatejobid)},
		data:{
			CompanyName,
			Image,
			JobsType,
			location_id:Number(LocationId),
			CareerLevel,
			EmploymentType,
			Salary,
			JobsDescreption,
			JobsRequirement,
			DeadLine,
			Apply,
			JobCategory:{
				create: createJobCategory
			}
		}
	});

	res.json(data)
}