'use client';
import { assets, BlogDataType } from '@/app/assets/assets';
import Footer from '@/components/Footer';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type PageProps = {
  params: Promise<{
    [key: string]: string;
  }>;
};

const page: React.FC<PageProps> = ({ params }) => {
  const [blog, setBlog] = useState<BlogDataType | null>(null);
  const router = useRouter();
  const { id } = use(params);

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog?_id=${id}`);
      setBlog(data[0]);
    } catch (err) {
      toast.error('Could not retrieve blog');
      router.push('/');
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return blog ? (
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
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-bold max-w-[700px] mx-auto">
            {blog?.title}
          </h1>
          <img
            src={`/${blog.authorImg}`}
            width={60}
            height={60}
            className="mx-auto mt-6 border border-white rounded-full"
          />
          <span className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {blog.author}
          </span>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto -mt-24 mb-10">
        <img
          src={`/blog_pic_1.png`}
          width={1280}
          height={720}
          className="border-4 border-white"
          alt=""
        />
        <h1 className="my-8 text-[26px] font-bold">Introduction</h1>
        <p className="">{blog.description}</p>
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
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default page;
