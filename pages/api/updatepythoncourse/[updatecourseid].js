import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db from '../../../db.js'; // Adjust the path to your PostgreSQL connection pool

export default async function handleupdatecourse(req, res) {
  const { updatecourseid } = req.query;
  const { title, content } = req.body;

  const updateCourseQuery = `
    UPDATE "PythonCourse"
    SET title = $1, content = $2
    WHERE course_id = $3
    RETURNING *;
  `;

  const values = [title, content, Number(updatecourseid)];

  try {
    const result = await db.query(updateCourseQuery, values);
    const updatedCourse = result;

    res.json(updatedCourse);
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ error: 'Failed to update course' });
  }
}
