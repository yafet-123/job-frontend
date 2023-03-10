import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdatelocation(req, res){
	const {updatenewsid} = req.query
	const {Header ,ShortDescription ,Description ,user_id ,categoryId} = req.body
	const data = await prisma.Location.update({
		where:{location_id:Number(updatenewsid)},
		data:{
			Header,
			ShortDescription,
			Description 
		},
	});

	const deletecategorydata = await prisma.NewsCategoryRelationship.deleteMany({
		where:{news_id:Number(updatenewsid)},
	});
	

	for (let j = 0; j < categoryId.length; j++) {
	  	const newscategory = await prisma.NewsCategoryRelationship.create({
		    data:{
		      user_id : Number(user_id),
		      category_id : Number(categoryId[j]),
		      news_id : Number(updatenewsid)
		    }
	  	})
	}

	res.json(data)
}