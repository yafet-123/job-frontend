import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdatecategory(req, res){
	const {updatecategoryid} = req.query
	const {CategoryName} = req.body
	const data = await prisma.CourseCategory.update({
		where:{category_id:Number(updatecategoryid)},
		data:{
			CategoryName,
			ShortDescription,
			color,
		},
	});
	res.json(data)
}