import { StaticImageData } from 'next/image';
import add_icon from './add_icon.png';
import arrow from './arrow.png';
import blog_icon from './blog_icon.png';
import blog_pic_1 from './blog_pic_1.png';
import blog_pic_10 from './blog_pic_10.png';
import blog_pic_11 from './blog_pic_11.png';
import blog_pic_12 from './blog_pic_12.png';
import blog_pic_13 from './blog_pic_13.png';
import blog_pic_14 from './blog_pic_14.png';
import blog_pic_15 from './blog_pic_15.png';
import blog_pic_16 from './blog_pic_16.png';
import blog_pic_2 from './blog_pic_2.png';
import blog_pic_3 from './blog_pic_3.png';
import blog_pic_4 from './blog_pic_4.png';
import blog_pic_5 from './blog_pic_5.png';
import blog_pic_6 from './blog_pic_6.png';
import blog_pic_7 from './blog_pic_7.png';
import blog_pic_8 from './blog_pic_8.png';
import blog_pic_9 from './blog_pic_9.png';
import email_icon from './email_icon.png';
import facebook_icon from './facebook_icon.png';
import googleplus_icon from './googleplus_icon.png';
import logo from './logo.png';
import logo_light from './logo_light.png';
import profile_icon from './profile_icon.png';
import twitter_icon from './twitter_icon.png';
import upload_area from './upload_area.png';

export const assets = {
  facebook_icon,
  googleplus_icon,
  twitter_icon,
  profile_icon,
  logo,
  arrow,
  logo_light,
  blog_icon,
  add_icon,
  email_icon,
  upload_area,
};

export type BlogDataType = {
  _id: number;
  title: string;
  description: string;
  image: string;
  date: number;
  category: string;
  author: string;
  authorImg: string;
};
