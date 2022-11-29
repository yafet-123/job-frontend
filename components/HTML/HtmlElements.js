import React from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ApplicationOfHtml } from "../../data/HTML/ApplicationOfHtml";
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

export function HtmlElements() {
	const router = useRouter();
  const { title } = router.query
  return (
    <div className="flex flex-col w-full h-full p-5 lg:p-20">
    	<h1 className="font-bold text-3xl hover:text-orange-500 text-center px-0 lg:px-20 my-5">HTML Elements</h1>
    	<p className="font-medium leading-loose text-lg capitalize font-serif subpixel-antialiased not-italic">
    		An HTML element is the collection of start and end tags with the content inserted in between them.
    	</p>

    	<p className="font-medium leading-loose my-5 text-sm lg:text-2xl capitalize font-serif subpixel-antialiased not-italic">
    		<span className="font-bold text-lg lg:text-2xl mb-5">Synthax : </span> <br />
    		<span className="text-blue-700" >{"<tagname>"}</span> content.... <span className="text-blue-700">{"</tagname>"}</span>
    	</p>

    	<p className="font-medium leading-loose my-5 text-sm lg:text-2xl capitalize font-serif subpixel-antialiased not-italic">
    		<span className="font-bold text-2xl mb-5">Example : </span> <br />
    		<span className="text-blue-700" >{"<p>"}</span> This is Paragraph <span className="text-blue-700">{"</p>"}</span> <br />
    		<span className="text-blue-700" >{"<h3>"}</span> This is heading 3 <span className="text-blue-700">{"</h3>"}</span><br />
    	</p>

    	<h3 className="font-bold text-sm lg:text-2xl hover:text-orange-500 text-left">
    		HTML Element: The HTML element consist of 3 parts.
    	</h3>
    	<ul className="mx-0 lg:mx-10 my-5 list-disc list-inside">
    		<li className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
    			<span className="font-bold text-xl">Opening tag:</span> It is used to tell the browser where the content material starts.
    			<strong className="text-blue-700"> Example {"<p>"} and {"<h3>"} </strong>
    		</li>

    		<li className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
    			<span className="font-bold text-xl">Closing tag:</span> It is used to tell the browser where the content material ends.	
    			<strong className="text-blue-700"> Example {"</p>"} and {"</h3>"} </strong>
    		</li>

    		<li className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
    			<span className="font-bold text-xl">Content:</span> It is the actual content material inside the opening and closing tag.	
    			<strong className="text-blue-700"> Example This is Paragraph and This is heading 3 </strong>
    		</li>
    	</ul>


    	<p className="font-medium leading-loose text-lg capitalize font-serif subpixel-antialiased not-italic p-3 bg-red-200 mb-5 border rounded-lg">
    		<span className="font-bold text-xl">Note:</span> Some HTML elements have no content (like the {"<br>"} element). 
    		These elements are called empty elements. Empty elements do not have an end tag!
    	</p>

    	<div className="w-full h-full bg-gray-200 border rounded-lg mb-5">
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

	<p>This is a <br> paragraph with a line break.</p>

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

    	<div className="flex flex-col my-5 ">
	    	<h3 className="font-bold text-3xl hover:text-orange-500 text-left mb-5">
	    		Nested Html Elements
	    	</h3>

	    	<p className="font-medium leading-loose text-lg capitalize font-serif subpixel-antialiased not-italic mb-5">
	    		HTML elements can be nested {"("}it means that elements can contain other elements{")"}.
	    	</p>

	    	<p className="font-medium leading-loose text-lg capitalize font-serif subpixel-antialiased not-italic mb-5">
	    		All HTML documents consist of nested HTML elements. <span className="font-bold text-xl">Examples:</span> {"<html>, <body>, <h1> and <p>"}.
	    	</p>
	    </div>

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
	<p>paragraph</p>

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

	    <div className="flex flex-col">
	    	<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-5">Example Explained</h4>
	    	<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic mb-5">
	    		<span className="font-bold text-xl text-blue-700">{"<html>"}</span> element is the root element and it
	    		defines the whole Html document it start with <span className="font-bold text-xl text-blue-700">{"<html>"}</span>
	    		and end with <span className="font-bold text-xl text-blue-700">{"</html>"}</span> inside the 
	    		<span className="font-bold text-xl text-blue-700">{" <html>"}</span> we have the 
	    		<span className="font-bold text-xl text-blue-700">{"<body>"}</span>
	    		element it defines the document body. it start with 
	    		<span className="font-bold text-xl text-blue-700">{"<body>"}</span>
	    		and end with <span className="font-bold text-xl text-blue-700">{"</body>"}</span> inside the 
	    		<span className="font-bold text-xl text-blue-700">{"<body>"}</span> we have <span className="font-bold text-xl text-blue-700">{"<h1> "}</span>
	    		and <span className="font-bold text-xl text-blue-700">{" <p>"}</span> tag.
	    	</p>
	    </div>

	    <p className="font-medium leading-loose text-lg capitalize font-serif subpixel-antialiased not-italic p-3 bg-red-200 mb-5 border rounded-lg">
    		<span className="font-bold text-xl">Note:</span> Some HTML elements will display correctly, even if you forget the end tag
    		but never skip the end tag.
    	</p>

    	<div className="w-full h-full bg-gray-200 border rounded-lg mb-5">
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

	<h1>Heading one
	<p>paragraph

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

    	<div className="flex flex-row justify-between">
    		<button className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold">Home</button>
    		<button className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold">Next</button>
    	</div>
    </div>
  );
}
