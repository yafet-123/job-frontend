import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdateentertainment(req, res){
	const {updateentertainmentid} = req.query
	const { 
		Header
		link
		categoryId,
	} = req.body

	console.log(categoryId)

	const data = await prisma.Job.update({
		where:{job_id:Number(updatejobid)},
		data:{
			CompanyName,
			Image,
			JobsType,
			location_id:Number(LocationId),
			CareerLevel,
			EmploymentType,
			Salary,
			JobsDescreption,
			JobsRequirement,
			DeadLine,
			Apply,
		}
	});

	const deletecategorydata = await prisma.JobCategory.deleteMany({
		where:{job_id:Number(updatejobid)},
	});
	

	for (let j = 0; j < categoryId.length; j++) {
	  	const jobcategory = await prisma.JobCategory.create({
		    data:{
		      user_id : Number(user_id),
		      category_id : Number(categoryId[j]),
		      job_id : Number(updatejobid)
		    }
	  	})
	}



	res.json(data)
}