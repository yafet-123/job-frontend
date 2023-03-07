import { prisma } from '../../util/db.server.js'

export default async function handlecoursebuttons(req, res){
    const { searchName, type } = req.body
    console.log(req.body)
    if(type == 1){
        console.log("Name")
        const prev = await prisma.HTMLCourse.findMany({
            take:1,
            where: {
                course_id: {
                    lt: Number(searchName),
                },
            }
        });
        console.log(prev)
        res.json(prev)

    } else if(type == 2){
        console.log("searchName")
        const next = await prisma.HTMLCourse.findMany({
            where: {
                course_id: {
                    gt: Number(searchName),
                },
            }
        });
        console.log(next)
        res.json(next)
    } 


}