import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import pool from '../../../db.js'; // Adjust the path to your PostgreSQL connection pool

export default async function handleupdatecourse(req, res) {
  const { updatecourseid } = req.query;
  const { title, content } = req.body;

  const updateCourseQuery = `
    UPDATE "HTMLCourse"
    SET title = $1, content = $2
    WHERE course_id = $3
    RETURNING *;
  `;

  const values = [title, content, Number(updatecourseid)];

  const client = await pool.connect();

  try {
    const result = await client.query(updateCourseQuery, values);
    const updatedCourse = result.rows[0];

    res.json(updatedCourse);
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ error: 'Failed to update course' });
  } finally {
    client.release(); // Release client back to the pool
  }
}
