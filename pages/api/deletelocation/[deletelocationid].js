import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db from '../../../db.js'; // Import your PostgreSQL connection pool

export default async function handledeletelocation(req, res) {
  const { deletelocationid } = req.query;

  const deleteLocationQuery = `
    DELETE FROM "Location"
    WHERE "location_id" = $1
    RETURNING *;
  `;

  try {
    const result = await db.query(deleteLocationQuery, [Number(deletelocationid)]);
    const data = result;

    if (!data) {
      return res.status(404).json({ error: 'Location not found' });
    }

    res.json(data);
  } catch (err) {
    console.error('Error deleting location:', err);
    res.status(500).json({ error: 'Failed to delete location' });
  }
}
