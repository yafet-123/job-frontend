import React from "react";
import { MainHeader } from '../components/common/MainHeader';
import { Hero } from '../components/AiSearch/Hero';
import { SearchBar } from '../components/AiSearch/SearchBar';

export default function AiSearch() {
  return (
    <React.Fragment>
      <MainHeader title="Hulu Media : Blogs" />
      <section className="w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] overflow-hidden px-0 lg:px-32">
        <div className="max-w-7xl mx-auto flex flex-col py-32 px-2 lg:!px-3">
          <Hero 
            title="Search AI Tools" 
            subtitle="Search AI tools for whatever your needs. Simply type in a function like 'music' or 'image editing'. We aim to build the most complete list of AI tools on the market. Stay tuned for more features!" 
          />
          <SearchBar />
        </div>
      </section>
    </React.Fragment>
  );
}
