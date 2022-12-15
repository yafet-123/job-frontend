import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async(req, res) => {
	const {deleteuser} = req.params
	console.log(deleteuser)
	const data = await prisma.User.delete({
		where:{user_id:Number(deleteuser)},
	});
	res.json(data)
}