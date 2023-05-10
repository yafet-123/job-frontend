import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { prisma } from '../util/db.server.js'
import { MainHeader } from '../components/common/MainHeader';
import { DisplayIndvidualBlogs } from '../components/Blogs/DisplayIndvidualBlogs';
import { DisplayLatestBlogs } from '../components/Blogs/DisplayLatestBlogs';
import Head from 'next/head'

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
  const findCategory = []
  for(let i=0; i< blogsCategory.length;i++){
    findCategory.push(
      Number(blogsCategory[i].BlogsCategory?.category_id)
    )
  }

  const dataForCategoryBlogs = await prisma.BlogsCategoryRelationship.findMany({
    where:{
        BlogsCategory:{
          category_id:{
            in:findCategory
          }
        }
    },
    include:{
      User:{
        select:{
          UserName:true
        }
      },
      Blogs:true,
      BlogsCategory:true
    }
  });
  const AllcategoryBlogs = dataForCategoryBlogs.map((data)=>({
    Blogs:data.Blogs
  }))

  const uniqueallcategoryBlogs = [...new Map(AllcategoryBlogs.map(v => [v.Blogs.blogs_id,v])).values()]
  console.log(uniqueallcategoryBlogs)

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
    Category:data.BlogsCategoryRelationship
  }))

  return{
    props:{
      blogs:JSON.parse(JSON.stringify(onedata)),
      Alllatestblogs:JSON.parse(JSON.stringify(Alllatestblogs)),
      blogsCategory:JSON.parse(JSON.stringify(blogsCategory)),
      AllcategoryBlogs:JSON.parse(JSON.stringify(uniqueallcategoryBlogs))
    }
  }
}
 
export default function DisplayBlogs({blogs,Alllatestblogs, blogsCategory,AllcategoryBlogs}) {
  const router = useRouter()
  const shareUrl = router.asPath
  return (
    <React.Fragment>
      <Head>
        <title>Hulu Media : Display Blogs</title>
        <meta property="og:url" content={`https://job-frontend-main.vercel.app${router.asPath}`}/>
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="1233665570615472" />
        <meta name="description" content="HuluNeger is one the most online recruitment provider in ethiopia, 
          The website advertises jobs across a wide range of job types by different employers, 
          inlcuding private, local, international, who are hiring in ethiopia." 
        />
        <meta
          property="og:title"
          content="Hulu Media : Display Blogs"
        />
        <meta name="twitter:card" content={blogs.ShortDescription} />
        <meta
          property="og:description"
          content={blogs.ShortDescription}
        />
        <meta property="og:image" content={blogs.Image} />
        <meta property="og:image:secure_url" content={blogs.Image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="300" />
      </Head>
      <section className="flex flex-col lg:flex-row w-full h-full px-1 lg:px-80 bg-[#e6e6e6] dark:bg-[#02201D] pt-32">
        <DisplayIndvidualBlogs blogs={blogs} blogsCategory={blogsCategory} AllcategoryBlogs={AllcategoryBlogs} shareUrl={router.asPath} />
        <DisplayLatestBlogs Alllatestblogs={Alllatestblogs}/>          
      </section>
    </React.Fragment>
  );
}
