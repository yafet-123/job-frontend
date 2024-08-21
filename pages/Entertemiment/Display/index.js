import React, {useState,useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { DisplayIndvidualentertainment } from '../../../components/Entertemiment/DisplayIndvidualentertainment';
import { DisplayLatestentertainment } from '../../../components/Entertemiment/DisplayLatestentertainment';
import Head from 'next/head';
 
import db from '../../../db.js';

export async function getServerSideProps(context) {
  const { params, req, res, query } = context;
  const id = query.entertainment_id;

  const updateViewQuery = `
    UPDATE "Entertainment"
    SET view = view + 1
    WHERE entertainment_id = $1
  `;

  // Fetch the specific entertainment
  const fetchEntertainmentQuery = `
    SELECT e.entertainment_id, e."Header", e."Image", e."ShortDescription", e."Description", e."CreatedDate", e."ModifiedDate",
           u."UserName",
           ec.category_id, ec."CategoryName"
    FROM "Entertainment" e
    INNER JOIN "User" u ON e.user_id = u.user_id
    LEFT JOIN "EntertainmentCategoryRelationship" ecr ON e.entertainment_id = ecr.entertainment_id
    LEFT JOIN "EntertainmentCategory" ec ON ecr.category_id = ec.category_id
    WHERE e.entertainment_id = $1
  `;

  const fetchCategoryIdsQuery = `
    SELECT ec.category_id
    FROM "EntertainmentCategoryRelationship" ecr
    INNER JOIN "EntertainmentCategory" ec ON ecr.category_id = ec.category_id
    WHERE ecr.entertainment_id = $1
  `;

  const fetchRelatedEntertainmentsQuery = `
    SELECT e.*, u."UserName"
    FROM "EntertainmentCategoryRelationship" ecr
    INNER JOIN "Entertainment" e ON ecr.entertainment_id = e.entertainment_id
    INNER JOIN "User" u ON e.user_id = u.user_id
    WHERE ecr.category_id = ANY($1::int[])
  `;

  const fetchLatestEntertainmentsQuery = `
    SELECT e.*, u."UserName"
    FROM "Entertainment" e
    INNER JOIN "User" u ON e.user_id = u.user_id
    ORDER BY e.entertainment_id DESC
    LIMIT 6
  `;

  try {
    const update = await db.query(updateViewQuery, [Number(id)]);
    const entertainmentResult = await db.query(fetchEntertainmentQuery, [Number(id)]);
    const data = entertainmentResult;

    const onedata = {
      entertainment_id: data.entertainment_id,
      Header: data.Header,
      image: data.Image,
      ShortDescription: data.ShortDescription,
      Description: data.Description,
      userName: data.UserName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
    };

    console.log(onedata)

    const categoryIdsResult = await db.query(fetchCategoryIdsQuery, [Number(id)]);
    const findCategory = categoryIdsResult.map(row => Number(row.category_id));
    
    const relatedEntertainmentsResult = await db.query(fetchRelatedEntertainmentsQuery, [findCategory]);

    const Allcategoryet = relatedEntertainmentsResult.map(row => ({
      Entertainment: {
        entertainment_id: row.entertainment_id,
        Header: row.Header,
        image: row.Image,
        ShortDescription: row.ShortDescription,
        Description: row.Description,
        CreatedDate: row.CreatedDate,
        ModifiedDate: row.ModifieddDate,
        userName: row.UserName,
        view:row.view
      }
    }));
  
    const latestEntertainmentsResult = await db.query(fetchLatestEntertainmentsQuery);

    const latestentertainments = latestEntertainmentsResult
    console.log(latestentertainments)
    const Alllatestentertainment = latestentertainments.map(row => ({
      entertainment_id: row.entertainment_id,
      Header: row.Header,
      image: row.Image,
      ShortDescription: row.ShortDescription,
      userName: row.UserName,
      CreatedDate: row.CreatedDate,
      ModifiedDate: row.ModifiedDate,
      Category: row.CategoryName,  // Assuming row contains the category relationship data
    }));

    const uniqueallcategoryet = [...new Map(Allcategoryet.map(v => [v.Entertainment.entertainment_id, v])).values()];

    return {
      props: {
        entertainment: JSON.parse(JSON.stringify(onedata)),
        Alllatestentertainment: JSON.parse(JSON.stringify(Alllatestentertainment)),
        entertainmentCategory: JSON.parse(JSON.stringify(findCategory)),
        Allcategoryet: JSON.parse(JSON.stringify(uniqueallcategoryet)),
      }
    };
  } catch (err) {
    console.error('Database Query Error:', err);
    return {
      props: {
        entertainment:[],
        Alllatestentertainment:[],
        entertainmentCategory:[],
        Allcategoryet:[]
      },
    };
  }
}


// export async function getServerSideProps(context){
//   	const {params,req,res,query} = context
//   	const id = query.entertainment_id

//   	const updateview = await prisma.Entertainment.update({
//     	where:{entertainment_id : Number(id),},
//     	data: { view: { increment: 1 }, },
//   	})
  
// 	const data = await prisma.Entertainment.findUnique({
// 		where:{
// 			entertainment_id: Number(id),
// 		},
// 		include:{
// 	      	User:{
// 	        	select:{
// 	          		UserName:true
// 	        	}
// 	      	},
// 	      	EntertainmentCategoryRelationship:{
// 	        	include:{
// 	          		EntertainmentCategory:{
// 	            		select:{
// 	              			category_id:true,
// 	              			CategoryName:true
// 	            		}
// 	          		}
// 	        	}
// 	      	},
//     	}
// 	});
	
// 	const onedata = {
// 	    entertainment_id:data.entertainment_id,
// 	    Header:data.Header,
// 	    image:data.Image,
// 	    ShortDescription:data.ShortDescription,
// 	    Description:data.Description,
// 	    userName:data.User.UserName,
// 	    CreatedDate:data.CreatedDate,
// 	    ModifiedDate:data.ModifiedDate,
//   	}

//   const etCategory = data.EntertainmentCategoryRelationship
//   const findCategory = []
//   for(let i=0; i< etCategory.length;i++){
//     findCategory.push(
//       Number(etCategory[i].EntertainmentCategory?.category_id)
//     )
//   }

//   const dataForCategoryet = await prisma.EntertainmentCategoryRelationship.findMany({
//     where:{
//         EntertainmentCategory:{
//           category_id:{
//             in:findCategory
//           }
//         }
//     }, 
//     include:{
//       User:{
//         select:{
//           UserName:true
//         }
//       },
//       Entertainment:true,
//       EntertainmentCategory:true
//     }
//   });

//   const Allcategoryet = dataForCategoryet.map((data)=>({
//     Entertainment:data.Entertainment
//   }))

//   const latestet = await prisma.Entertainment.findMany({
//   	take:-6,
//     orderBy: {
//       entertainment_id:"desc"
//     },
//     include:{
//       User:{
//         select:{
//           UserName:true
//         }
//       },
//       EntertainmentCategoryRelationship:{
//         include:{
//           EntertainmentCategory:{
//             select:{
//               category_id:true,
//               CategoryName:true
//             }
//           }
//         }
//       },
//     }
//   });

//   const Alllatestentertainment = latestet.map((data)=>({
//     entertainment_id:data.entertainment_id,
//     Header:data.Header,
//     image:data.Image,
//     ShortDescription:data.ShortDescription,
//     userName:data.User.UserName,
//     CreatedDate:data.CreatedDate,
//     ModifiedDate:data.ModifiedDate,
//     Category:data.EntertainmentCategoryRelationship
//   }))
//   const uniqueallcategoryet = [...new Map(Allcategoryet.map(v => [v.Entertainment.entertainment_id,v])).values()]

//   return{
//     props:{
//       entertainment:JSON.parse(JSON.stringify(onedata)),
//       Alllatestentertainment:JSON.parse(JSON.stringify(Alllatestentertainment)),
//       entertainmentCategory:JSON.parse(JSON.stringify(etCategory)),
//       Allcategoryet:JSON.parse(JSON.stringify(uniqueallcategoryet))
//     }
//   }
// }

 
export default function DisplayEntertemiment({entertainment, Allcategoryet ,Alllatestentertainment, entertainmentCategory}) {
  const router = useRouter()

  return (
  	<React.Fragment>
      <Head>
        <title>Hulu Media : Display Entertainment</title>
        <meta name="description" content="HuluNeger is one the most online recruitment provider in ethiopia, 
          The website advertises jobs across a wide range of job types by different employers, 
          inlcuding private, local, international, who are hiring in ethiopia." 
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo3.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/logo3.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo3.png" />

        <meta property="og:url" content={`https://job-frontend-main.vercel.app${router.asPath}`}/>
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="1233665570615472" />
        <meta property="og:title" content="Hulu Media : Display Entertainment"/>
        <meta name="twitter:card" content={entertainment.ShortDescription} />
        <meta property="og:description" content={entertainment.ShortDescription}/>
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
