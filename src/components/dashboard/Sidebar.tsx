import { assets } from '@/app/assets/assets';
import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-slate-100">
      <Link
        href="/"
        className="px-2 sm:pl-14 py-3 border-b-transparent border border-t-0 border-black"
      >
        <img src={assets.logo.src} width={120} alt="" />
      </Link>
      <div className="w-28 sm:w-80 h-screen relative py-12 border border-black">
        <div className="w-1/2 sm:w-[80%] absolute right-0">
          <Link
            href="/dashboard/add_blog"
            className="flex items-center border border-black border-r-0 gap-3 font-semibold px-3 py-2 bg-white shadow-[-5px_5px_0px_black]"
          >
            <img src={assets.add_icon.src} width={28} alt="" />
            <span>Add blog</span>
          </Link>
          <Link
            href="/dashboard/blog_list"
            className="mt-5 flex items-center border border-black border-r-0 gap-3 font-semibold px-3 py-2 bg-white shadow-[-5px_5px_0px_black]"
          >
            <img src={assets.blog_icon.src} width={28} alt="" />
            <span>Blog list</span>
          </Link>
          <Link
            href="/dashboard/subscriptions"
            className="mt-5 flex items-center border border-black border-r-0 gap-3 font-semibold px-3 py-2 bg-white shadow-[-5px_5px_0px_black]"
          >
            <img src={assets.email_icon.src} width={28} alt="" />
            <span>Subscriptions</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
