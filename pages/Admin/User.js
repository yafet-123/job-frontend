import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../util/db.server.js'
import { AddUser } from "../../components/Admin/AddUser";
import {DisplayUser} from "../../components/Admin/DisplayUser";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../components/MainHeader';
export async function getServerSideProps(){
  const users = await prisma.User.findMany({orderBy : {ModifiedDate:'desc'}});
  const Allusers = users.map((data)=>({
      user_id:data.user_id,
      email:data.email,
      role:data.role,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      UserName:data.UserName
  }))

  return{
    props:{
      users:JSON.parse(JSON.stringify(Allusers)),
    }
  }
}

export default function User({users}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      		<MainHeader title="Entertemiment" />
      		<section className="flex flex-col w-full h-full bg-gray-300 dark:bg-slate-700 pt-28">
				<div className='w-full h-full flex flex-col lg:flex-row'>
		        	<VerticalNavbar data={data} />
		        	<div className="w-full">
            			<AddUser />
            			<DisplayUser users={users} />
        			</div>
		        </div> 
			</section>
      	</React.Fragment>
        
    );
}
