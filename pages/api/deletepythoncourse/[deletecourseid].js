import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import pool from '../../../db.js'; // Adjust the path to your PostgreSQL connection pool

export default async function handledeletecourse(req, res) {
  const { deletecourseid } = req.query;

  const deleteCourseQuery = `
    DELETE FROM "PythonCourse"
    WHERE course_id = $1
    RETURNING *;
  `;

  const values = [Number(deletecourseid)];

  const client = await pool.connect();

  try {
    const result = await client.query(deleteCourseQuery, values);
    const deletedCourse = result.rows[0];

    if (deletedCourse) {
      res.json(deletedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (err) {
    console.error('Error deleting course:', err);
    res.status(500).json({ error: 'Failed to delete course' });
  } finally {
    client.release(); // Release client back to the pool
  }
}
