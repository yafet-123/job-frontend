import React, {useState} from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
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

export function HtmlIntroduction() {
	const router = useRouter();
  	const { title } = router.query
  	return (
	    <div className="flex flex-col w-full h-full p-5 lg:p-20">
	    	<h1 className="font-bold text-3xl hover:text-orange-500 text-center px-0 lg:px-20 my-5">HTML - Introduction</h1>
	    	<p className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
	    		<span className="font-bold text-xl"> HTML </span> is a language made up of elements, which can be 
	    		applied to pieces of text to give them different meaning in a document like paragraph , bulleted list , table
	    		and etc ...
	    	</p>

	    	<p className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
	    		Originally, HTML was developed with the intent of defining the structure of documents like headings, 
	    		paragraphs, lists, and so forth to facilitate the sharing of scientific information between researchers.
				Now, HTML is being widely used to format web pages with the help of different tags available in HTML 
				language.
	    	</p>

	    	<h3 className="font-bold text-2xl lg:text-3xl hover:text-orange-500 text-left my-5 px-0 lg:px-5">Basic HTML Document</h3>
	    	<div className="w-full h-full bg-gray-200 border rounded-lg">
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
					  		value={`<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>Heading 1</h1>
<h2>Heading 2</h2>
<p>paragraph</p>

</body>
</html>`}
					  		setOptions={{
					  			enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  showLineNumbers: true,
  tabSize: 2,
					  
					  }}/>
	    		</div>
	    	</div>

	    	<div className="flex flex-col">
	    		<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-0 lg:px-5">Example Explained</h4>
	    		<ul className="mx-0 lg:mx-10 my-5 list-disc list-inside">
	    			{ IntroductionExampleExplained.map((data,index)=>(
    					<li key={index} className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
    						The <span className="font-bold text-blue-800 text-2xl">{data.example}</span> - {data.describe}	
    					</li>
    				))}
	    		</ul>
	    	</div>

	    	<div className="flex flex-col mb-5">
	    		<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-0 lg:px-5">Web Browser</h4>
	    		<p className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
	    			A web browser is a software application specifically for the purpose of reading HTML instructions 
	    			and displaying the resulting Web page. HTML is responsible for telling a Web browser how text and 
	    			other objects in a Web document should appear.
	    		</p>

	    		<p className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
		    		A web browser typically reads and renders HTML documents. This happens inside the browser as two stages - 
		    		the parsing stage and the rendering stage. During the parsing stage, the browser reads the markup in the 
		    		document, breaks it down into components, and builds a document object model (DOM). When the DOM tree has 
		    		been constructed, and any CSS style sheets have been loaded and parsed, the browser starts the rendering 
		    		stage. Each node in the DOM tree will be rendered and displayed in the browser.
		    	</p>
		    	<Image src="/images/webBrowser.jpg" width={500} height={500} alt="web browser" />
	    	</div>
	    	<div className="flex flex-row justify-between">
    			<button className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold">Home</button>
    			<button className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold">Next</button>
    		</div>
	    </div>
  	);
}
