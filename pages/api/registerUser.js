import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async(req, res) => {
	const {UserName , Password, email} = req.body;
	const data = await prisma.User.create({
		data:{
			UserName,
			email,
			Password:bcrypt.hashSync(Password, 8)	
		},
	});
	
}