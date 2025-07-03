import { BlogDataType } from '@/app/assets/assets';
import React from 'react';

const BlogTableItem: React.FC<BlogDataType> = ({
  authorImg,
  title,
  date,
  author,
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
      <td className="px-6 py-4 cursor-pointer">x</td>
    </tr>
  );
};

export default BlogTableItem;
