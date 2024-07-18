import pool from '../../db.js'; // Adjust the path to your PostgreSQL connection pool
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleaddblogs(req, res) {
  const { 
    Header,
    Image,
    ShortDescription,
    Description,
    user_id,
    categoryId
  } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const insertBlogQuery = `
      INSERT INTO "Blogs" ("Header", "Image", "ShortDescription", "Description", user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING blogs_id;
    `;

    const insertBlogValues = [Header, Image, ShortDescription, Description, Number(user_id)];
    const blogResult = await client.query(insertBlogQuery, insertBlogValues);
    const blogId = blogResult.rows[0].blogs_id;

    const insertBlogCategoryQuery = `
      INSERT INTO "BlogsCategoryRelationship" (user_id, category_id, blogs_id)
      VALUES ($1, $2, $3);
    `;

    for (let j = 0; j < categoryId.length; j++) {
      const insertBlogCategoryValues = [Number(user_id), Number(categoryId[j]), blogId];
      await client.query(insertBlogCategoryQuery, insertBlogCategoryValues);
    }

    await client.query('COMMIT');

    const blogdata = {
      blogs_id: blogId,
      Header,
      Image,
      ShortDescription,
      Description,
      user_id: Number(user_id),
      categoryId: categoryId.map(catId => ({
        user_id: Number(user_id),
        category_id: Number(catId),
      }))
    };

    res.json(blogdata);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error adding blog:', err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to add blog' });
  } finally {
    client.release();
  }
}
