import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeletecategory(req, res){
	const {deletecourseid} = req.query
	console.log(req.query)
	const data = await prisma.Course.delete({
		where:{course_id:Number(deletecourseid)},
	});
	res.json(data)
}