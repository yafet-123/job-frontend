import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { prisma } from '../util/db.server.js'
import { MainHeader } from '../components/common/MainHeader';
import { DisplayIndvidualentertainment } from '../components/Entertemiment/DisplayIndvidualentertainment';
import { DisplayLatestentertainment } from '../components/Entertemiment/DisplayLatestentertainment';

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

  return{
    props:{
      entertainment:JSON.parse(JSON.stringify(onedata)),
      Alllatestentertainment:JSON.parse(JSON.stringify(Alllatestentertainment)),
      entertainmentCategory:JSON.parse(JSON.stringify(etCategory)),
    }
  }
}

export default function DisplayEntertemiment({entertainment,Alllatestentertainment, entertainmentCategory}) {
  const router = useRouter()
  const shareUrl = router.asPath
  return (
  	<React.Fragment>
      <MainHeader title="Display Entertainment" />
	    <section className="flex flex-col lg:flex-row w-full h-full px-1 lg:px-64 bg-[#e6e6e6] dark:bg-[#02201D] pt-32">
		    <DisplayIndvidualentertainment entertainment={entertainment} entertainmentCategory={entertainmentCategory} shareUrl={shareUrl} />
        <DisplayLatestentertainment Alllatestentertainment={Alllatestentertainment}/>          
	    </section>
	  </React.Fragment>
  );
}
