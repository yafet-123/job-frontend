import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdatecategory(req, res){
	const {updatecourseid} = req.query
	const {title , content, categoryId, user_id} = req.body
	const data = await prisma.Course.update({
		where:{course_id:Number(updatecourseid)},
		data:{
			title,
			content,
		},
	});

	const deletecategorydata = await prisma.CourseCategoryRelationship.deleteMany({
		where:{course_id:Number(updatecourseid)},
	});

	for (let j = 0; j < categoryId.length; j++) {
	  	const coursecategory = await prisma.CourseCategoryRelationship.create({
		    data:{
		      user_id : Number(user_id),
		      category_id : Number(categoryId[j]),
		      course_id : Number(updatecourseid)
		    }
	  	})
	}

	res.json(data)
}