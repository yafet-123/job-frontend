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

export function CssAddingCSS() {

  return (
    <div className="flex flex-col w-full h-full p-5 lg:p-20">
    	<h1 className="font-bold text-3xl hover:text-orange-500 text-center px-0 lg:px-20 my-5">How to add CSS</h1>
    	<p className="font-medium leading-loose text-lg capitalize font-serif subpixel-antialiased not-italic">
    		CSS is added to HTML pages to format the document according to information in the style sheet. 
    		There are three ways to insert CSS in HTML documents.
    	</p>

    	<ul className="mx-10 mt-5 list-disc list-inside">
    		<li className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
    			Inline CSS	
    		</li>

    		<li className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
    			Internal CSS
    		</li>

    		<li className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
    			External CSS
    		</li>
    	</ul>

    	<div className="flex flex-col">
    		<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-0 lg:px-5">1) Internal CSS</h4>
	    	<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic">
    			An internal style sheet may be used if one single HTML page has a unique style.<br />
				The internal style is defined inside the {"<style>"} element, inside the head section.
    		</p>
    		<div className="w-full h-full bg-gray-200 border rounded-lg my-5">
			    <h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-5">Example</h4>
			    <div className="p-5">
					<Editor
						placeholder="Placeholder Text"
						style={{
							height:"30rem",
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
body {
  background-color: linen;
}

h1 {
  color: maroon;
  margin-left: 40px;
}
</style>
</head>
<body>

<h1>This is a heading</h1>

</body>
</html>`}
						setOptions={{
							enableBasicAutocompletion: false,
							enableLiveAutocompletion: false,
							enableSnippets: true,
							showLineNumbers: true,
						}}
					/>
			   	</div>
			</div>
    	</div>

    	<div className="flex flex-col">
    		<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-0 lg:px-5">2) Inline CSS</h4>
	    	<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic">
    			An inline style may be used to apply a unique style for a single element.<br/>
				To use inline styles, add the style attribute to the relevant element. The style attribute can 
				contain any CSS property.
    		</p>
    		<div className="w-full h-full bg-gray-200 border rounded-lg my-5">
			    <h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-5">Example</h4>
			    <div className="p-5">
					<Editor
						placeholder="Placeholder Text"
						style={{
							height:"30rem",
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

</head>
<body>

<h1 style="color:green;text-align:center;">This is a heading one</h1>
<p style="color:yellow;">This is a paragraph.</p>

</body>
</html>`}
						setOptions={{
							enableBasicAutocompletion: false,
							enableLiveAutocompletion: false,
							enableSnippets: true,
							showLineNumbers: true,
						}}
					/>
			   	</div>
			</div>
    	</div>

    	<div className="flex flex-col">
    		<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-0 lg:px-5">3) External CSS</h4>
	    	<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic">
    			External CSS is used to apply CSS on multiple pages or all pages. Here, we write all
    			the CSS code in a css file. Its extension must be .css for example style.css.<br/>
    			Each HTML page must include a reference to the external style sheet file inside the {"<link>"}
    			element, inside the head section.
    		</p>
    		<div className="w-full h-full bg-gray-200 border rounded-lg my-5">
			    <h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-5">Example</h4>
			    <div className="p-5">
					<Editor
						placeholder="Placeholder Text"
						style={{
							height:"30rem",
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
<link rel="stylesheet" href="mystyle.css">
</head>
<style>

</head>
<body>

<h1>This is a heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`}
						setOptions={{
							enableBasicAutocompletion: false,
							enableLiveAutocompletion: false,
							enableSnippets: true,
							showLineNumbers: true,
						}}
					/>
			   	</div>
			</div>

			<div className="w-full h-full bg-gray-200 border rounded-lg my-5">
			    <h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-5">mystyle.css</h4>
			    <div className="p-5">
					<Editor
						placeholder="Placeholder Text"
						style={{
							height:"15rem",
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
  background-color: lightblue;
}

h1 {
  color: navy;
  margin-left: 20px;
}`}
						setOptions={{
							enableBasicAutocompletion: false,
							enableLiveAutocompletion: false,
							enableSnippets: true,
							showLineNumbers: true,
						}}
					/>
			   	</div>
			</div>
    	</div>

    	<div className="flex flex-col">
    		<h1 className="font-bold text-3xl hover:text-orange-500 text-left my-5">Cascading Order</h1>
    		<p className="font-medium leading-loose text-lg capitalize font-serif subpixel-antialiased not-italic">
    			What style will be used when there is more than one style specified for an HTML element?<br/>
				All the styles in a page will {"cascade"} into a new {"virtual"} style sheet by the following rules, 
				where number one has the highest priority:
    		</p>
    		<ul className="mx-10">
	    		<li className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
	    			1. Inline CSS	
	    		</li>

	    		<li className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
	    			2. External and Internal CSS
	    		</li>

	    		<li className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
	    			3. Browser default
	    		</li>
    		</ul>
    	</div>

    	<div className="flex flex-row justify-between">
    		<button className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold">Home</button>
    		<button className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold">Next</button>
    	</div>
    </div>
  );
}
