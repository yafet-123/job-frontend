import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db from '../../../db.js'; // Adjust the path to your PostgreSQL connection pool

export default async function handledeletenews(req, res){
	const { deletenewsid } = req.query;

	const deleteNewsQuery = `
		DELETE FROM "News"
		WHERE "news_id" = $1
		RETURNING *;
	`;

	try {
		const result = await db.query(deleteNewsQuery, [deletenewsid]);
		const deletedNews = result; // Assuming only one row is deleted

		if (deletedNews) {
			res.json({ message: 'News deleted successfully', deletedNews });
		} else {
			res.status(404).json({ error: 'News not found' });
		}
	} catch (err) {
		console.error('Error deleting news:', err);
		res.status(500).json({ error: 'Failed to delete news' });
	}
}
