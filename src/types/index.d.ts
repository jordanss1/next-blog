export type EmailType = {
  _id: string;
  email: string;
  date: Date;
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

export type KeyFor<T> = T extends EmailType[]
  ? 'emails'
  : T extends BlogDataType[]
  ? 'blogs'
  : never;

export type FetchResponse<T> =
  | {
      [key in KeyFor<T>]: T;
    }
  | { error: string };
