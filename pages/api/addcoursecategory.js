import { prisma } from '../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleaddcategory(req, res){
	const {CategoryName, ShortDescription, color , user_id} = req.body;
	const data = await prisma.CourseCategory.create({
		data:{
			CategoryName,
			ShortDescription,
			color,
			user_id
		},
	});
	res.json(data)
	
}