import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async(req, res) => {
	const {updatejobid} = req.query
	const {CategoryName} = req.body
	const data = await prisma.Job.update({
		where:{job_id:Number(updatejobid)},
		data:{
			CategoryName
		},
	});
	res.json(data)