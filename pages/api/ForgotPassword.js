import { prisma } from '../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer"

export default async function handleforgotpassword(req, res){
	const {email} = req.body;

		console.log('new data')
	    const oldUser = await prisma.User.findUnique({ 
	    	where:{
  				email:email
  			},
	    });
	    console.log(oldUser)
	    if (oldUser == null) {
	      return res.json({ status: "User Not Exists!!" });
	    }
	    const secret = process.env.JWT_SECRET + oldUser.password;
	    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
	      expiresIn: "5m",
	    });
	    
	    const link = `http://localhost:3000/Forgotpassword/${oldUser.user_id}/${token}`;
	    console.log(link)
	    var transporter = nodemailer.createTransport({
	      service: "gmail",
	      auth: {
	        user: "hulumedia12@gmail.com",
	        pass: "mkhvelqnhlpkznji",
	      },
	    });

	    var mailOptions = {
	      from: "hulumedia12@gmail.com",
	      to: email,
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
	    res.json(link)
	
}