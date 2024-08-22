import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db from '../../../db.js'; // Import your PostgreSQL connection pool

export default async function handledeletecategory(req, res) {
  const { deleteaisearchid } = req.query;
  console.log(req.query);

  const deleteAiSearch = `
    DELETE FROM "Detail"
    WHERE "detail_id" = $1
    RETURNING *;
  `;

  try {
    const result = await db.query(deleteAiSearch, [deleteaisearchid]);
    const data = result;

    res.json(data);
  } catch (err) {
    console.error('Error deleting AiSearch:', err);
    res.status(500).json({ error: 'Failed to delete AiSearch' });
  }
}