import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer"

export default async function handleforgotpasswordconformation(req, res){
	const { slug } = req.query;
  	const id = slug[0]
  	const token = slug[1]
  	const oldUser = await prisma.User.findUnique({ 
	   	where:{
  			user_id:Number(id)
  		},
	});
  	if (!oldUser) {
    	return res.json({ status: "User Not Exists!!" });
  	}
  	const secret = process.env.JWT_SECRET + oldUser.Password;
  	try{
    	const verify = jwt.verify(token, secret);
    	res.render("/index", { email: verify.email, status: "Not done Verified" });
  	}catch (error) {
    	console.log(error);
    	res.send("Not Verified");
  	}
}