import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import pool from '../../../db.js'; // Import your PostgreSQL connection pool

export default async function handleupdatecategory(req, res) {
  const { updatecategoryid } = req.query;
  const { CategoryName } = req.body;

  const updateCategoryQuery = `
    UPDATE "BlogsCategory"
    SET "CategoryName" = $1
    WHERE "category_id" = $2
    RETURNING *;
  `;

  const client = await pool.connect();

  try {
    const result = await client.query(updateCategoryQuery, [CategoryName, updatecategoryid]);
    const data = result.rows[0];

    res.json(data);
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).json({ error: 'Failed to update category' });
  } finally {
    client.release(); // Release the client back to the pool
  }
}
