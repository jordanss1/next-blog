'use client';
import { BlogDataType } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type DashBlogListProps = {
  data: BlogDataType[] | null;
  error: null | string;
};

const DashBlogList: React.FC<DashBlogListProps> = ({ data, error }) => {
  const [blogs, setBlogs] = useState<BlogDataType[] | null>(data);

  const handleDeleteBlog = async (_id: BlogDataType['_id']) => {
    try {
      const { status } = await axios.delete(
        `/api/blog?_id=${encodeURIComponent(_id)}`
      );

      if (status === 200) {
        toast.success('Blog deleted');
        setBlogs(blogs?.filter((blog) => blog._id !== _id) ?? null);
      } else {
        toast.error('Blog not deleted');
      }
    } catch (err) {
      toast.error('Blog not deleted');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      {blogs ? (
        blogs
          .sort(
            (blogA, blogB) =>
              new Date(blogB.date).getTime() - new Date(blogA.date).getTime()
          )
          .map((blog) => (
            <BlogTableItem
              key={blog._id}
              handleDeleteBlog={handleDeleteBlog}
              {...blog}
            />
          ))
      ) : (
        <tr className="">
          <td colSpan={4} className="text-center font-semibold">
            No blogs found
          </td>
        </tr>
      )}
    </>
  );
};

type BlogTableItemProps = {
  handleDeleteBlog: (_id: BlogDataType['_id']) => Promise<void>;
} & BlogDataType;

const BlogTableItem: React.FC<BlogTableItemProps> = ({
  authorImg,
  title,
  date,
  author,
  _id,
  handleDeleteBlog,
}) => {
  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="items-center sm:flex px-6 py-4 font-semibold gap-3 hidden text-gray-900 whitespace-nowrap"
      >
        <img src={`/${authorImg}`} width={40} alt="" />
        <p>{author}</p>
      </th>
      <td className="px-6 py-4">{title}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {new Date(date).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </td>
      <td
        onClick={async () => await handleDeleteBlog(_id)}
        className="px-6 py-4 cursor-pointer"
      >
        x
      </td>
    </tr>
  );
};

export default DashBlogList;
