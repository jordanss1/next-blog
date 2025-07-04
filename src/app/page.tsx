import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HomeBlogList from '@/components/HomeBlogList';
import { BlogDataType, FetchResponse } from '@/types';

export default async function Home() {
  let error: string | null = null;
  let blogs: BlogDataType[] | null = null;

  const res = await fetch('http://web1:3000/api/blog', {
    next: { tags: ['blogs'] } as any,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    error = data.error ?? 'Could not fetch blogs';
  } else {
    const data = (await res.json()) as FetchResponse<BlogDataType[]>;

    if ('error' in data) {
      error = data.error;
    } else {
      blogs = data.blogs;
    }
  }

  return (
    <>
      <Header />
      <HomeBlogList blogs={blogs} error={error} />
      <Footer />
    </>
  );
}
