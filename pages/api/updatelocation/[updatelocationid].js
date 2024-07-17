import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import pool from '../../../db.js'; // Import your PostgreSQL connection pool

export default async function handleupdatelocation(req, res) {
  const { updatelocationid } = req.query;
  const { LocationName } = req.body;

  const updateLocationQuery = `
    UPDATE "Location"
    SET "LocationName" = $1
    WHERE "location_id" = $2
    RETURNING *;
  `;

  const client = await pool.connect();

  try {
    const result = await client.query(updateLocationQuery, [LocationName, Number(updatelocationid)]);
    const data = result.rows[0];

    if (!data) {
      return res.status(404).json({ error: 'Location not found' });
    }

    res.json(data);
  } catch (err) {
    console.error('Error updating location:', err);
    res.status(500).json({ error: 'Failed to update location' });
  } finally {
    client.release(); // Release the client back to the pool
  }
}
