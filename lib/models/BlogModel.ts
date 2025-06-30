import mongoose, { InferSchemaType } from 'mongoose';

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  authorImg: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const BlogModel = mongoose.models.BlogModel || mongoose.model('blog', Schema);

export type BlogModelType = InferSchemaType<typeof Schema>;

export default BlogModel;
