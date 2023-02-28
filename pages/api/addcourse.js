import { prisma } from '../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleaddnews(req, res){
	const { 
		title,
		content,
		categoryId,
		user_id
	} = req.body

	let createJobCategory = []

	for (let j = 0; j < categoryId.length; j++) {
		createJobCategory.push({
			user_id : Number(user_id),
			category_id : Number(categoryId[j]),
		})
	}

	const Jobdata = await prisma.Course.create({
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