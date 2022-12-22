import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async(req, res) => {
	const {deletejobid} = req.query
	console.log(req.query)
	const data = await prisma.Job.delete({
		where:{job_id:Number(deletejobid)},
	});
	res.json(data)
}