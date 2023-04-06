import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdatejob(req, res){
	const {updatejobid} = req.query
	const { 
		CompanyName,
		Image,
		JobsName,
		CareerLevel,
		Salary,
		Descreption,
		shortDescreption,
		DeadLine,
		categoryId,
		LocationId,
		user_id
	} = req.body

	console.log(categoryId)

	const data = await prisma.Job.update({
		where:{job_id:Number(updatejobid)},
		data:{
			CompanyName,
			Image,
			JobsName,
			CareerLevel,
			Salary,
			Descreption,
			shortDescreption,
			DeadLine,
			user_id:Number(user_id),
		}
	});

	const deletecategorydata = await prisma.JobCategory.deleteMany({
		where:{job_id:Number(updatejobid)},
	});
	
	const deletelocationdata = await prisma.JobLocation.deleteMany({
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

	for (let j = 0; j < LocationId.length; j++) {
	  	const locationcategory = await prisma.JobLocation.create({
		    data:{
		      user_id : Number(user_id),
		      location_id : Number(LocationId[j]),
		      job_id : Number(updatejobid)
		    }
	  	})
	}



	res.json(data)
}