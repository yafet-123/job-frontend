import { prisma } from '../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleaddentertainment(req, res){
	const { 
		Header,
		Image,
		ShortDescription,
		Description,
		user_id,
		categoryId
	} = req.body

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
			Image,
			ShortDescription,
			Description,
			user_id:Number(user_id),
			NewsCategoryRelationship:{
				create: createEntertainmentCategory
			}
		}
	});


	res.json(Jobdata)
	
}