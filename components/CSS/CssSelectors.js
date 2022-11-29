import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import { CSSSelectors } from "../../data/CSS/CSSSelectors";
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

export function CssSelectors() {
	return(
		<div className="flex flex-col w-full h-full p-5 lg:p-20">
			<h1 className="font-bold text-3xl hover:text-orange-500 text-center px-0 lg:px-20 my-5">CSS Selectors</h1>
    		<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic mb-5">
    			<span className="font-bold text-xl"> CSS selectors </span> are used to select the content you 
    			want to style. Selectors are the part of CSS rule set. CSS selectors select HTML elements according 
    			to its id, class, type, attribute etc.
    		</p>

    		<div className="flex flex-col">
	    		<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic">
    				There are several different types of selectors in CSS.
    			</p>
	    		<ul className="mx-10 mb-5 list-disc list-inside">
	    			{ CSSSelectors.map((data,index)=>(
    					<li key={index} className="font-medium leading-loose my-5 text-lg capitalize font-serif subpixel-antialiased not-italic">
    						{data.content}	
    					</li>
    				))}
	    		</ul>
	    	</div>

	    	<div className="flex flex-col">
	    		<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-0 lg:px-5">1) CSS Element Selector</h4>
	    		<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic">
    				The element selector selects HTML elements based on the element name.
    			</p>
    			<div className="w-full h-full bg-gray-200 border rounded-lg my-5">
			    	<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-5">Example</h4>
			    	<p className="px-5 font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic">
    					all {"<p>"} elements on the page will be left-aligned, with a black text color:
    				</p>
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
							  value={`p {
	color: black;
	text-align:left;
}`}
							  setOptions={{
							  	enableBasicAutocompletion: false,
							  	enableLiveAutocompletion: false,
							  	enableSnippets: true,
							  	showLineNumbers: true,
							}}/>
			    	</div>
			    </div>
	    	</div>

	    	<div className="flex flex-col">
	    		<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-0 lg:px-5">2) CSS Id Selector</h4>
	    		<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic">
    				The id selector selects the id attribute of an HTML element to select a specific element. 
    				An id is always unique within the page so it is chosen to select a single, unique element.<br />

						It is written with the hash character {"(#)"}, followed by the id of the element.
    			</p>
    			<div className="w-full h-full bg-gray-200 border rounded-lg my-5">
			    	<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-5">Example</h4>
			    	<p className="px-5 font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic">
    					The CSS rule below will be applied to the HTML element with id={"para1"}: 
    				</p>
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
							  value={`#paragraph1 {
	text-align: center;
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
	    	</div>

	    	<div className="flex flex-col">
	    		<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-0 lg:px-5">3) CSS Class Selector</h4>
	    		<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic">
    				The class selector selects HTML elements with a specific class attribute. It is used with a 
    				period character. {"(full stop symbol)"} followed by the class name.
    			</p>
    			<div className="w-full h-full bg-gray-200 border rounded-lg my-5">
			    	<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-5">Example</h4>
			    	<p className="px-5 font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic">
    					All HTML elements with class={"center"} will be black and center-aligned 
    				</p>
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
							  value={`#paragraph1 {
	text-align: center;
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

			    <p className="px-0 lg:px-5 font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic">
    				You can also specify that only specific HTML elements should be affected by a class.
    			</p>

    			<div className="w-full h-full bg-gray-200 border rounded-lg my-5">
			    	<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-5">Example</h4>
			    	<p className="px-5 font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic">
    					only {"<p>"} elements with class={"center"} will be black and center-aligned:  
    				</p>
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
							  value={`p.center {
	text-align: center;
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

			    <p className="px-0 lg:px-5 font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic">
    				HTML elements can also refer to more than one class.
    			</p>

    			<div className="w-full h-full bg-gray-200 border rounded-lg my-5">
			    	<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-0 lg:px-5">Example</h4>
			    	<p className="px-5 font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic">
    					The {"<p>"} element will be styled according to class={"center"} and to class={"large"}:  
    				</p>
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
							  highlightActiveLine={true}
							  value={`<p class="center large">This paragraph refers to two classes.</p>`}
							  setOptions={{
							  	enableBasicAutocompletion: false,
							  	enableLiveAutocompletion: false,
							  	enableSnippets: true,
							  	showLineNumbers: true,
							}}/>
			    	</div>
			    </div>
			    <p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic p-3 bg-red-200 mb-5 border rounded-lg">
    				<span className="font-bold text-xl">Note:</span> A class name and id name cannot start with a number!
    			</p>
	    	</div>

	    	<div className="flex flex-col">
	    		<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-0 lg:px-5">4) CSS Universal Selector</h4>
	    		<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic">
    				The universal selector is used as a wildcard character. It selects all the elements on the pages.
    			</p>
    			<div className="w-full h-full bg-gray-200 border rounded-lg my-5">
			    	<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-5">Example</h4>
			    	<p className="px-5 font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic">
    					The CSS rule below will affect every HTML element on the page: 
    				</p>
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
							  value={`*{
	text-align: right;
	color: red;
}`}
							  setOptions={{
							  	enableBasicAutocompletion: false,
							  	enableLiveAutocompletion: false,
							  	enableSnippets: true,
							  	showLineNumbers: true,
							}}/>
			    	</div>
			    </div>
	    	</div>

	    	<div className="flex flex-col">
	    		<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-0 lg:px-5">5) CSS Group Selector</h4>
	    		<p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic">
    				The grouping selector selects all the HTML elements with the same style definitions. <br/>
						Look at the following CSS code (the h1, h2, and p elements have the same style definitions):
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
							  value={`h1 {
  text-align: center;
  color: blue;
}

h2 {
  text-align: center;
  color: blue;
}

p {
  text-align: center;
  color: blue;
}
`}
							  setOptions={{
							  	enableBasicAutocompletion: false,
							  	enableLiveAutocompletion: false,
							  	enableSnippets: true,
							  	showLineNumbers: true,
							}}/>
			    	</div>
			    </div>
			    <p className="font-medium leading-loose text-lg font-serif subpixel-antialiased not-italic">
    				It will be better to group the selectors, to minimize the code.<br />
						To group selectors, separate each selector with a comma.
    			</p>

    			<div className="w-full h-full bg-gray-200 border rounded-lg my-5">
			    	<h4 className="font-medium text-3xl hover:text-orange-500 text-left my-5 px-5">Example</h4>
			    	<div className="p-5">
					    <Editor
								placeholder="Placeholder Text"
								style={{
								  height:"7rem",
								  width:"100%"
								}}
							  mode="css"
							  theme="monokai"
							  name="This is html file"
							  fontSize={14}
							  showPrintMargin={true}
							  showGutter={true}
							  highlightActiveLine={true}
							  value={`h1,h2,p {
  text-align: center;
  color: blue;
}
`}
							  setOptions={{
							  	enableBasicAutocompletion: false,
							  	enableLiveAutocompletion: false,
							  	enableSnippets: true,
							  	showLineNumbers: true,
							}}/>
			    	</div>
			    </div>

		    	</div>
		    <div className="flex flex-row justify-between">
    			<button className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold">Home</button>
    			<button className="px-3 lg:px-6 py-3 bg-green-600 border rounded-lg text-white text-xl font-bold">Next</button>
    		</div>
		</div>
	)
}