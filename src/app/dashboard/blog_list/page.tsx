import DashBlogList from '@/components/dashboard/DashBlogList';
import { BlogDataType, FetchResponse } from '@/types';
import React from 'react';

const page = async () => {
  let error: null | string = null;
  let blogs: BlogDataType[] | null = null;

  const res = await fetch('http://web1:3000/api/blog', {
    next: { tags: ['blogs'] } as any,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    error = data.error || 'Could not fetch blogs';
  } else {
    const data = (await res.json()) as FetchResponse<BlogDataType[]>;

    if ('error' in data) {
      error = data.error;
    } else {
      blogs = data.blogs;
    }
  }

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
            <DashBlogList data={blogs} error={error} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
