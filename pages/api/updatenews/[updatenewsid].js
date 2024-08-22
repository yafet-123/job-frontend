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

	try {
		await db.query('BEGIN'); // Start transaction

		// Update news data
		const result = await db.query(updateNewsQuery, [
			Header,
			ShortDescription,
			Description,
			updatenewsid
		]);
		const updatedNews = result;

		// Delete existing news category relationships
		await db.query(deleteNewsCategoryQuery, [updatenewsid]);

		// Insert new news category relationships
		for (let j = 0; j < categoryId.length; j++) {
			await db.query(createNewsCategoryQuery, [
				user_id,
				categoryId[j],
				updatenewsid
			]);
		}

		await db.query('COMMIT'); // Commit transaction

		res.json({ message: 'News updated successfully', updatedNews });
	} catch (err) {
		await db.query('ROLLBACK'); // Rollback transaction on error
		console.error('Error updating news:', err);
		res.status(500).json({ error: 'Failed to update news' });
	}
}
