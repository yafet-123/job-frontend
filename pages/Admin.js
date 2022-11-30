import { Hero } from "../components/Hero";
import { VerticalNavbar } from "../components/Admin/VerticalNavbar";


import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getStaticProps(){
  const categories = await prisma.Category.findMany();
  return{
    props:{
      categories:JSON.parse(JSON.stringify(categories))
    }
  }
}

export default function Admin({categories}) {
  return (
    <div className="flex bg-gray-700">
      <VerticalNavbar />
      <div className="flex-1">

      </div>
    </div>
  );
}
