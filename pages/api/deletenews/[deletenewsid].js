import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import pool from '../../../db.js'; // Adjust the path to your PostgreSQL connection pool

export default async function handledeletenews(req, res){
	const { deletenewsid } = req.query;

	const deleteNewsQuery = `
		DELETE FROM "News"
		WHERE "news_id" = $1
		RETURNING *;
	`;

	const client = await pool.connect();

	try {
		const result = await client.query(deleteNewsQuery, [deletenewsid]);
		const deletedNews = result.rows[0]; // Assuming only one row is deleted

		if (deletedNews) {
			res.json({ message: 'News deleted successfully', deletedNews });
		} else {
			res.status(404).json({ error: 'News not found' });
		}
	} catch (err) {
		console.error('Error deleting news:', err);
		res.status(500).json({ error: 'Failed to delete news' });
	} finally {
		client.release(); // Release client back to the pool
	}
}
