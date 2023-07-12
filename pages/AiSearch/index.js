import React from "react";
import { MainHeader } from '../../components/common/MainHeader';
import { Hero } from '../../components/AiSearch/Hero';
import { SearchBar } from '../../components/AiSearch/SearchBar';
import { Category } from '../../components/AiSearch/Category';
import { prisma } from '../../util/db.server.js'

export async function getServerSideProps(){
  const categorys = await prisma.AiCategory.findMany({
      orderBy: {
          CategoryName: 'asc',
      },
  });
  const formatedCategory = categorys.map((category)=>({
      category_id:category.category_id,
      CategoryName:category.CategoryName
  }))
  return { 
    props: {
        categorys:formatedCategory,
    } 
  }
}
export default function AiSearch({categorys}) {
  return (
    <React.Fragment>
      <MainHeader title="Hulu Media : AiSearch" />
      <section className="w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-32">
        <Hero 
          title="Search AI Tools" 
          subtitle="Search AI tools for whatever your needs. Simply type in a function like 'music' or 'image editing'. We aim to build the most complete list of AI tools on the market. Stay tuned for more features!" 
        />
        <SearchBar />
        <Category categorys={categorys} />
      </section>
    </React.Fragment>
  );
}
