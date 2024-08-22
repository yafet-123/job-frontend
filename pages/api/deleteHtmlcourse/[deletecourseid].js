import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db from '../../../db.js'; // Adjust the path to your PostgreSQL connection pool

export default async function handledeletecourse(req, res) {
  const { deletecourseid } = req.query;

  const deleteCourseQuery = `
    DELETE FROM "HTMLCourse"
    WHERE course_id = $1
    RETURNING *;
  `;

  const values = [Number(deletecourseid)];

  try {
    const result = await db.query(deleteCourseQuery, values);
    const deletedCourse = result;

    if (deletedCourse) {
      res.json(deletedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (err) {
    console.error('Error deleting course:', err);
    res.status(500).json({ error: 'Failed to delete course' });
  }
}