import { prisma } from '../../util/db.server.js'
 
export default async function handlesearchclientjob(req, res){
    const { searchName } = req.body
    const searchData = await prisma.Job.findMany({
        where: {
            OR:[
                {
                    JobsType: {
                        contains: searchName,
                        mode: "insensitive",
                    },
                },
                {
                    CareerLevel: {
                        contains: searchName,
                        mode: "insensitive",
                    },
                },
                {
                    CompanyName: {
                        contains: searchName,
                        mode: "insensitive",
                    },
                },
                {
                    EmploymentType: {
                        contains: searchName,
                        mode: "insensitive",
                    },
                },
            ]
        },
        include:{
            User:{
                select:{
                    UserName:true
                }
            }
        }
    })

    const AllData = searchData.map((data)=>({
        job_id:data.job_id,
        CompanyName:data.CompanyName,
        JobsType:data.JobsType,
        CareerLevel:data.CareerLevel,
        EmploymentType:data.EmploymentType,
        Salary:data.Salary,
        DeadLine:data.DeadLine,
        Apply:data.Apply,
        view:data.view,
        JobsDescreption:data.JobsDescreption,
    	JobsRequirement:data.JobsRequirement,
        CreatedDate:data.CreatedDate,
        ModifiedDate:data.ModifiedDate,
        userName:data.User.UserName
    }))

    res.json(AllData)

}