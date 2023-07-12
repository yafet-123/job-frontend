import React from "react";
import { MainHeader } from '../../../components/common/MainHeader';
import { AllBlogs } from '../../../components/Blogs/AllBlogs';
import { prisma } from '../../../util/db.server.js'

export async function getServerSideProps(context){
  const {params,req,res,query} = context
  const category_id = query.category_id
  console.log(category_id)
  const blogscategories = await prisma.BlogsCategory.findMany({
    orderBy: {
      category_id:"asc"
    },
    include:{
      User:{
          select:{
              UserName:true
          }
      }
    }
  })

  const Allblogscategories = blogscategories.map((data)=>({
      category_id:data.category_id,
      CategoryName:data.CategoryName,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      userName:data.User.UserName
  }))

  const blogs = await prisma.Blogs.findMany({
    where:{
      BlogsCategoryRelationship:{
        some: {
          BlogsCategory:{
            category_id: Number(category_id)
          }
        }
      }   
    },
    orderBy : {
      ModifiedDate:'desc'
    },
    include:{
      User:{
        select:{
          UserName:true
        }
      },
      BlogsCategoryRelationship:{
        include:{
          BlogsCategory:{
            select:{
              category_id:true,
              CategoryName:true
            }
          }
        }
      },
    }
  });

  const allblogs = blogs.map((data)=>({
    blogs_id:data.blogs_id,
    Header:data.Header,
    image:data.Image,
    view : data.view,
    ShortDescription:data.ShortDescription,
    Description : data.Description,
    userName:data.User.UserName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate,
    Category:data.BlogsCategoryRelationship
  }))

  return{
    props:{
      categories:JSON.parse(JSON.stringify(Allblogscategories)),
      allblogs:JSON.parse(JSON.stringify(allblogs)),
    }
  }
}
 
export default function News({allblogs, categories}) {
  return (
    <React.Fragment>
      <MainHeader title="Hulu Media : Blogs" />
      <section className="w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] overflow-hidden px-0 lg:px-32">
        <div className="max-w-7xl mx-auto flex flex-col py-32 px-2 lg:!px-3">
          <AllBlogs allblogs={allblogs} categories={categories}/>
        </div>
      </section>
    </React.Fragment>
  );
}
