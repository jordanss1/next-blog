import { BlogDataType } from '@/app/assets/assets';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BlogItem from './BlogItem';

type MenuType = 'all' | 'technology' | 'startup' | 'lifestyle';

const BlogList = () => {
  const [menu, setMenu] = useState<MenuType>('all');
  const [blogs, setBlogs] = useState<BlogDataType[] | null>(null);

  const getBlogs = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`/api/blog`);

      setBlogs(data);
    } catch (err) {
      toast.error('Could not retrieve user blogs');
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

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
          onClick={() => setMenu('all')}
          className={returnButtonClass('all')}
        >
          All
        </button>
        <button
          onClick={() => setMenu('technology')}
          className={returnButtonClass('technology')}
        >
          Technology
        </button>
        <button
          onClick={() => setMenu('startup')}
          className={returnButtonClass('startup')}
        >
          Startup
        </button>
        <button
          onClick={() => setMenu('lifestyle')}
          className={returnButtonClass('lifestyle')}
        >
          Lifestyle
        </button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blogs
          ?.filter(({ category }) =>
            menu === 'all' ? true : category === menu
          )
          .map((blog) => (
            <BlogItem key={blog._id} {...blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
