import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import pool from '../../../db.js'; // Import your PostgreSQL connection pool

export default async function handledeletelocation(req, res) {
  const { deletelocationid } = req.query;

  const deleteLocationQuery = `
    DELETE FROM "Location"
    WHERE "location_id" = $1
    RETURNING *;
  `;

  const client = await pool.connect();

  try {
    const result = await client.query(deleteLocationQuery, [Number(deletelocationid)]);
    const data = result.rows[0];

    if (!data) {
      return res.status(404).json({ error: 'Location not found' });
    }

    res.json(data);
  } catch (err) {
    console.error('Error deleting location:', err);
    res.status(500).json({ error: 'Failed to delete location' });
  } finally {
    client.release(); // Release the client back to the pool
  }
}
