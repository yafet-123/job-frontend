import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";
import db from '../../db.js'; // Import your PostgreSQL connection pool

export default async function handleforgotpassword(req, res) {
    const { email } = req.body;

    try {
        const queryUser = `
            SELECT * FROM "User" WHERE email = $1
        `;
        const userResult = await db.query(queryUser, [email]);
        const oldUser = userResult;

        if (!oldUser) {
            return res.json({ status: "user not exit" });
        }

        const secret = process.env.JWT_SECRET + oldUser.Password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser.user_id }, secret, {
            expiresIn: "5m",
        });

        const updateTokenQuery = `
            UPDATE "User" 
            SET "resetToken" = $1 
            WHERE email = $2
            RETURNING *;
        `;

        await db.query(updateTokenQuery, [token, email]);

        const link = `${process.env.link}/ResetPassword?token=${token}`;

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

        return res.json({ status: "An Email send to your email address" });
    } catch (error) {
        console.error('Error handling forgot password:', error);
        return res.status(500).json({ error: 'Failed to process forgot password request' });
    }
}
