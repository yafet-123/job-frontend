import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdateuser(req, res){
	const {updateuserid} = req.query
	console.log(req.body)
	const {firstName,lastName,age,UserName,email} = req.body
	const data = await prisma.User.update({
		where:{user_id:Number(updateuserid)},
		data:{
			firstName,
			lastName,
			age:age,
			UserName,
			email
		},
	});
	res.json(data)
}