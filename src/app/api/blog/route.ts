import { ConnectDB } from '@/lib/config/db';
import BlogModel, { BlogType } from '@/lib/models/BlogModel';
import fs, { writeFile } from 'fs/promises';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import writeToLog from '../utils/writeToLog';

export const GET = async (req: NextRequest) => {
  await ConnectDB();

  const _id = req.nextUrl.searchParams.get('_id');

  try {
    const query = _id ? { _id } : {};

    const blogs = await BlogModel.find<BlogType>(query);

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (err) {
    let logError = JSON.stringify(err);

    if (err instanceof Error) {
      logError = `${err.stack} ${err.message}`;
    }

    writeToLog(logError, true);

    return NextResponse.json(
      { error: 'Failed to find blogs' },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  await ConnectDB();

  const formData = await req.formData();
  const timeStamp = Date.now();

  const image = formData.get('image') as File;

  const imageBytes = await image?.arrayBuffer();
  const buffer = Buffer.from(imageBytes);
  const filePath = path.join(
    process.cwd(),
    `/public/${timeStamp}_${image.name}`
  );

  await writeFile(filePath, buffer);
  const imgUrl = `${timeStamp}_${image.name}`;

  const blogData: BlogType = {
    title: `${formData.get('title')}`,
    date: new Date(),
    description: `${formData.get('description')}`,
    category: `${formData.get('category')}`,
    author: `${formData.get('author')}`,
    image: imgUrl,
    authorImg: 'author_img.png',
  };

  try {
    await BlogModel.create(blogData);

    revalidateTag('blogs');

    return NextResponse.json({ success: true });
  } catch (err) {
    let logError = JSON.stringify(err);

    if (err instanceof Error) {
      logError = `${err.stack} ${err.message}`;
    }

    writeToLog(logError, true);

    return NextResponse.json({ error: 'Failed to save blog' }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  await ConnectDB();

  const _id = req.nextUrl.searchParams.get('_id');

  if (!_id) {
    return NextResponse.json(
      { error: 'Request must include blog ID' },
      { status: 400 }
    );
  }

  try {
    const blog = await BlogModel.findById<BlogType>({ _id });

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found by id' },
        { status: 404 }
      );
    }

    const filePath = path.join('./public', blog.image);

    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
    } catch (fileErr: any) {
      console.error('Error deleting image file, file may not exist');
    }

    const deleted = await BlogModel.findByIdAndDelete(_id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Blog not found or already deleted' },
        {
          status: 404,
        }
      );
    }

    revalidateTag('blogs');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    let logError = JSON.stringify(err);

    if (err instanceof Error) {
      logError = `${err.stack} ${err.message}`;
    }

    writeToLog(logError, true);

    return NextResponse.json(
      { error: 'Failed to delete blog - error' },
      { status: 500 }
    );
  }
};
