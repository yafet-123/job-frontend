import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import pool from '../../db.js'; // Import your PostgreSQL connection pool

export default async function handleaddlocation(req, res) {
  const { LocationName, user_id, Image } = req.body;

  const insertLocationQuery = `
    INSERT INTO "Location" ("LocationName", "user_id", "Image")
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const client = await pool.connect();

  try {
    const result = await client.query(insertLocationQuery, [LocationName, user_id, Image]);
    const data = result.rows[0];

    res.json(data);
  } catch (err) {
    console.error('Error adding location:', err);
    res.status(500).json({ error: 'Failed to add location' });
  } finally {
    client.release(); // Release the client back to the pool
  }
}
