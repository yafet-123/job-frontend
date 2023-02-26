import React from "react";
import { useState,useEffect, useContext} from 'react'
import { AddNews } from "../../components/Admin/News/AddNews";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../components/MainHeader';

export default function News() {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      	<MainHeader title="Category Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#ddd0c8] dark:bg-slate-700 pt-10">
    		    <div className='w-full h-full flex flex-col lg:flex-row'>
    		        <VerticalNavbar data={data} />
    		        <div className="w-full">
            		    <AddNews />
            	    </div>
    		    </div> 
  			</section>
      	</React.Fragment>
        
    );
}
