import React from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Attributes } from "../../data/HTML/Attributes";
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

export function HtmlAttributes() {
	const router = useRouter();
  const { title } = router.query
  return (
    <div className="flex flex-col w-full h-full p-5 lg:p-20">
    	<h1 className="font-bold text-3xl hover:text-orange-500 text-center px-0 lg:px-20 my-5">HTML Attributes</h1>
    	<ul className="mx-0 lg:mx-10 my-5 list-disc list-inside">
    		{ Attributes.map((data,index)=>(
    			<li key={index} className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
    				{data.description}	
    			</li>
    		))}
    	</ul>

    	<p className="font-medium leading-loose mt-5 text-xs lg:text-2xl capitalize font-serif subpixel-antialiased not-italic">
    		<span className="font-bold text-2xl mb-5">Synthax : </span> <br />
    		<span className="text-blue-700" >{`<element attribute_name="value">`}</span> content.... <span className="text-blue-700">{"</element>"}</span>
    	</p>

    	<p className="mt-5 font-medium leading-loose text-lg capitalize font-serif subpixel-antialiased not-italic p-3 bg-red-200 mb-5 border rounded-lg">
    		<span className="font-bold text-xl">Note:</span> Double quotes around attribute values are the most common in HTML, but single quotes can 
    		also be used.
    	</p>

    	<div className="flex flex-col">
	    	<h3 className="font-bold text-3xl hover:text-orange-500 text-left my-5">The lang Attributes</h3>
	    	<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic mb-5">
	    		Always include the <span className="text-blue-700">lang</span> attribute inside the
	    		<span className="text-blue-700">{"<html>"}</span> tag, to declare the language of the Web page. 
	    		This is meant to assist search engines and browsers. <br/>
	    		The following example specifies English as the language:
	    	</p>

	    	<div className="w-full h-full bg-gray-200 border rounded-lg mb-5">
		    	<h4 className="font-medium text-3xl hover:text-orange-500 text-left mt-3 px-5">Example</h4>
		    	<div className="p-5">
				    <Editor
						placeholder="Placeholder Text"
						style={{
							height:"10rem",
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
<html lang="en">
<body>
...
</body>
</html>
`}
						setOptions={{
						  	enableBasicAutocompletion: false,
						  	enableLiveAutocompletion: false,
						  	enableSnippets: true,
						  	showLineNumbers: true,  
						}}
					/>
		    	</div>
		    </div>
		    <p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic mb-5">
	    		Country codes can also be added to the language code in the <span className="text-blue-700">lang</span> attribute 
	    		So, the first two characters define the language of the HTML page, and the last two characters define the country.<br/>
	    		The following example specifies English as the language and United States as the country:
	    	</p>
	    	<div className="w-full h-full bg-gray-200 border rounded-lg mb-5">
		    	<h4 className="font-medium text-3xl hover:text-orange-500 text-left mt-3 px-5">Example</h4>
		    	<div className="p-5">
				    <Editor
						placeholder="Placeholder Text"
						style={{
							height:"10rem",
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
<html lang="en-US">
<body>
...
</body>
</html>
`}
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
	    	<h3 className="font-bold text-3xl hover:text-orange-500 text-left my-5">The href Attribute</h3>
	    	<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic mb-5">
	    		The href attribute is the main attribute of  <span className="text-blue-700">{"<a>"}</span> anchor tag. This attribute gives the link address
	    		which is specified in that link. <span className="font-bold">The href attribute provides 
	    		the hyperlink, and if it is blank, then it will remain in same page.</span>
	    	</p>
	    	<div className="w-full h-full bg-gray-200 border rounded-lg mb-5">
		    	<h4 className="font-medium text-3xl hover:text-orange-500 text-left mt-3 px-5">Example</h4>
		    	<div className="p-5">
				    <Editor
						placeholder="Placeholder Text"
						style={{
							height:"2rem",
							width:"100%"
						}}
						mode="css"
						theme="monokai"
					 	name="This is html file"
					 	fontSize={14}
					 	showPrintMargin={true}
					 	showGutter={true}
					 	highlightActiveLine={false}
					 	value={`<a href="https://www.huluMedia.com">Visit Hulumedia</a>`}
						setOptions={{
						  	enableBasicAutocompletion: false,
						  	enableLiveAutocompletion: false,
						  	enableSnippets: true,
						  	showLineNumbers: false,  
						}}
					/>
		    	</div>
		    </div>
	    </div>

	    <div className="flex flex-col">
		    <h3 className="font-bold text-3xl hover:text-orange-500 text-left my-5">The src Attribute</h3>
	    	<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic mb-5">
	    		The <span className="font-bold">src</span> attribute is one of the important and required attribute of 
	    		<span className="text-blue-700">{" <img>"}</span> element. It is source for the image which is required to 
	    		display on browser. This attribute can contain image in same directory or another directory. 
	    		The image name or source should be correct else browser will not display the image.
	    	</p>
	    	<div className="w-full h-full bg-gray-200 border rounded-lg mb-5">
		    	<h4 className="font-medium text-3xl hover:text-orange-500 text-left mt-3 px-5">Example</h4>
		    	<div className="p-5">
				    <Editor
						placeholder="Placeholder Text"
						style={{
							height:"2rem",
							width:"100%"
						}}
						mode="css"
						theme="monokai"
					 	name="This is html file"
					 	fontSize={14}
					 	showPrintMargin={true}
					 	showGutter={true}
					 	highlightActiveLine={false}
					 	value={`<img src="img_huluMedia.jpg">`}
						setOptions={{
						  	enableBasicAutocompletion: false,
						  	enableLiveAutocompletion: false,
						  	enableSnippets: true,
						  	showLineNumbers: false,  
						}}
					/>
		    	</div>
		    </div>
		  </div>
	    	 

    	<p className="font-medium leading-loose text-sm lg:text-lg capitalize font-serif subpixel-antialiased not-italic p-3 bg-red-200 mb-5 border rounded-lg">
    		There are two ways to specify the URL in the <span className="text-blue-900 font-bold text-xl">src</span> attribute:
    		<ul className="list-disc list-inside">
    			<li className="my-5 overflow-x-scroll">
    				<span className="font-bold text-2xl mb-5">Absolute URL</span> - Links to an external image that is hosted on another website.<br/>
    				<span className="text-blue-700"> Example: src=&quot; https://www.hulumedia.com/img_girl.jpg &quot;.</span><br/>
    				<span className="font-bold text-xl mb-5">Notes:</span> External images might be under copyright. If you do 
    				not get permission to use it, you may be in violation of copyright laws. In addition, you cannot 
    				control external images; it can suddenly be removed or changed.
    			</li>
    			<li>
    				<span className="font-bold text-2xl mb-5"> Relative URL</span> - Links to an image that is hosted within the website. Here, the URL does not include
    				the domain name. If the URL begins without a slash, it will be relative to the current page.<br/>
    				<span className="text-blue-700">Example: src=&quot; img_girl.jpg &quot;</span>.<br/> If the URL begins with a slash, it will be relative to the domain.<br/> 
    				<span className="text-blue-700">Example: src=&quot; /images/img_girl.jpg &quot;</span><br/>
    			</li>
    		</ul>
    	</p>

    	<div className="flex flex-col">
	    	<h3 className="font-bold text-3xl hover:text-orange-500 text-left my-5">The width and height Attributes</h3>
	    	<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic mb-5">
	    		The <span className="text-blue-700">{"<img>"}</span> tag should also contain the width and height attributes, 
	    		which specify the <span className="text-blue-700"> width</span> and 
	    		<span className="text-blue-700"> height</span> of the image (in pixels):
	    	</p>
	    	<div className="w-full h-full bg-gray-200 border rounded-lg mb-5">
		    	<h4 className="font-medium text-3xl hover:text-orange-500 text-left mt-3 px-5">Example</h4>
		    	<div className="p-5">
				    <Editor
						placeholder="Placeholder Text"
						style={{
							height:"2rem",
							width:"100%"
						}}
						mode="css"
						theme="monokai"
					 	name="This is html file"
					 	fontSize={14}
					 	showPrintMargin={true}
					 	showGutter={true}
					 	highlightActiveLine={false}
					 	value={`<img src="img_huluMedia.jpg" width="500" height="600">`}
						setOptions={{
						  	enableBasicAutocompletion: false,
						  	enableLiveAutocompletion: false,
						  	enableSnippets: true,
						  	showLineNumbers: false,  
						}}
					/>
		    	</div>
		    </div>
	    </div>

    	<div className="flex flex-col">
	    	<h3 className="font-bold text-3xl hover:text-orange-500 text-left my-5">The Alt Attributes</h3>
	    	<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic mb-5">
	    		The <span className="text-blue-700">alt</span> The required  attribute for the 
	    		<span className="text-blue-700">{"<img>"}</span> tag specifies an alternate text for an image, if the image 
	    		for some reason cannot be displayed.This can be due to a slow connection, or an error in the src attribute, 
	    		or if the user uses a screen reader.
	    	</p>
	    	<div className="w-full h-full bg-gray-200 border rounded-lg mb-5">
		    	<h4 className="font-medium text-3xl hover:text-orange-500 text-left mt-3 px-5">Example</h4>
		    	<div className="p-5">
				    <Editor
						placeholder="Placeholder Text"
						style={{
							height:"2rem",
							width:"100%"
						}}
						mode="css"
						theme="monokai"
					 	name="This is html file"
					 	fontSize={14}
					 	showPrintMargin={true}
					 	showGutter={true}
					 	highlightActiveLine={false}
					 	value={`<img src="img_huluMedia.jpg" width="500" height="600" alt="hulu media logo">`}
						setOptions={{
						  	enableBasicAutocompletion: false,
						  	enableLiveAutocompletion: false,
						  	enableSnippets: true,
						  	showLineNumbers: false,  
						}}
					/>
		    	</div>
		    </div>
	    </div>

	    <div className="flex flex-col">
	    	<h3 className="font-bold text-3xl hover:text-orange-500 text-left my-5">The Style Attributes</h3>
	    	<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic mb-5">
	    		The <span className="text-blue-700">style</span> The required  attribute for the 
	    		<span className="text-blue-700">{"<img>"}</span> attribute is used to add styles to an element, 
	    		such as color, font, and more.
	    	</p>

	    	<div className="w-full h-full bg-gray-200 border rounded-lg mb-5">
		    	<h4 className="font-medium text-3xl hover:text-orange-500 text-left mt-3 px-5">Example</h4>
		    	<div className="p-5">
				    <Editor
						placeholder="Placeholder Text"
						style={{
							height:"2rem",
							width:"100%"
						}}
						mode="css"
						theme="monokai"
					 	name="This is html file"
					 	fontSize={14}
					 	showPrintMargin={true}
					 	showGutter={true}
					 	highlightActiveLine={false}
					 	value={`<p style="color:blue;">This is a blue paragraph.</p>`}
						setOptions={{
						  	enableBasicAutocompletion: false,
						  	enableLiveAutocompletion: false,
						  	enableSnippets: true,
						  	showLineNumbers: false,  
						}}
					/>
		    	</div>
		    </div>
	    </div>

	    <div className="flex flex-col">
	    	<h3 className="font-bold text-3xl hover:text-orange-500 text-left my-5">The title Attributes</h3>
	    	<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic mb-5">
	    		The <span className="text-blue-700">title</span>  attribute is used as text tooltip in most of 
	    		the browsers. It display its text when user move the cursor over a link or any text. You can use 
	    		it with any text or link to show the description about that link or text. In our example, we are 
	    		taking this with paragraph tag and heading tag.
	    	</p>

	    	<div className="w-full h-full bg-gray-200 border rounded-lg mb-5">
		    	<h4 className="font-medium text-3xl hover:text-orange-500 text-left mt-3 px-5">Example</h4>
		    	<div className="p-5">
				    <Editor
						placeholder="Placeholder Text"
						style={{
							height:"2rem",
							width:"100%"
						}}
						mode="css"
						theme="monokai"
					 	name="This is html file"
					 	fontSize={14}
					 	showPrintMargin={true}
					 	showGutter={true}
					 	highlightActiveLine={false}
					 	value={`<h1 title="heading first">Examples of title attribute</h1>`}
						setOptions={{
						  	enableBasicAutocompletion: false,
						  	enableLiveAutocompletion: false,
						  	enableSnippets: true,
						  	showLineNumbers: false,  
						}}
					/>
		    	</div>
		    </div>
	    </div>

	    <p className="font-medium leading-loose text-lg capitalize font-serif subpixel-antialiased not-italic p-3 bg-red-200 mb-5 border rounded-lg">
    		<span className="font-bold text-xl">Note:</span> The HTML standard does not require lowercase attribute names.
				The attributes can be written with uppercase or lowercase like title or TITLE.
				<span className="font-bold"> we recommened to use the lowercase letter</span>
    	</p>

    	<div className="flex flex-row justify-between">
    		<button className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold">Home</button>
    		<button className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold">Next</button>
    	</div>
    </div>
  );
}
