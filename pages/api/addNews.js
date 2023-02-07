import { prisma } from '../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleaddnews(req, res){
	const { 
		Header,
		Image,
		ShortDescription,
		Description,
		user_id,
		categoryId
	} = req.body

	let createJobCategory = []

	for (let j = 0; j < categoryId.length; j++) {
		createJobCategory.push({
			user_id : Number(user_id),
			category_id : Number(categoryId[j]),
		})
	}

	const Jobdata = await prisma.News.create({
		data:{
			Header,
			Image,
			ShortDescription,
			Description,
			user_id:Number(user_id),
			NewsCategoryRelationship:{
				create: createJobCategory
			}
		}
	});


	res.json(Jobdata)
	
}