import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async(req, res) => {
	const {updatelocationid} = req.query
	const {CategoryName} = req.body
	const data = await prisma.Category.update({
		where:{category_id:Number(updatelocationid)},
		data:{
			CategoryName
		},
	});
	res.json(data)
}