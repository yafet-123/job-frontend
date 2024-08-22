import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db from '../../../db.js'; // Import your PostgreSQL connection pool

export default async function handledeletecategory(req, res) {
  const { deletecategoryid } = req.query;
  console.log(req.query);

  const deleteCategoryQuery = `
    DELETE FROM "EntertainmentCategory"
    WHERE "category_id" = $1
    RETURNING *;
  `;

  try {
    const result = await db.query(deleteCategoryQuery, [deletecategoryid]);
    const data = result;

    res.json(data);
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ error: 'Failed to delete category' });
  }
}
