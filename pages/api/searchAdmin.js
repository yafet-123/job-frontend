import db from '../../db.js'; // Import your PostgreSQL connection pool

export default async function handlesearchadmin(req, res) {
    const { searchName, type } = req.body;
    console.log(req.body);

    try {
        let searchData;
        let query;

        if (type == 1) {
            // Search Users
            query = `
                SELECT user_id, "UserName", email, "CreatedDate", "ModifiedDate"
                FROM "User"
                WHERE "UserName" ILIKE $1;
            `;
            searchData = await db.query(query, [`%${searchName}%`]);

        } 
        else if (type == 2) {
            // Search Categories
            query = `
                SELECT c.category_id, c."CategoryName", c."CreatedDate", c."ModifiedDate", u."UserName" AS "userName"
                FROM "Category" c
                JOIN "User" u ON c.user_id = u.user_id
                WHERE c."CategoryName" ILIKE $1;
            `;
            searchData = await db.query(query, [`%${searchName}%`]);

        } 
        else if (type == 3) {
            // Search Jobs
            query = `
                SELECT j.job_id, j."CompanyName", j."JobsType", j."CareerLevel", j."EmploymentType", j."Salary", 
                       j."DeadLine", j."Apply", j."CreatedDate", j."ModifiedDate", u."UserName" AS "userName",
                       json_agg(json_build_object('category_id', jc.category_id, 'CategoryName', c."CategoryName")) AS categories
                FROM "Job" j
                JOIN "User" u ON j.user_id = u.user_id
                JOIN "JobCategory" jc ON j.job_id = jc.job_id
                JOIN "Category" c ON jc.category_id = c.category_id
                WHERE j."CompanyName" ILIKE $1
                GROUP BY j.job_id, u."UserName";
            `;
            searchData = await db.query(query, [`%${searchName}%`]);

        } 
        else if (type == 4) {
            // Search Locations
            query = `
                SELECT l.location_id, l."LocationName", l."Image", l."CreatedDate", l."ModifiedDate", u."UserName" AS "userName"
                FROM "Location" l
                JOIN "User" u ON l.user_id = u.user_id
                WHERE l."LocationName" ILIKE $1;
            `;
            searchData = await db.query(query, [`%${searchName}%`]);
        }

        if (searchData) {
            res.json(searchData);
        } else {
            res.status(400).json({ error: 'Invalid search type' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error executing search query' });
    }
}
