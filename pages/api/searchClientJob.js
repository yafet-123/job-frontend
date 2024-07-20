import pool from '../../db.js';

export default async function handlesearchclientjob(req, res) {
    const { searchName } = req.body;

    const searchQuery = `
        SELECT j.job_id, j."CompanyName", j."Image", j."JobsName", j."CareerLevel", j."Salary", 
               j."Descreption", j."shortDescreption", j."DeadLine", j."view", 
               j."CreatedDate", j."ModifiedDate",
               u."UserName",
               json_agg(
                   json_build_object(
                       'category_id', c.category_id,
                       'CategoryName', c."CategoryName"
                   )
               ) AS "categories",
               json_agg(
                   json_build_object(
                       'location_id', l.location_id,
                       'LocationName', l."LocationName"
                   )
               ) AS "JobLocation"
        FROM "Job" j
        LEFT JOIN "User" u ON j.user_id = u.user_id
        LEFT JOIN "JobCategory" jc ON j.job_id = jc.job_id
        LEFT JOIN "Category" c ON jc.category_id = c.category_id
        LEFT JOIN "JobLocation" jl ON j.job_id = jl.job_id
        LEFT JOIN "Location" l ON jl.location_id = l.location_id
        WHERE j."JobsName" ILIKE $1
           OR j."CareerLevel" ILIKE $1
           OR j."CompanyName" ILIKE $1
           OR j."Salary" ILIKE $1
        GROUP BY j.job_id, u."UserName"
    `;

    try {
        const client = await pool.connect();
        const searchValues = [`%${searchName}%`];
        const searchResult = await client.query(searchQuery, searchValues);
        const searchData = searchResult.rows;

        const AllData = searchData.map((data) => ({
            job_id: data.job_id,
            CompanyName: data.CompanyName,
            image: data.Image,
            JobsName: data.JobsName,
            CareerLevel: data.CareerLevel,
            Salary: data.Salary,
            Descreption: data.Descreption,
            shortDescreption: data.shortDescreption,
            DeadLine: data.DeadLine,
            Apply: data.Apply,
            view: data.view,
            userName: data.UserName,
            CreatedDate: data.CreatedDate,
            ModifiedDate: data.ModifiedDate,
            categories: data.categories,
            JobLocation: data.JobLocation,
        }));
        console.log(AllData)
        client.release();
        res.json(AllData);
    } catch (err) {
        console.error('Database Query Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
