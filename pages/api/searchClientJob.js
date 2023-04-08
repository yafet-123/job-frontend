import { prisma } from '../../util/db.server.js'
 
export default async function handlesearchclientjob(req, res){
    const { searchName } = req.body
    const searchData = await prisma.Job.findMany({
        where: {
            OR:[
                {
                    JobsName: {
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
                    Salary: {
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
            },
            JobLocation:{
                include:{
                  Location:{
                    select:{
                      location_id:true,
                      LocationName:true
                    }
                  }
                }
            },
            JobCategory:{
                include:{
                    Category:{
                        select:{
                            category_id:true,
                            CategoryName:true
                        }
                    }
                }
            },
        }
    })

    const AllData = searchData.map((data)=>({
        job_id:data.job_id,
        CompanyName:data.CompanyName,
        image:data.Image,
        JobsName:data.JobsName,
        CareerLevel:data.CareerLevel,
        Salary:data.Salary,
        Descreption:data.Descreption,
        shortDescreption:data.shortDescreption,
        DeadLine:data.DeadLine,
        Apply:data.Apply,
        view:data.view,
        userName:data.User.UserName,
        CreatedDate:data.CreatedDate,
        ModifiedDate:data.ModifiedDate,
        categories:data.JobCategory,
        Location:data.JobLocation,
    }))

    res.json(AllData)

}