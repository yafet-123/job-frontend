import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async(req, res) => {
	const {deleteuserid} = req.query
	console.log(req.query)
	const data = await prisma.User.delete({
		where:{user_id:Number(deleteuserid)},
	});
	res.json(data)
}