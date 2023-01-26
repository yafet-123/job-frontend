import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async(req, res) => {
	const {updatelocationid} = req.query
	const {LocationName} = req.body
	const data = await prisma.Location.update({
		where:{location_id:Number(updatelocationid)},
		data:{
			LocationName
		},
	});
	res.json(data)
}