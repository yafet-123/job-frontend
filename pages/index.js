import { Hero } from "../components/Hero";
import { LatestJobs } from "../components/LatestJobs";
import { SearchJobs } from "../components/SearchJobs";

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

export default function Home({categories}) {
  return (
    <div className="">
      <Hero />
      <LatestJobs />
      <SearchJobs categories={categories} />
    </div>
  );
}
