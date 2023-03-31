import {useEffect,useState } from 'react'

export async function getServerSideProps(context) {
	const {params,req,res,query} = context
	const {CategoryName} = params
	
  	return {
    	props: {
	    	patient:data.data,
	    }, // will be passed to the page component as props
	}
}


export default function DisplayMedicalRecord({patient}){
	const patientMedicalRecord = patient['all']
	const ptientMRN = patient['info'].MRN
	return(
		
	)	
}
