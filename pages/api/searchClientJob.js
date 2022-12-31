import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async(req, res) => {
    const { searchName, type } = req.body
    console.log(req.body)
    if (type == 1) {
        const searchData = await prisma.Job.findMany({
            where: {
                JobsType: {
                    contains: searchName,
                    mode: "insensitive",
                },
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
            JobsDescreption:data.JobsDescreption,
    		JobsRequirement:data.JobsRequirement,
            CreatedDate:data.CreatedDate,
            ModifiedDate:data.ModifiedDate,
            userName:data.User.UserName
        }))

        res.json(AllData)

    } else if(type == 2){
        const searchData = await prisma.Job.findMany({
            where: {
                CareerLevel: {
                    contains: searchName,
                    mode: "insensitive",
                },
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
            JobsDescreption:data.JobsDescreption,
    		JobsRequirement:data.JobsRequirement,
            CreatedDate:data.CreatedDate,
            ModifiedDate:data.ModifiedDate,
            userName:data.User.UserName
        }))

        res.json(AllData)
    } else if(type == 3){
        const searchData = await prisma.Job.findMany({
            where: {
                CompanyName: {
                    contains: searchName,
                    mode: "insensitive",
                },
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
            JobsDescreption:data.JobsDescreption,
    		JobsRequirement:data.JobsRequirement,
            CreatedDate:data.CreatedDate,
            ModifiedDate:data.ModifiedDate,
            userName:data.User.UserName
        }))

        res.json(AllData)
    } else if (type == 4){
        const searchData = await prisma.Location.findMany({
            where: {
                LocationName: {
                    contains: searchName,
                    mode: "insensitive",
                },
            },
            include:{
                User:{
                    select:{
                        UserName:true
                    }
                },
            }
        })

        const AllData = searchData.map((data)=>({
            location_id:data.location_id,
            LocationName:data.LocationName,
            Image:data.Image,
            CreatedDate:data.CreatedDate,
            ModifiedDate:data.ModifiedDate,
            userName:data.User.UserName,
        }))

        res.json(AllData)
    }


}