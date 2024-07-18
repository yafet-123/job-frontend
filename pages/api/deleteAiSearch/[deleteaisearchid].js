import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import pool from '../../../db.js'; // Import your PostgreSQL connection pool

export default async function handledeletecategory(req, res) {
  const { deleteaisearchid } = req.query;
  console.log(req.query);

  const deleteAiSearch = `
    DELETE FROM "Detail"
    WHERE "detail_id" = $1
    RETURNING *;
  `;

  const client = await pool.connect();

  try {
    const result = await client.query(deleteAiSearch, [deleteaisearchid]);
    const data = result.rows[0];

    res.json(data);
  } catch (err) {
    console.error('Error deleting AiSearch:', err);
    res.status(500).json({ error: 'Failed to delete AiSearch' });
  } finally {
    client.release(); // Release the client back to the pool
  }
}