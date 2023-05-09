import React, {useState,useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { prisma } from '../util/db.server.js'
import { DisplayIndvidualentertainment } from '../components/Entertemiment/DisplayIndvidualentertainment';
import { DisplayLatestentertainment } from '../components/Entertemiment/DisplayLatestentertainment';
import Head from 'next/head';

export async function getServerSideProps(context){
  	const {params,req,res,query} = context
  	const id = query.entertainment_id

  	const updateview = await prisma.Entertainment.update({
    	where:{entertainment_id : Number(id),},
    	data: { view: { increment: 1 }, },
  	})
  
	const data = await prisma.Entertainment.findUnique({
		where:{
			entertainment_id: Number(id),
		},
		include:{
	      	User:{
	        	select:{
	          		UserName:true
	        	}
	      	},
	      	EntertainmentCategoryRelationship:{
	        	include:{
	          		EntertainmentCategory:{
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
	    entertainment_id:data.entertainment_id,
	    Header:data.Header,
	    image:data.Image,
	    ShortDescription:data.ShortDescription,
	    Description:data.Description,
	    userName:data.User.UserName,
	    CreatedDate:data.CreatedDate,
	    ModifiedDate:data.ModifiedDate,
  	}

  const etCategory = data.EntertainmentCategoryRelationship
  const findCategory = []
  for(let i=0; i< etCategory.length;i++){
    findCategory.push(
      Number(etCategory[i].EntertainmentCategory?.category_id)
    )
  }

  const dataForCategoryet = await prisma.EntertainmentCategoryRelationship.findMany({
    where:{
        EntertainmentCategory:{
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
      Entertainment:true,
      EntertainmentCategory:true
    }
  });

  const Allcategoryet = dataForCategoryet.map((data)=>({
    Entertainment:data.Entertainment
  }))

  const latestet = await prisma.Entertainment.findMany({
  	take:-6,
    orderBy: {
      entertainment_id:"desc"
    },
    include:{
      User:{
        select:{
          UserName:true
        }
      },
      EntertainmentCategoryRelationship:{
        include:{
          EntertainmentCategory:{
            select:{
              category_id:true,
              CategoryName:true
            }
          }
        }
      },
    }
  });

  const Alllatestentertainment = latestet.map((data)=>({
    entertainment_id:data.entertainment_id,
    Header:data.Header,
    image:data.Image,
    ShortDescription:data.ShortDescription,
    userName:data.User.UserName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate,
    Category:data.EntertainmentCategoryRelationship
  }))
  const uniqueallcategoryet = [...new Map(Allcategoryet.map(v => [v.Entertainment.entertainment_id,v])).values()]

  return{
    props:{
      entertainment:JSON.parse(JSON.stringify(onedata)),
      Alllatestentertainment:JSON.parse(JSON.stringify(Alllatestentertainment)),
      entertainmentCategory:JSON.parse(JSON.stringify(etCategory)),
      Allcategoryet:JSON.parse(JSON.stringify(uniqueallcategoryet))
    }
  }
}

export default function DisplayEntertemiment({entertainment, Allcategoryet ,Alllatestentertainment, entertainmentCategory}) {
  const router = useRouter()

  return (
  	<React.Fragment>
      <Head>
        <title>Hulu Media : Display Entertainment</title>
        <meta property="og:url" content={`https://job-frontend-main.vercel.app${router.asPath}`}/>
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="1233665570615472" />
        <meta
          property="og:title"
          content="Hulu Media : Display Entertainment"
        />
        <meta name="twitter:card" content={entertainment.ShortDescription} />
        <meta
          property="og:description"
          content={entertainment.ShortDescription}
        />
        <meta property="og:image" content={entertainment.image} />
        <meta property="og:image:secure_url" content={entertainment.image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="300" />
      </Head>
	    <section className="flex flex-col lg:flex-row w-full h-full px-1 lg:pl-80 lg:px-32 bg-[#e6e6e6] dark:bg-[#02201D] pt-32">
		    <DisplayIndvidualentertainment Allcategoryet={Allcategoryet} entertainment={entertainment} entertainmentCategory={entertainmentCategory} shareUrl={router.asPath} quotes={entertainment.ShortDescription} />
        <DisplayLatestentertainment Alllatestentertainment={Alllatestentertainment}/>          
	    </section>
	  </React.Fragment>
  );
}
