'use client';
import { assets, BlogDataType } from '@/app/assets/assets';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type MenuType = 'all' | 'technology' | 'startup' | 'lifestyle';

type HomeBlogListProps = {
  blogs: BlogDataType[] | null;
  error: string | null;
};

const HomeBlogList: React.FC<HomeBlogListProps> = ({ blogs, error }) => {
  const [menu, setMenu] = useState<MenuType>('all');

  const returnButtonClass = (clickedMenu: MenuType) =>
    `transition-all duration-200 py-1 px-4 rounded-sm ${
      clickedMenu === menu
        ? 'text-white bg-black cursor-normal'
        : 'text-black cursor-pointer'
    }`;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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
        {blogs ? (
          blogs
            .filter(({ category }) =>
              menu === 'all' ? true : category === menu
            )
            .map((blog) => <HomeBlogItem key={blog._id} {...blog} />)
        ) : (
          <p>No blogs found</p>
        )}
      </div>
    </div>
  );
};

const HomeBlogItem: React.FC<BlogDataType> = ({
  title,
  description,
  image,
  category,
  _id,
}) => {
  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0_black]">
      <Link href={`/blogs/${_id}`} target="_blank">
        <img
          alt=""
          src={`/blog_pic_1.png`}
          width={400}
          height={400}
          className="border-b border-black"
        />
        <p className="ml-5 mt-5 px-1 inline-block bg-black text-white">
          {category.slice(0, 1).toUpperCase() +
            category.slice(1, category.length)}
        </p>
        <div className="p-5">
          <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900">
            {title}
          </h5>
          <p className="mb-3 tracking-tight text-gray-700">{description}</p>
          <div className="inline-flex items-center py-2 font-bold text-center cursor-pointer">
            Read more{' '}
            <img src={assets.arrow.src} width={12} className="ml-2" alt="" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomeBlogList;
