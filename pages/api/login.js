// pages/api/handleaddlogin.js
import db from '../../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';

export default async function handleaddlogin(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide all values' });
  }

  const userQuery = `
    SELECT * FROM "User" WHERE "UserName" = $1
  `;

  try {
    const userResult = await db.query(userQuery, [username]);
    const user = userResult;

    // Log the user details
    console.log(user);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: `No ${username} can be found` });
    }

    const comparePassword = async (candidatePassword) => {
      const isMatch = await bcrypt.compare(candidatePassword, user.Password);
      return isMatch;
    };

    const isPasswordCorrect = await comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.user_id, user: user.UserName },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    res.status(StatusCodes.OK).json({
      userId: user.user_id,
      name: user.UserName,
      role: user.role,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error('Database Query Error:', err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
}