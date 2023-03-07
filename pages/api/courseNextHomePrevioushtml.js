import { prisma } from '../../util/db.server.js'

export default async function handlecoursebuttons(req, res){
    const { searchName, type } = req.body
    console.log(req.body)
    if(type == 1){
        console.log("iop")
        const prev = await prisma.HTMLCourse.findMany({
            where: {
                course_id: {
                    lt: Number(searchName),
                },
            }
        });

        const AllData = prev.map((data)=>({
            course_id:data.course_id,
            CreatedDate:data.CreatedDate,
            ModifiedDate:data.ModifiedDate
        }))

        res.json(AllData)

    } else if(type == 2){
        console.log("kxjc")
        const next = await prisma.HTMLCourse.findMany({
            where: {
                course_id: {
                    gt: Number(searchName),
                },
            }
        });

        const AllData = next.map((data)=>({
            course_id:data.course_id,
            CreatedDate:data.CreatedDate,
            ModifiedDate:data.ModifiedDate
        }))
        res.json(AllData)
    } 


}