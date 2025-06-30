import React from 'react';
import { assets } from '../app/assets/assets';

const Footer = () => {
  return (
    <div className="flex justify-between  px-2 md:px-12 lg:px-28  flex-col gap-2 sm:gap-0 gap-y-6 sm:flex-row bg-black py-5 items-center">
      <img src={assets.logo_light.src} alt="" width={120} className="" />
      <p className="text-white text-center">
        All rights reserved. Copyright @blogger
      </p>
      <div className="flex *:cursor-pointer">
        <img src={assets.facebook_icon.src} width={40} alt="" />
        <img src={assets.twitter_icon.src} width={40} alt="" />
        <img src={assets.googleplus_icon.src} width={40} alt="" />
      </div>
    </div>
  );
};

export default Footer;
