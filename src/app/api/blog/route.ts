import { ConnectDB } from '@/lib/config/db';
import BlogModel, { BlogType } from '@/lib/models/BlogModel';
import { writeFile } from 'fs/promises';
import { StaticImageData } from 'next/image';
import { NextRequest, NextResponse } from 'next/server';
import writeToLog from '../utils/writeToLog';
import path from 'path';

export const LoadDB = async () => {
  await ConnectDB();
};

export const GET = async (req: NextRequest) => {
  await LoadDB();

  return NextResponse.json({ msg: 'API working' });
};

export const POST = async (req: NextRequest) => {
  await LoadDB();

  const formData = await req.formData();
  const timeStamp = Date.now();

  const image = formData.get('image') as File;

  const imageBytes = await image?.arrayBuffer();
  const buffer = Buffer.from(imageBytes);
  const filePath = path.join(process.cwd(), `/public/${timeStamp}_${image.name}`)

  await writeFile(filePath, buffer);
  const imgUrl = `${timeStamp}_${image.name}`;

  const blogData: BlogType = {
    title: `${formData.get('title')}`,
    date: new Date(),
    description: `${formData.get('description')}`,
    category: `${formData.get('category')}`,
    author: `${formData.get('author')}`,
    image: imgUrl,
    authorImg: `${formData.get('authorImg')}`,
  };

  try {
    await BlogModel.create(blogData);
  } catch (err) {
    let logError = JSON.stringify(err);

    if (err instanceof Error) {
      logError = `${err.stack} ${err.message}`;
    }

    writeToLog(logError, true);

    return NextResponse.json('Failed to save blog', { status: 500 });
  }

  return NextResponse.json('Blog added');
};
