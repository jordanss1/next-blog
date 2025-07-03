'use client';
import { assets } from '@/app/assets/assets';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useActionState, useState } from 'react';
import { toast } from 'react-toastify';

type FormState = {
  image: File | null;
  description: string | null;
  title: string | null;
  author: string;
  authorImg: string | null;
  category: 'startup' | 'technology' | 'lifestyle';
};

const initState: FormState = {
  image: null,
  description: null,
  title: null,
  author: 'Alex Bennett',
  authorImg: 'author_img.png',
  category: 'startup' as FormState['category'],
};

const page = () => {
  const router = useRouter();
  const [state, actionFunction, isPending] = useActionState<FormState>(
    updateFormState as (state: FormState) => FormState | Promise<FormState>,
    initState
  );

  const [previewImage, setPreviewImage] = useState<File | null>(null);

  async function updateFormState(
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> {
    try {
      const author = 'Alex Bennett';
      const image = formData.get('image') as File;
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;
      const category = formData.get('category') as FormState['category'];

      formData.append('author', author);

      await axios.post('/api/blog', formData);

      toast.success('Blog added');

      setTimeout(() => router.push('/dashboard/blog_list'), 1000);

      setPreviewImage(null);

      return {
        ...prevState,
        image,
        title,
        description,
        category,
        author,
        authorImg: 'author_img.png',
      };
    } catch (err) {
      toast.error('Blog not added - try again');

      setPreviewImage(null);
      return { ...prevState };
    }
  }

  return (
    <form action={actionFunction} className="pt-5 px-5 sm:pt-12 sm:pl-13">
      <h3 className="font-bold text-2xl mb-4">Create blog</h3>
      <p className="text-xl font-semibold">Upload thumbnail</p>
      <label htmlFor="image" className="cursor-pointer">
        <img
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : assets.upload_area.src
          }
          width={140}
          height={70}
          className="mt-4"
          alt=""
        />
      </label>
      <input
        type="file"
        onChange={({ target }) => {
          const image = target.files?.[0];
          if (image) setPreviewImage(image);
        }}
        name="image"
        id="image"
        hidden
        required
      />
      <p className="text-xl mt-4 font-semibold">Title</p>
      <input
        type="text"
        required
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        name="title"
        id=""
      />
      <textarea
        required
        className="w-full block mt-8 sm:w-[500px] px-4 py-3 border"
        name="description"
        id=""
        rows={8}
      />
      <p className="text-xl mt-4 font-semibold">Category</p>
      <select
        name="category"
        required
        className="w-40 mt-4 px-4 py-3 text-gray-500 outline outline-black font-semibold"
        id=""
      >
        <option value="startup">Startup</option>
        <option value="technology">Technology</option>
        <option value="lifestyle">Lifestyle</option>
      </select>
      <input type="text" />
      <br />
      <button
        type="submit"
        className="mt-8 w-40 cursor-pointer h-12 bg-black text-white"
      >
        Create
      </button>
    </form>
  );
};

export default page;
