import pool from '../../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';

export default async function handleadduser(req, res) {
  const { UserName, Password, firstName, lastName, age, email, role } = req.body;
  console.log(UserName);

  try {
    const hashedPassword = bcrypt.hashSync(Password, 8);

    const insertUserQuery = `
      INSERT INTO "User" ("UserName", email, "firstName", "lastName", age, "Password", role)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING user_id, "UserName"
    `;

    const client = await pool.connect();

    const result = await client.query(insertUserQuery, [
      UserName,
      email,
      firstName,
      lastName,
      age,
      hashedPassword,
      role,
    ]);

    const data = result.rows[0];

    const token = jwt.sign(
      { userId: data.user_id, user: data.UserName },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    client.release();

    res.status(StatusCodes.CREATED).json({
      data: {
        userId: data.user_id,
        user: data.UserName,
      },
      token,
    });
  } catch (err) {
    console.error('Database Query Error:', err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'An error occurred while creating the user',
    });
  }
}

