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
	
}