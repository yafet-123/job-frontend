import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db from '../../../db.js'; // Import your PostgreSQL connection pool

export default async function handleupdatelocation(req, res) {
  const { updatelocationid } = req.query;
  const { LocationName } = req.body;

  const updateLocationQuery = `
    UPDATE "Location"
    SET "LocationName" = $1
    WHERE "location_id" = $2
    RETURNING *;
  `;

  try {
    const result = await db.query(updateLocationQuery, [LocationName, Number(updatelocationid)]);
    const data = result;

    if (!data) {
      return res.status(404).json({ error: 'Location not found' });
    }

    res.json(data);
  } catch (err) {
    console.error('Error updating location:', err);
    res.status(500).json({ error: 'Failed to update location' });
  }
}
