import React, { useState } from 'react';
import { blog_data } from '../app/assets/assets';
import BlogItem from './BlogItem';

type MenuType = 'All' | 'Technology' | 'Startup' | 'Lifestyle';

const BlogList = () => {
  const [menu, setMenu] = useState<MenuType>('All');

  const returnButtonClass = (clickedMenu: MenuType) =>
    `transition-all duration-200 py-1 px-4 rounded-sm ${
      clickedMenu === menu
        ? 'text-white bg-black cursor-normal'
        : 'text-black cursor-pointer'
    }`;

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu('All')}
          className={returnButtonClass('All')}
        >
          All
        </button>
        <button
          onClick={() => setMenu('Technology')}
          className={returnButtonClass('Technology')}
        >
          Technology
        </button>
        <button
          onClick={() => setMenu('Startup')}
          className={returnButtonClass('Startup')}
        >
          Startup
        </button>
        <button
          onClick={() => setMenu('Lifestyle')}
          className={returnButtonClass('Lifestyle')}
        >
          Lifestyle
        </button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blog_data
          .filter(({ category }) => (menu === 'All' ? true : category === menu))
          .map((blog) => (
            <BlogItem key={blog.id} {...blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
