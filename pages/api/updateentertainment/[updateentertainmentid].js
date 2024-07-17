import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import pool from '../../../db.js'; // Adjust the path to your PostgreSQL connection pool

export default async function handleupdateentertainment(req, res) {
  const { updateentertainmentid } = req.query;
  const { Header, ShortDescription, Description, user_id, categoryId } = req.body;

  const updateEntertainmentQuery = `
    UPDATE "Entertainment"
    SET "Header" = $1,
        "ShortDescription" = $2,
        "Description" = $3
    WHERE "entertainment_id" = $4
    RETURNING *;
  `;

  const deleteEntertainmentCategoryQuery = `
    DELETE FROM "EntertainmentCategoryRelationship"
    WHERE "entertainment_id" = $1;
  `;

  const createEntertainmentCategoryQuery = `
    INSERT INTO "EntertainmentCategoryRelationship" ("user_id", "category_id", "entertainment_id")
    VALUES ($1, $2, $3);
  `;

  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Start transaction

    // Update entertainment data
    const result = await client.query(updateEntertainmentQuery, [
      Header,
      ShortDescription,
      Description,
      Number(updateentertainmentid)
    ]);

    const entertainment = result.rows[0];

    // Delete existing entertainment categories
    await client.query(deleteEntertainmentCategoryQuery, [Number(updateentertainmentid)]);

    // Insert new entertainment categories
    for (let j = 0; j < categoryId.length; j++) {
      await client.query(createEntertainmentCategoryQuery, [
        Number(user_id),
        Number(categoryId[j]),
        Number(updateentertainmentid)
      ]);
    }

    await client.query('COMMIT'); // Commit transaction

    res.json(entertainment);
  } catch (err) {
    await client.query('ROLLBACK'); // Rollback transaction on error
    console.error('Error updating entertainment:', err);
    res.status(500).json({ error: 'Failed to update entertainment' });
  } finally {
    client.release(); // Release client back to the pool
  }
}
