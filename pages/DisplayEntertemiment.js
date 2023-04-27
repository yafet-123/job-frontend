import React, {useState,useEffect} from "react";
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
  console.log(entertainment)
  const [shareUrl, setshareUrl] = useState("")
  const [image , setimage] = useState("") 
  const [quotes, setquotes] = useState("")
  useEffect(()=>{
    setimage(entertainment.image)
    setquotes(entertainment.ShortDescription)
    setshareUrl(router.asPath)
  },[])
  return (
  	<React.Fragment>
      <MainHeader title="Hulu Media : Display Entertainment" image={image} quotes={quotes} shareUrl={shareUrl} />
	    <section className="flex flex-col lg:flex-row w-full h-full px-1 lg:pl-80 lg:px-32 bg-[#e6e6e6] dark:bg-[#02201D] pt-32">
		    <DisplayIndvidualentertainment Allcategoryet={Allcategoryet} entertainment={entertainment} entertainmentCategory={entertainmentCategory} shareUrl={shareUrl} quotes={quotes} />
        <DisplayLatestentertainment Alllatestentertainment={Alllatestentertainment}/>          
	    </section>
	  </React.Fragment>
  );
}
