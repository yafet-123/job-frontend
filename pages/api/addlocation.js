import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db from '../../db.js'; // Import your PostgreSQL connection pool

export default async function handleaddlocation(req, res) {
  const { LocationName, user_id, Image } = req.body;

  const insertLocationQuery = `
    INSERT INTO "Location" ("LocationName", "user_id", "Image")
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  try {
    const result = await db.query(insertLocationQuery, [LocationName, user_id, Image]);
    const data = result;

    res.json(data);
  } catch (err) {
    console.error('Error adding location:', err);
    res.status(500).json({ error: 'Failed to add location' });
  }
}
