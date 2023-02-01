import { prisma } from '../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleaddlocation(req, res){
	const {LocationName , user_id, Image} = req.body;
	const data = await prisma.Location.create({
		data:{
			LocationName,
			user_id,
			Image
		},
	});
	res.json(data)
	
}