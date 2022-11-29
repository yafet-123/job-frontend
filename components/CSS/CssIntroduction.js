import React, {useState} from "react";
import Link from "next/link";
import Image from 'next/image'
import { ApplicationOfHtml } from "../../data/HTML/ApplicationOfHtml";
import { IntroductionExampleExplained } from "../../data/HTML/IntroductionExampleExplained";
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

export function CssIntroduction() {
  	return (
	    <div className="flex flex-col w-full h-full p-5 lg:p-20">
	    	<h1 className="font-bold text-3xl hover:text-orange-500 text-center px-0 lg:px-20 my-5">CSS - Introduction</h1>
	    	<p className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
	    		<span className="font-bold text-xl"> CSS </span> is a language for specifying how documents are 
	    		presented to users. CSS is the language we use to style an HTML document.
	    		CSS describes how HTML elements should be displayed.
	    	</p>

	    	<p className="font-medium leading-loose text-lg capitalize font-serif subpixel-antialiased not-italic">
	    		CSS is created and maintained through a group of people within the W3C called the CSS Working Group. 
	    		The CSS Working Group creates documents called specifications. When a specification has been discussed 
	    		and officially ratified by the W3C members, it becomes a recommendation.

	    	</p>

	    	<div className="w-full h-full bg-gray-200 border rounded-lg my-5">
	    		<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-5">Example</h4>
	    		<div className="p-5">
			        <Editor
						  	placeholder="Placeholder Text"
						  	style={{
						  		height:"25rem",
						  		width:"100%"
						  	}}
					  		mode="css"
					  		theme="monokai"
					  		name="This is html file"
					  		fontSize={14}
					  		showPrintMargin={true}
					  		showGutter={true}
					  		highlightActiveLine={true}
					  		value={`body {
  background-color: blue;
}

h3 {
  color: red;
  text-align: left;
}

p {
  color: black;
  font-family: verdana;
  font-size: 20px;
}`}
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
  	);
}
