import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db from '../../db.js'; // Adjust the path to your PostgreSQL connection pool

export default async function handleaddnews(req, res){
	const { 
		Header,
		Image,
		ShortDescription,
		Description,
		user_id,
		categoryId
	} = req.body;

	const createNewsQuery = `
		INSERT INTO "News" ("Header", "Image", "ShortDescription", "Description", "user_id")
		VALUES ($1, $2, $3, $4, $5)
		RETURNING news_id;
	`;

	const createNewsCategoryRelationshipQuery = `
		INSERT INTO "NewsCategoryRelationship" ("news_id", "user_id", "category_id")
		VALUES ($1, $2, $3);
	`;

	try {
		await db.query('BEGIN'); // Start transaction

		// Insert into News table
		const newsResult = await db.query(createNewsQuery, [
			Header,
			Image,
			ShortDescription,
			Description,
			user_id
		]);

		const newsId = newsResult.news_id;

		// Insert into NewsCategoryRelationship table
		for (let j = 0; j < categoryId.length; j++) {
			await db.query(createNewsCategoryRelationshipQuery, [
				newsId,
				user_id,
				categoryId[j]
			]);
		}

		await db.query('COMMIT'); // Commit transaction

		res.json({ message: 'News added successfully' });
	} catch (err) {
		await db.query('ROLLBACK'); // Rollback transaction on error
		console.error('Error adding news:', err);
		res.status(500).json({ error: 'Failed to add news' });
	}
}
