import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeletecategory(req, res){
	const {deleteentertainmentid} = req.query
	console.log(req.query)
	const data = await prisma.Entertainment.delete({
		where:{entertainment_id:Number(deleteentertainmentid)},
	});
	res.json(data)
}