import mysql from 'mysql2/promise';

const db = mysql.createPool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD
})

export default db;