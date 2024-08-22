import db from '../../db.js'; // Import your PostgreSQL connection pool

export default async function handlehtmlbuttons(req, res) {
    const { searchName, type, Category } = req.body;
    console.log(Category);
    console.log(searchName);

    if (Category === 'javascript') {
        try {
            let query = '';
            let params = [];

            if (type === 1) {
                query = `
                    SELECT * FROM "JavascriptCourse"
                    WHERE "course_id" < $1
                    ORDER BY "course_id" ASC
                    LIMIT 1
                `;
                params = [Number(searchName)];
            } else if (type === 2) {
                query = `
                    SELECT * FROM "JavascriptCourse"
                    WHERE "course_id" > $1
                    ORDER BY "course_id" DESC
                    LIMIT 1
                `;
                params = [Number(searchName)];
            }

            const result = await db.query(query, params);
            const data = result;

            console.log(data);
            res.json(data);
        } catch (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Failed to retrieve data' });
        }
    }
}
