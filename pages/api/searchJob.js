import { prisma } from '../../util/db.server.js'

export default async function handlesearchjob(req, res){
    const { searchName, type } = req.body
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
        let AllData =[]
        searchData !== null ? AllData = searchData.map((data)=>({
            user_id:data.user_id,
            UserName:data.UserName,
            CreatedDate:data.CreatedDate,
            ModifiedDate:data.ModifiedDate
        })) : AllData;
        res.json(AllData)
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

        const AllData = searchData.map((data)=>({
            category_id:data.category_id,
            CategoryName:data.CategoryName,
            CreatedDate:data.CreatedDate,
            ModifiedDate:data.ModifiedDate,
            userName:data.User.UserName
        }))

        res.json(AllData)
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

        const AllData = searchData.map((data)=>({
            job_id:data.job_id,
            CompanyName:data.CompanyName,
            JobsType:data.JobsType,
            CareerLevel:data.CareerLevel,
            EmploymentType:data.EmploymentType,
            Salary:data.Salary,
            DeadLine:data.DeadLine,
            Apply:data.Apply,
            CreatedDate:data.CreatedDate,
            ModifiedDate:data.ModifiedDate,
            userName:data.User.UserName,
            CategoryName:data.Category.CategoryName
        }))

        res.json(AllData)
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
}

