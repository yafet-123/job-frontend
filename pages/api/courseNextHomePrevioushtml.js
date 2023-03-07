import { prisma } from '../../util/db.server.js'

export default async function handlecoursebuttons(req, res){
    const { searchName, type } = req.body
    console.log(type)
    if(type == 1){
        console.log("Name")
        const prev = await prisma.HTMLCourse.findFirst({
            take:1,
            where: {
                course_id: {
                    lt: Number(searchName),
                },
            }
        });
        const onedata = {
            course_id : prev.course_id,
            CreatedDate:prev.CreatedDate,
            ModifiedDate:prev.ModifiedDate
        }
        res.json(onedata)

    } else if(type == 2){
        console.log(searchName)
        const next = await prisma.HTMLCourse.findFirst({
            where: {
                course_id: {
                    gt: Number(searchName),
                },
            }
        });

        const onedata = {
            course_id : next.course_id,
            CreatedDate:next.CreatedDate,
            ModifiedDate:next.ModifiedDate
        }
        res.json(next)
    } 


}