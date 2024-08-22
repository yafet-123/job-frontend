import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db from '../../db.js'; // Adjust the path to your PostgreSQL connection pool

export default async function handleaddentertainment(req, res) {
  const { 
    Header,
    Image,
    categoryId,
    ShortDescription,
    Description,
    user_id,
  } = req.body;

  console.log(req.body);

  const createEntertainmentQuery = `
    INSERT INTO "Entertainment" ("Header", "Image", "ShortDescription", "Description", "user_id")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const createEntertainmentCategoryQuery = `
    INSERT INTO "EntertainmentCategoryRelationship" ("user_id", "category_id", "entertainment_id")
    VALUES ($1, $2, $3);
  `;

  try {
    await db.query('BEGIN'); // Start transaction

    // Insert entertainment data
    const result = await db.query(createEntertainmentQuery, [
      Header,
      Image,
      ShortDescription,
      Description,
      Number(user_id)
    ]);

    const entertainment = result;

    // Insert entertainment category relationships
    for (let j = 0; j < categoryId.length; j++) {
      await db.query(createEntertainmentCategoryQuery, [
        Number(user_id),
        Number(categoryId[j]),
        entertainment.entertainment_id
      ]);
    }

    await db.query('COMMIT'); // Commit transaction

    res.json(entertainment);
  } catch (err) {
    await db.query('ROLLBACK'); // Rollback transaction on error
    console.error('Error adding entertainment:', err);
    res.status(500).json({ error: 'Failed to add entertainment' });
  }
}
