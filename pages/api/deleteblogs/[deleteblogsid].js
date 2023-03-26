import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeletecategory(req, res){
	const {deleteblogsid} = req.query
	console.log(req.query)
	const data = await prisma.Blogs.delete({
		where:{blogs_id:Number(deleteblogsid)},
	});
	res.json(data)
}