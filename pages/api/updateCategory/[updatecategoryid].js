import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdatecategory(req, res){
	const {updatecategoryid} = req.query
	const {CategoryName} = req.body
	const data = await prisma.Category.update({
		where:{category_id:Number(updatecategoryid)},
		data:{
			CategoryName
		},
	});
	res.json(data)
}