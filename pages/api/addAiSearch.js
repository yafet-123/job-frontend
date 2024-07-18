import pool from '../../db.js'; // Adjust the path to your PostgreSQL connection pool
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleaddblogs(req, res) {
  const { 
    Header,
    description,
    like,
    link,
    service,
    categoryId,
    user_id
  } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Insert into "Detail" table
    const insertDetailQuery = `
      INSERT INTO "Detail" ("Header", "description", "like", "link", "service", user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING detail_id;
    `;
    const insertDetailValues = [Header, description, like, link, service, Number(user_id)];
    const detailResult = await client.query(insertDetailQuery, insertDetailValues);
    const detailId = detailResult.rows[0].detail_id;

    // Insert into "DetailCategory" table
    const insertDetailCategoryQuery = `
      INSERT INTO "DetailCategory" (user_id, category_id, detail_id)
      VALUES ($1, $2, $3);
    `;
    for (let j = 0; j < categoryId.length; j++) {
      const insertDetailCategoryValues = [Number(user_id), Number(categoryId[j]), detailId];
      await client.query(insertDetailCategoryQuery, insertDetailCategoryValues);
    }

    await client.query('COMMIT');

    const aisearchdata = {
      detail_id: detailId,
      Header,
      description,
      like,
      link,
      service,
      user_id: Number(user_id),
      categoryId: categoryId.map(catId => ({
        user_id: Number(user_id),
        category_id: Number(catId),
      }))
    };

    res.json(aisearchdata);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error adding AI search data:', err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to add AI search data' });
  } finally {
    client.release();
  }
}
