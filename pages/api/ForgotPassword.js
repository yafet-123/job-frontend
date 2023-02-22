import { prisma } from '../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer"

export default async function handleforgotpassword(req, res){
	const {email} = req.body;
	console.log(email)
	try {
	    const oldUser = await prisma.User.findUnique({ 
	    	where:{
  				email:email
  			},
	    });
	    if (!oldUser) {
	      return res.json({ status: "User Not Exists!!" });
	    }
	    const secret = JWT_SECRET + oldUser.password;
	    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
	      expiresIn: "5m",
	    });
	    const link = `http://localhost:3000/forgot/forgotpassword/${oldUser.user_id}/${token}`;
	    var transporter = nodemailer.createTransport({
	      service: "gmail",
	      auth: {
	        user: "adarsh438tcsckandivali@gmail.com",
	        pass: "rmdklolcsmswvyfw",
	      },
	    });

	    var mailOptions = {
	      from: "youremail@gmail.com",
	      to: "thedebugarena@gmail.com",
	      subject: "Password Reset",
	      text: link,
	    };

	    transporter.sendMail(mailOptions, function (error, info) {
	      if (error) {
	        console.log(error);
	      } else {
	        console.log("Email sent: " + info.response);
	      }
	    });
	    console.log(link);
	} catch (error) {}
}