import { assets, BlogDataType } from '@/app/assets/assets';
import { BlogsResponse } from '@/app/page';
import Blog from '@/components/blog[id]/Blog';
import Footer from '@/components/Footer';
import Link from 'next/link';
import React from 'react';

type PageProps = {
  params: Promise<{
    [key: string]: string;
  }>;
};

const page: React.FC<PageProps> = async ({ params }) => {
  let error: string | null = null;
  let blog: BlogDataType | null = null;

  const { id } = await params;

  const res = await fetch(`http://web1:3000/api/blog?_id=${id}`, {
    next: { tags: ['blogs'] } as any,
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));

    error = errData.error || 'Failed to fetch blog data';
  } else {
    const data = (await res.json()) as BlogsResponse;

    if ('error' in data) {
      error = data.error;
    } else {
      blog = data.blogs[0];
    }
  }

  const blogContent = (
    <div className="mx-5 max-w-[800px] md:mx-auto -mt-24 mb-10">
      <img
        src={`/blog_pic_1.png`}
        width={1280}
        height={720}
        className="border-4 border-white"
        alt=""
      />
      <h1 className="my-8 text-[26px] font-bold">Introduction</h1>
      <p className="">{blog?.description}</p>
      <h3 className="my-5 text-[18px] font-bold">Some Text</h3>
      <p className="my-3">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
        accusantium unde mollitia a voluptate laboriosam asperiores iusto quod
        molestias delectus dolorum, consectetur dolores provident, quae
        consequatur debitis corrupti odit voluptas.
      </p>
      <p className="my-3">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
        accusantium unde mollitia a voluptate laboriosam asperiores iusto quod
        molestias delectus dolorum, consectetur dolores provident, quae
        consequatur debitis corrupti odit voluptas.
      </p>
      <h3 className="my-5 text-[18px] font-bold">Some Text</h3>
      <p className="my-3">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
        accusantium unde mollitia a voluptate laboriosam asperiores iusto quod
        molestias delectus dolorum, consectetur dolores provident, quae
        consequatur debitis corrupti odit voluptas.
      </p>
      <p className="my-3">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
        accusantium unde mollitia a voluptate laboriosam asperiores iusto quod
        molestias delectus dolorum, consectetur dolores provident, quae
        consequatur debitis corrupti odit voluptas.
      </p>
      <h3 className="my-5 text-[18px] font-bold">Conclusion</h3>
      <p className="my-3">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
        accusantium unde mollitia a voluptate laboriosam asperiores iusto quod
        molestias delectus dolorum, consectetur dolores provident, quae
        consequatur debitis corrupti odit voluptas.
      </p>
      <div className="my-14">
        <p className="text-black font-bold my-4">Share this article</p>
        <div className="flex *:cursor-pointer">
          <img src={assets.facebook_icon.src} width={40} alt="" />
          <img src={assets.twitter_icon.src} width={40} alt="" />
          <img src={assets.googleplus_icon.src} width={40} alt="" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center ">
          <Link href={'/'}>
            <img
              src={assets.logo.src}
              width={180}
              alt=""
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-bold py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_black]">
            Get Started <img src={assets.arrow.src} alt="" />
          </button>
        </div>
        <Blog blog={blog ?? null} error={error}>
          {blogContent}
        </Blog>
      </div>
      <Footer />
    </>
  );
};

export default page;
