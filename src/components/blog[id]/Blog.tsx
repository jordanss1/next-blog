'use client';
import { BlogDataType } from '@/app/assets/assets';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';
import { toast } from 'react-toastify';

type BlogProps = {
  blog: BlogDataType | null;
  error: string | null;
  children: ReactNode;
};

const Blog: React.FC<BlogProps> = ({ blog, error, children }) => {
  const router = useRouter();

  if (error) {
    toast.error('Could not retrieve blog');
    router.push('/');
  }

  return blog ? (
    <>
      <div className="text-center my-24">
        <h1 className="text-2xl sm:text-5xl font-bold max-w-[700px] mx-auto">
          {blog?.title}
        </h1>
        <img
          src={`/${blog?.authorImg}`}
          width={60}
          height={60}
          className="mx-auto mt-6 border border-white rounded-full"
        />
        <span className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
          {blog?.author}
        </span>
      </div>
      {children}
    </>
  ) : (
    <></>
  );
};

export default Blog;
