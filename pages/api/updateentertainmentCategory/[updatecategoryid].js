import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db from '../../../db.js'; // Import your PostgreSQL connection pool

export default async function handleupdatecategory(req, res) {
  const { updatecategoryid } = req.query;
  const { CategoryName } = req.body;

  const updateCategoryQuery = `
    UPDATE "EntertainmentCategory"
    SET "CategoryName" = $1
    WHERE "category_id" = $2
    RETURNING *;
  `;

  try {
    const result = await db.query(updateCategoryQuery, [CategoryName, updatecategoryid]);
    const data = result;

    res.json(data);
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).json({ error: 'Failed to update category' });
  }
}


