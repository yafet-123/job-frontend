import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db from '../../../db.js'; // Adjust the path to your PostgreSQL connection pool

export default async function handleupdatenews(req, res){
	const { updateblogsid } = req.query;
	const { Header, ShortDescription, Description, user_id, categoryId } = req.body;

	const updateblogsquery = `
		UPDATE "Blogs"
		SET "Header" = $1,
		    "ShortDescription" = $2,
		    "Description" = $3
		WHERE "blogs_id" = $4
		RETURNING *;
	`;

	const deleteblogsCategoryQuery = `
		DELETE FROM "BlogsCategoryRelationship"
		WHERE "blogs_id" = $1;
	`;

	const createblogsCategoryQuery = `
		INSERT INTO "BlogsCategoryRelationship" ("user_id", "category_id", "blogs_id")
		VALUES ($1, $2, $3);
	`;

	try {
		await db.query('BEGIN'); // Start transaction

		// Update news data
		const result = await db.query(updateblogsquery, [
			Header,
			ShortDescription,
			Description,
			updateblogsid
		]);
		const updatedNews = result;

		// Delete existing news category relationships
		await db.query(deleteblogsCategoryQuery, [updateblogsid]);

		// Insert new news category relationships
		for (let j = 0; j < categoryId.length; j++) {
			await db.query(createblogsCategoryQuery, [
				user_id,
				categoryId[j],
				updateblogsid
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


