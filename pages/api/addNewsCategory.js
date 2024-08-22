import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db from '../../db.js'; // Import your PostgreSQL connection pool

export default async function handleaddcategory(req, res) {
  const { CategoryName, user_id } = req.body;

  const addCategoryQuery = `
    INSERT INTO "NewsCategory" ("CategoryName", "user_id")
    VALUES ($1, $2)
    RETURNING *;
  `;

  try {
    const result = await db.query(addCategoryQuery, [CategoryName, user_id]);
    const data = result;

    res.json(data);
  } catch (err) {
    console.error('Error adding category:', err);
    res.status(500).json({ error: 'Failed to add category' });
  }
}
