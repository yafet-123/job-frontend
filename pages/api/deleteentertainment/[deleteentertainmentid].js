import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import pool from '../../../db.js'; // Adjust the path to your PostgreSQL connection pool

export default async function handledeleteentertainment(req, res) {
  const { deleteentertainmentid } = req.query;
  console.log(req.query);

  const deleteEntertainmentQuery = `
    DELETE FROM "Entertainment"
    WHERE "entertainment_id" = $1
    RETURNING *;
  `;

  const client = await pool.connect();

  try {
    const result = await client.query(deleteEntertainmentQuery, [Number(deleteentertainmentid)]);
    const deletedEntertainment = result.rows[0];
    res.json(deletedEntertainment);
  } catch (err) {
    console.error('Error deleting entertainment:', err);
    res.status(500).json({ error: 'Failed to delete entertainment' });
  } finally {
    client.release(); // Release client back to the pool
  }
}
