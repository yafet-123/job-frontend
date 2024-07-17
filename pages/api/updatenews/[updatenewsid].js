import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import pool from '../../../db.js'; // Adjust the path to your PostgreSQL connection pool

export default async function handleupdatenews(req, res){
	const { updatenewsid } = req.query;
	const { Header, ShortDescription, Description, user_id, categoryId } = req.body;

	const updateNewsQuery = `
		UPDATE "News"
		SET "Header" = $1,
		    "ShortDescription" = $2,
		    "Description" = $3
		WHERE "news_id" = $4
		RETURNING *;
	`;

	const deleteNewsCategoryQuery = `
		DELETE FROM "NewsCategoryRelationship"
		WHERE "news_id" = $1;
	`;

	const createNewsCategoryQuery = `
		INSERT INTO "NewsCategoryRelationship" ("user_id", "category_id", "news_id")
		VALUES ($1, $2, $3);
	`;

	const client = await pool.connect();

	try {
		await client.query('BEGIN'); // Start transaction

		// Update news data
		const result = await client.query(updateNewsQuery, [
			Header,
			ShortDescription,
			Description,
			updatenewsid
		]);
		const updatedNews = result.rows[0];

		// Delete existing news category relationships
		await client.query(deleteNewsCategoryQuery, [updatenewsid]);

		// Insert new news category relationships
		for (let j = 0; j < categoryId.length; j++) {
			await client.query(createNewsCategoryQuery, [
				user_id,
				categoryId[j],
				updatenewsid
			]);
		}

		await client.query('COMMIT'); // Commit transaction

		res.json({ message: 'News updated successfully', updatedNews });
	} catch (err) {
		await client.query('ROLLBACK'); // Rollback transaction on error
		console.error('Error updating news:', err);
		res.status(500).json({ error: 'Failed to update news' });
	} finally {
		client.release(); // Release client back to the pool
	}
}
