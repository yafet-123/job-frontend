import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async(req, res) => {
    const { searchName, type } = JSON.Parse(req.body)
    if (type == 1) {
        const searchData = await prisma.User.findUnique({
            where: {
                id: Number(searchName),
            }
        })
    }

    res.json(searchData)
}