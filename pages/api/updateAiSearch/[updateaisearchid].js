import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdatecategory(req, res){
	const { 
		Header,
		description,
		like,
		link,
		service,
		categoryId,
		user_id
	} = req.body
	const {updateaisearchid} = req.query
	console.log(categoryId)
	let updateAiSearchCategory = []

	for (let j = 0; j < categoryId.length; j++) {
		updateAiSearchCategory.push({
			user_id : Number(user_id),
			category_id : Number(categoryId[j]),
		})
	}
	const data = await prisma.Detail.update({
		where:{detail_id:Number(updateaisearchid)},
		data:{
			Header,
			description,
			like,
			link,
			service,
			DetailCategory: {
				upsert:categoryId.map(value=>({
					where:{category_id:value},
					create:{
						category_id:value,
						user_id,
						detail_id:updateaisearchid
					},
					update:{},
				}))
			}
		},
	});
	res.json(data)
}