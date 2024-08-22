import db from '../../db.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleaddjob(req, res) {
  const {
    CompanyName,
    Image,
    JobsName,
    CareerLevel,
    Salary,
    Descreption,
    shortDescreption,
    DeadLine,
    categoryId,
    LocationId,
    user_id
  } = req.body;

  const createJobQuery = `
    INSERT INTO Job (CompanyName, Image, JobsName, CareerLevel, Salary, 
                      Descreption, shortDescreption, DeadLine, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const createJobCategoryQuery = `
    INSERT INTO JobCategory (user_id, category_id, job_id)
    VALUES (?, ?, ?);
  `;

  const createJobLocationQuery = `
    INSERT INTO JobLocation (user_id,location_id, job_id)
    VALUES (?, ?, ?);
  `;

  try {
    await db.query('BEGIN'); // Start transaction

    // Insert job data
    const jobInsertResult = await db.query(createJobQuery, [
      CompanyName,
      Image,
      JobsName,
      CareerLevel,
      Salary,
      Descreption,
      shortDescreption,
      DeadLine,
      user_id
    ]);
    console.log(jobInsertResult)
    const job_id = jobInsertResult[0].job_id;

    console.log(jobInsertResult)
    await db.query('COMMIT'); // Commit transaction

    res.json({ message: 'Job added successfully' });
  } catch (err) {
    await db.query('ROLLBACK'); // Rollback transaction on error
    console.error('Error adding job:', err);
    res.status(500).json({ error: 'Failed to add job' });
  }
}
