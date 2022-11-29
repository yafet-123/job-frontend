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

export function CssSyntax() {
	return(
		<div className="flex flex-col w-full h-full p-5 lg:p-20">
			<h1 className="font-bold text-3xl hover:text-orange-500 text-center px-0 lg:px-20 my-5">CSS Synthax</h1>
    		<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic mb-5">
    			<span className="font-bold text-xl"> CSS </span> rule set contains a selector and a declaration block.
    		</p>
    		<Image src="/images/cssSyntax.png" width={300} height={300} alt="css Synthax" />
    		<div className="flex flex-col mt-5">
    			<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic mb-5">
    				<span className="font-bold text-xl"> Selector: </span> Selector indicates the HTML element
    				you want to style. It could be any tag like {"<h1>, <title>"} etc.
    			</p>

    			<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic mb-5">
    				<span className="font-bold text-xl"> Declaration Block: </span> The declaration block can contain 
    				one or more declarations separated by a semicolon.
    			</p>

    			<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic mb-5">
    				<span className="font-bold text-xl"> Property: </span> A Property is a type of attribute of HTML element. 
    				It could be color, border etc.
    			</p>

    			<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic mb-5">
    				<span className="font-bold text-xl"> Value: </span> Values are assigned to CSS properties.
    			</p>
    		</div>

    		<div className="w-full h-full bg-gray-200 border rounded-lg my-5">
	    		<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-5">Example</h4>
	    		<div className="p-5">
			        <Editor
						  	placeholder="Placeholder Text"
						  	style={{
						  		height:"5rem",
						  		width:"100%"
						  	}}
					  		mode="css"
					  		theme="monokai"
					  		name="This is html file"
					  		fontSize={14}
					  		showPrintMargin={true}
					  		showGutter={true}
					  		highlightActiveLine={true}
					  		value={`p {
  color: black;
}`}
					  		setOptions={{
					  		enableBasicAutocompletion: false,
					  		enableLiveAutocompletion: false,
					  		enableSnippets: true,
					  		showLineNumbers: true,
					  
					  }}/>
	    		</div>
	    	</div>

	    	<div className="flex flex-col">
	    		<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-0 lg:px-5">Example Explained</h4>
	    		<ul className="mx-0 lg:mx-10 my-5 list-disc list-inside">
    				<li className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
    					<span className="font-bold text-blue-800">p</span> -  is a selector in CSS {"(it points to the HTML element you want to style: <p>)"}.
    				</li>
    				<li className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
    					<span className="font-bold text-blue-800">color</span> is a property, and 
    					<span className="font-bold text-blue-800">blue</span>  is the property value
    				</li>
	    		</ul>
	    	</div>

	    	<div className="flex flex-row justify-between">
    			<button className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold">Home</button>
    			<button className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold">Next</button>
    		</div>
		</div>
	)
}