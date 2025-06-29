import React from 'react';
import { assets } from '../../public/assets';

const Header: React.FC = () => {
  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <img
          src={assets.logo.src}
          width={180}
          alt=""
          className="w-[130px] sm:w-auto"
        />
        <button className="flex items-center gap-2 font-semibold py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_black]">
          Get Started <img src={assets.arrow.src} alt="" />
        </button>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-semibold">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto   text-sm sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
          accusamus rem voluptates ad ex minus blanditiis quasi. Molestiae
          quisquam nemo rerum. Praesentium recusandae ullam sunt rerum quae ut
          incidunt alias.{' '}
        </p>
        <form
          action=""
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_black]"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="pl-4 outline-none"
            name=""
            id=""
          />
          <button
            type="submit"
            className="border-l cursor-pointer border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
