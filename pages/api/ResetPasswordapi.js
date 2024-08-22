import bcrypt from "bcryptjs";
import db from '../../db.js'; // Import your PostgreSQL connection pool

export default async function handlesearchadmin(req, res) {
    const { password, token } = req.body;

    try {
        const queryUser = `
            SELECT * FROM "User" WHERE "resetToken" = $1
        `;
        const userResult = await db.query(queryUser, [token]);
        const user = userResult;

        if (!user) {
            return res.json({ status: "Invalid or expired reset token." });
        }

        const hashedPassword = bcrypt.hashSync(password, 8);

        const updatePasswordQuery = `
            UPDATE "User"
            SET "Password" = $1
            WHERE "resetToken" = $2
            RETURNING *;
        `;
        await db.query(updatePasswordQuery, [hashedPassword, token]);

        return res.json({ status: "Password Reset Success" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "Error resetting password." });
    }
}
