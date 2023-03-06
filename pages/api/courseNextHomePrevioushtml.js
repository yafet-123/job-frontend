import { prisma } from '../../util/db.server.js'

export default async function handlecoursebuttons(req, res){
    const { searchName, type } = req.body
    console.log(req.body)
    if(type == 1){
        const prev = await prisma.HTMLCourse.findMany({
            take: 1,
            where: {
                course_id: {
                    lt: Number(searchName),
                },
            }
        });

        res.json(prev)
    } else if(type == 2){
        const next = await prisma.HTMLCourse.findMany({
            take: 1,
            where: {
                course_id: {
                    gt: Number(searchName),
                },
            }
        });

        res.json(next)
    } 


}