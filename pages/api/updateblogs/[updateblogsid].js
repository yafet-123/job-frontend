import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdatelocation(req, res){
	const {updateblogsid} = req.query
	const {Header ,ShortDescription ,Description ,user_id ,categoryId} = req.body
	const data = await prisma.Blogs.update({
		where:{blogs_id:Number(updateblogsid)},
		data:{
			Header,
			ShortDescription,
			Description 
		},
	});

	const deletecategorydata = await prisma.BlogsCategoryRelationship.deleteMany({
		where:{blogs_id:Number(updateblogsid)},
	});
	

	for (let j = 0; j < categoryId.length; j++) {
	  	const blogscategory = await prisma.BlogsCategoryRelationship.create({
		    data:{
		      user_id : Number(user_id),
		      category_id : Number(categoryId[j]),
		      blogs_id : Number(updateblogsid)
		    }
	  	})
	}

	res.json(data)
}