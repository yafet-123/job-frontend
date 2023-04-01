import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeleteaiSearch(req, res){
	const {deleteaisearchid} = req.query
	console.log(req.query)
	const data = await prisma.Detail.delete({
		where:{detail_id:Number(deleteaisearchid)},
	});
	res.json(data)
}