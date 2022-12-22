import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async(req, res) => {
	const {deletelocationid} = req.query
	console.log(req.query)
	const data = await prisma.Location.delete({
		where:{location_id:Number(deletelocationid)},
	});
	res.json(data)
}