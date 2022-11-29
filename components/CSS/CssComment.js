import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import { Advantagecss } from "../../data/CSS/Advantagecss";
import dynamic from 'next/dynamic'
const Editor = dynamic(
  async () => {
    const ace = await import('react-ace');
    import('ace-builds/src-noconflict/mode-html');
    import('ace-builds/src-noconflict/theme-monokai');
    return ace;
  },
  {
    // eslint-disable-next-line react/display-name
    loading: () => (
      <div style={{ height: '520px' }}>
        <p>loading</p>
      </div>
    ),
    ssr: false,
  },
);

export function CssComment() {
	return(
		<div className="flex flex-col w-full h-full p-5 lg:p-20">
			<h1 className="font-bold text-3xl hover:text-orange-500 text-center px-0 lg:px-20 my-5">CSS Comment</h1>
    		<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic mb-5">
    			CSS comments are generally written to explain your code. It is very helpful for the users who reads
    			your code so that they can easily understand the code.<br/>Comments are ignored by browsers.
					Comments are single or multiple lines statement and written within {"/*............*/"} .
    		</p>

    		<div className="w-full h-full bg-gray-200 border rounded-lg my-5">
	    		<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-5">Example</h4>
	    		<div className="p-5">
			        <Editor
						  	placeholder="Placeholder Text"
						  	style={{
						  		height:"45rem",
						  		width:"100%"
						  	}}
					  		mode="css"
					  		theme="monokai"
					  		name="This is html file"
					  		fontSize={14}
					  		showPrintMargin={true}
					  		showGutter={true}
					  		highlightActiveLine={true}
					  		value={`<!DOCTYPE html>  
<html>  
<head>  
<style>  
h3{  
    color: green;  
    /* This is a single-line comment */  
    text-align: center;  
}   
/* This is  
a multi-line  
comment */  
</style>  
</head>  
<body>  
<h3>Hulu Media</h3>  
<p>CSS comments are ignored by the browsers and not shown in the output.</p>  
</body>  
</html> `}
					  		setOptions={{
					  		enableBasicAutocompletion: false,
					  		enableLiveAutocompletion: false,
					  		enableSnippets: true,
					  		showLineNumbers: true,
					  
					  }}/>
	    		</div>
	    	</div>
	    	<div className="flex flex-row justify-between">
    			<button className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold">Home</button>
    			<button className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold">Next</button>
    		</div>
		</div>
	)
}