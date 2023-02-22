import { prisma } from '../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer"

export default async function handleforgotpasswordconformation(req, res){
	const { id, token } = req.params;
  	console.log(req.params);
  	const oldUser = await prisma.User.findUnique({ 
	   	where:{
  			user_id:id
  		},
	});
  	if (!oldUser) {
    	return res.json({ status: "User Not Exists!!" });
  	}
  	const secret = JWT_SECRET + oldUser.password;
  	try{
    	const verify = jwt.verify(token, secret);
    	res.render("index", { email: verify.email, status: "Not Verified" });
  	}catch (error) {
    	console.log(error);
    	res.send("Not Verified");
  	}
}