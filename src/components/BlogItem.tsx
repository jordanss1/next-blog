import Link from 'next/link';
import React from 'react';
import { assets, BlogDataType } from '../app/assets/assets';

const BlogItem: React.FC<BlogDataType> = ({
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

export default BlogItem;
