import jwt from "jsonwebtoken"; 
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import pool from '../../db.js'; // Import your PostgreSQL connection pool

export default async function handleaddcategory(req, res) {
  const { CategoryName, user_id } = req.body;

  const addCategoryQuery = `
    INSERT INTO "BlogsCategory" ("CategoryName", "user_id")
    VALUES ($1, $2)
    RETURNING *;
  `;

  const client = await pool.connect();

  try {
    const result = await client.query(addCategoryQuery, [CategoryName, user_id]);
    const data = result.rows[0];

    res.json(data);
  } catch (err) {
    console.error('Error adding category:', err);
    res.status(500).json({ error: 'Failed to add category' });
  } finally {
    client.release(); // Release the client back to the pool
  }
}