import { prisma } from '../../util/db.server.js'

export default async function handlehtmlbuttons(req, res){
    const { searchName, type, Category } = req.body
    console.log(Category)
    console.log(searchName)
    if(Category == 'javascript'){
        if(type == 1){
            const prev = await prisma.JavascriptCourse.findMany({
                take: 1,
                where: {
                    course_id: {
                        lt: Number(searchName),
                    },
                },
                orderBy: {
                    course_id: "asc",
                },
            });
            console.log(prev)
            res.json(prev)


        } else if(type == 2){
            const next = await prisma.JavascriptCourse.findMany({
                take: 1,
                where: {
                    course_id: {
                        gt: Number(searchName),
                    },
                },
                orderBy: {
                    course_id: "desc",
                },  
            });
            console.log(next)
            res.json(next)
        } 
    }


}