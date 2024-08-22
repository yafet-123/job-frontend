import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db from '../../../db.js'; // Adjust the path to your PostgreSQL connection pool

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

  try {
    await db.query('BEGIN'); // Start transaction

    // Update entertainment data
    const result = await db.query(updateEntertainmentQuery, [
      Header,
      ShortDescription,
      Description,
      Number(updateentertainmentid)
    ]);

    const entertainment = result;

    // Delete existing entertainment categories
    await db.query(deleteEntertainmentCategoryQuery, [Number(updateentertainmentid)]);

    // Insert new entertainment categories
    for (let j = 0; j < categoryId.length; j++) {
      await db.query(createEntertainmentCategoryQuery, [
        Number(user_id),
        Number(categoryId[j]),
        Number(updateentertainmentid)
      ]);
    }

    await db.query('COMMIT'); // Commit transaction

    res.json(entertainment);
  } catch (err) {
    await db.query('ROLLBACK'); // Rollback transaction on error
    console.error('Error updating entertainment:', err);
    res.status(500).json({ error: 'Failed to update entertainment' });
  }
}
