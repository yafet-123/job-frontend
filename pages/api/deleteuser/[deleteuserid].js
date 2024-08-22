import db from '../../../db.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeleteuser(req, res) {
  const { deleteuserid } = req.query;
  console.log(req.query);

  const deleteUserQuery = `
    DELETE FROM "User"
    WHERE user_id = $1
    RETURNING user_id, "UserName", email, "firstName", "lastName", age, "CreatedDate", "ModifiedDate"
  `;

  try {
    const result = await db.query(deleteUserQuery, [Number(deleteuserid)]);

    const data = result;

    if (!data) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
      return;
    }

    res.status(StatusCodes.OK).json(data);
  } catch (err) {
    console.error('Database Query Error:', err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'An error occurred while deleting the user',
    });
  }
}
