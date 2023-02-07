import { prisma } from '../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleaddnewscategory(req, res){
	const {CategoryName , user_id} = req.body;
	const data = await prisma.NewsCategory.create({
		data:{
			CategoryName,
			user_id
		},
	});
	res.json(data)
	
}