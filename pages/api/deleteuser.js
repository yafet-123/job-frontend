import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async(req, res) => {
	const {id} = req.params
	const data = await prisma.User.delete({
		where:{user_id:Number(id)},
	});
	res.json(data)
}