import pool from '../../../db.js';
import { StatusCodes } from 'http-status-codes';

export default async function handledeletejob(req, res){
  const { deletejobid } = req.query;
  
  const deleteJobQuery = `
    DELETE FROM "Job"
    WHERE job_id = $1
    RETURNING *;
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(deleteJobQuery, [Number(deletejobid)]);
    client.release();

    if (result.rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Job not found' });
    }

    res.status(StatusCodes.OK).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while deleting job' });
  }
}
