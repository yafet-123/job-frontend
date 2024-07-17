import pool from '../../../db.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdateuser(req, res) {
  const { updateuserid } = req.query;
  const { UserName, email, firstName, lastName, age } = req.body;

  const updateUserQuery = `
    UPDATE "User"
    SET "UserName" = $1, email = $2, "firstName" = $3, "lastName" = $4, age = $5
    WHERE user_id = $6
    RETURNING user_id, "UserName", email, "firstName", "lastName", age, "CreatedDate", "ModifiedDate"
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(updateUserQuery, [
      UserName,
      email,
      firstName,
      lastName,
      age,
      Number(updateuserid),
    ]);

    const data = result.rows[0];
    client.release();

    res.status(StatusCodes.OK).json(data);
  } catch (err) {
    console.error('Database Query Error:', err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'An error occurred while updating the user',
    });
  }
}
