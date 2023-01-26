import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async(req, res) => {
	const {deletecategoryid} = req.query
	console.log(req.query)
	const data = await prisma.Category.delete({
		where:{category_id:Number(deletecategoryid)},
	});
	res.json(data)
}