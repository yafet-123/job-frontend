import { prisma } from '../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleaddnews(req, res){
	const { 
		title,
		content,
		user_id
	} = req.body

	const Jobdata = await prisma.CSSCourse.create({
		data:{
			title,
			content,
			user_id:Number(user_id),
			CourseCategoryRelationship:{
				create: createJobCategory
			}
		}
	});


	res.json(Jobdata)
	
}