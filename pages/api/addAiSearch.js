import { prisma } from '../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleaddblogs(req, res){
	const { 
		Header,
		description,
		like,
		link,
		service,
		categoryId,
		user_id
	} = req.body
	console.log(req.body)

	let createAiSearchCategory = []

	for (let j = 0; j < categoryId.length; j++) {
		createAiSearchCategory.push({
			user_id : Number(user_id),
			category_id : Number(categoryId[j]),
		})
	}

	const aisearchdata = await prisma.Detail.create({
		data:{
			Header,
			description,
			like,
			link,
			service,
			user_id:Number(user_id),
			DetailCategory:{
				create: createAiSearchCategory
			}
		}
	});


	res.json(aisearchdata)
	
}