'use client';
import { BlogDataType } from '@/app/assets/assets';
import BlogItem from '@/components/BlogItem';
import BlogTableItem from '@/components/dashboard/BlogTableItem';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const page = () => {
  const [blogs, setBlogs] = useState<BlogDataType[] | null>(null);

  const getBlogs = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`/api/blog`);

      console.log(data);

      setBlogs(data);
    } catch (err) {
      toast.error('Could not retrieve blogs');
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-13">
      <h1 className="text-2xl font-bold">Blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-gray-500 ">
          <thead className="text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Author name
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs?.map((blog) => (
              <BlogTableItem key={blog._id} {...blog} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
