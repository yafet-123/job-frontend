import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db from '../../../db.js';

export default async function handleupdatejob(req, res) {
  const { updatejobid } = req.query;
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

  const updateJobQuery = `
    UPDATE "Job"
    SET "CompanyName" = $1,
        "Image" = $2,
        "JobsName" = $3,
        "CareerLevel" = $4,
        "Salary" = $5,
        "Descreption" = $6,
        "shortDescreption" = $7,
        "DeadLine" = $8,
        "user_id" = $9
    WHERE "job_id" = $10;
  `;

  const deleteJobCategoryQuery = `
    DELETE FROM "JobCategory"
    WHERE "job_id" = $1;
  `;

  const deleteJobLocationQuery = `
    DELETE FROM "JobLocation"
    WHERE "job_id" = $1;
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

    // Update job data
    await db.query(updateJobQuery, [
      CompanyName,
      Image,
      JobsName,
      CareerLevel,
      Salary,
      Descreption,
      shortDescreption,
      DeadLine,
      user_id,
      updatejobid // this should be the last parameter
    ]);

    // Delete existing job categories
    await db.query(deleteJobCategoryQuery, [updatejobid]);

    // Delete existing job locations
    await db.query(deleteJobLocationQuery, [updatejobid]);

    // Insert new job categories
    for (let j = 0; j < categoryId.length; j++) {
      await db.query(createJobCategoryQuery, [
        user_id,
        categoryId[j],
        updatejobid
      ]);
    }

    // Insert new job locations
    for (let j = 0; j < LocationId.length; j++) {
      await db.query(createJobLocationQuery, [
        user_id,
        LocationId[j],
        updatejobid
      ]);
    }

    await db.query('COMMIT'); // Commit transaction

    res.json({ message: 'Job updated successfully' });
  } catch (err) {
    await db.query('ROLLBACK'); // Rollback transaction on error
    console.error('Error updating job:', err);
    res.status(500).json({ error: 'Failed to update job' });
  }
}
