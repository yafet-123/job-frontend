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
    INSERT INTO "Job" ("CompanyName", "Image", "JobsName", "CareerLevel", "Salary", 
                      "Descreption", "shortDescreption", "DeadLine", "user_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING "job_id";
  `;

  const createJobCategoryQuery = `
    INSERT INTO "JobCategory" ("user_id", "category_id", "job_id")
    VALUES ($1, $2, $3);
  `;

  const createJobLocationQuery = `
    INSERT INTO "JobLocation" ("user_id", "location_id", "job_id")
    VALUES ($1, $2, $3);
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

    const job_id = jobInsertResult.job_id;

    // Insert job categories
    for (let j = 0; j < categoryId.length; j++) {
      await db.query(createJobCategoryQuery, [
        user_id,
        categoryId[j],
        job_id
      ]);
    }

    // Insert job locations
    for (let i = 0; i < LocationId.length; i++) {
      await db.query(createJobLocationQuery, [
        user_id,
        LocationId[i],
        job_id
      ]);
    }

    await db.query('COMMIT'); // Commit transaction

    res.json({ message: 'Job added successfully' });
  } catch (err) {
    await db.query('ROLLBACK'); // Rollback transaction on error
    console.error('Error adding job:', err);
    res.status(500).json({ error: 'Failed to add job' });
  }
}
