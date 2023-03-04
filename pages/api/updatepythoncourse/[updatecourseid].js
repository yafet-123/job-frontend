import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdatecategory(req, res){
	const {updatecourseid} = req.query
	const {title , content, user_id} = req.body
	const data = await prisma.PythonCourse.update({
		where:{course_id:Number(updatecourseid)},
		data:{
			title,
			content,
		},
	});

	res.json(data)
}