import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async(req, res) => {
	const {updateuserid} = req.query
	const {UserName,email} = req.body
	const data = await prisma.User.update({
		where:{user_id:Number(id)},
		data:{
			UserName,
			email
		},
	});
	res.json(data)
}