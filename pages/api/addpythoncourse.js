import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db from '../../db.js'; // Adjust the path to your PostgreSQL connection pool

export default async function handleaddnews(req, res) {
  const { title, content, user_id } = req.body;

  const insertNewsQuery = `
    INSERT INTO "PythonCourse" (title, content, user_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [title, content, Number(user_id)];

  try {
    const result = await db.query(insertNewsQuery, values);
    const newNews = result;

    res.json(newNews);
  } catch (err) {
    console.error('Error adding news:', err);
    res.status(500).json({ error: 'Failed to add news' });
  }
}