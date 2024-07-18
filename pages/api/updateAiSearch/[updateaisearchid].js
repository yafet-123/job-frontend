import pool from '../../../db.js'; // Adjust the path to your PostgreSQL connection pool
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdatecategory(req, res) {
  const {
    Header,
    description,
    like,
    link,
    service,
    categoryId,
    user_id
  } = req.body;

  const { updateaisearchid } = req.query;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Update "Detail" table
    const updateDetailQuery = `
      UPDATE "Detail"
      SET "Header" = $1, "description" = $2, "like" = $3, "link" = $4, "service" = $5
      WHERE detail_id = $6;
    `;
    const updateDetailValues = [Header, description, like, link, service, Number(updateaisearchid)];
    await client.query(updateDetailQuery, updateDetailValues);

    // Delete existing relationships in "DetailCategory" table
    const deleteDetailCategoryQuery = `
      DELETE FROM "DetailCategory"
      WHERE detail_id = $1;
    `;
    await client.query(deleteDetailCategoryQuery, [Number(updateaisearchid)]);

    // Insert new relationships into "DetailCategory" table
    const insertDetailCategoryQuery = `
      INSERT INTO "DetailCategory" (category_id, user_id, detail_id)
      VALUES ($1, $2, $3);
    `;
    for (let j = 0; j < categoryId.length; j++) {
      const insertDetailCategoryValues = [Number(categoryId[j]), Number(user_id), Number(updateaisearchid)];
      await client.query(insertDetailCategoryQuery, insertDetailCategoryValues);
    }

    await client.query('COMMIT');

    const updatedData = {
      detail_id: Number(updateaisearchid),
      Header,
      description,
      like,
      link,
      service,
      categoryId: categoryId.map(catId => ({
        category_id: Number(catId),
        user_id: Number(user_id),
        detail_id: Number(updateaisearchid)
      }))
    };

    res.json(updatedData);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error updating AI search data:', err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update AI search data' });
  } finally {
    client.release();
  }
}
