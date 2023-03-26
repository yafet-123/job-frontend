import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { prisma } from '../util/db.server.js'
import { MainHeader } from '../components/MainHeader';
import { DisplayIndvidualBlogs } from '../components/Blogs/DisplayIndvidualBlogs';
import { DisplayLatestBlogs } from '../components/Blogs/DisplayLatestBlogs';

export async function getServerSideProps(context){
  const {params,req,res,query} = context
  const id = query.blogs_id

  const updateview = await prisma.Blogs.update({
    where:{blogs_id : Number(id),},
    data: { view: { increment: 1 }, },
  })
  
  const data = await prisma.Blogs.findUnique({
    where:{
      blogs_id: Number(id),
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
  
  const onedata = {
    blogs_id:data.blogs_id,
    Header:data.Header,
    Image:data.Image,
    ShortDescription:data.ShortDescription,
    Description:data.Description,
    userName:data.User.UserName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate,
  }

  const blogsCategory = data.BlogsCategoryRelationship

  const latestblogs = await prisma.Blogs.findMany({
    take:-6,
    orderBy: {
      blogs_id:"desc"
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

  const Alllatestblogs = latestblogs.map((data)=>({
    blogs_id:data.blogs_id,
    Header:data.Header,
    image:data.Image,
    ShortDescription:data.ShortDescription,
    userName:data.User.UserName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate,
    Category:data.NewsCategoryRelationship
  }))

  return{
    props:{
      blogs:JSON.parse(JSON.stringify(onedata)),
      Alllatestblogs:JSON.parse(JSON.stringify(Alllatestblogs)),
      blogsCategory:JSON.parse(JSON.stringify(blogsCategory)),
    }
  }
}

export default function DisplayNews({blogs,Alllatestblogs, blogsCategory}) {
  const router = useRouter()
  const shareUrl = router.asPath
  return (
    <React.Fragment>
      <MainHeader title="Display News" />
      <section className="flex flex-col lg:flex-row w-full h-full px-1 lg:px-44 bg-[#e6e6e6] dark:bg-[#02201D] pt-32">
        <DisplayIndvidualBlogs blogs={blogs} blogsCategory={blogsCategory} shareUrl={shareUrl} />
        <DisplayLatestBlogs Alllatestblogs={Alllatestblogs}/>          
      </section>
    </React.Fragment>
  );
}
