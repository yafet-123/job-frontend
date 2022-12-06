import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async(req, res) => {
	const {CategoryName , user_id} = req.body;
	const data = await prisma.Category.create({
		data:{
			CategoryName,
			user_id
		},
	});
	res.json(data)
	
}