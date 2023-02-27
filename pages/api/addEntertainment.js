import { prisma } from '../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleaddentertainment(req, res){
	const { 
		Header,
		link,
		categoryId,
		ShortDescription,
		user_id,
	} = req.body
	console.log(req.body)
	let createEntertainmentCategory = []

	for (let j = 0; j < categoryId.length; j++) {
		createEntertainmentCategory.push({
			user_id : Number(user_id),
			category_id : Number(categoryId[j]),
		})
	}

	const Jobdata = await prisma.Entertainment.create({
		data:{
			Header,
			link,
			ShortDescription,
			user_id:Number(user_id),
			EntertainmentCategoryRelationship:{
				create: createEntertainmentCategory
			}
		}
	});


	res.json(Jobdata)
	
}