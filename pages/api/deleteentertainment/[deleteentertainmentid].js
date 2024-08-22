import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db from '../../../db.js'; // Adjust the path to your PostgreSQL connection pool

export default async function handledeleteentertainment(req, res) {
  const { deleteentertainmentid } = req.query;
  console.log(req.query);

  const deleteEntertainmentQuery = `
    DELETE FROM "Entertainment"
    WHERE "entertainment_id" = $1
    RETURNING *;
  `;

  try {
    const result = await db.query(deleteEntertainmentQuery, [Number(deleteentertainmentid)]);
    const deletedEntertainment = result;
    res.json(deletedEntertainment);
  } catch (err) {
    console.error('Error deleting entertainment:', err);
    res.status(500).json({ error: 'Failed to delete entertainment' });
  }
}
