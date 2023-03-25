import { prisma } from '../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleaddblogs(req, res){
	const { 
		Header,
		Image,
		ShortDescription,
		Description,
		user_id,
		categoryId
	} = req.body

	let createBlogCategory = []

	for (let j = 0; j < categoryId.length; j++) {
		createBlogCategory.push({
			user_id : Number(user_id),
			category_id : Number(categoryId[j]),
		})
	}

	const blogdata = await prisma.Blogs.create({
		data:{
			Header,
			Image,
			ShortDescription,
			Description,
			user_id:Number(user_id),
			BlogsCategoryRelationship:{
				create: createBlogCategory
			}
		}
	});


	res.json(blogdata)
	
}