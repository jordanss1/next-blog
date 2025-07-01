import mongoose, { Schema } from 'mongoose';

export const ConnectDB = async () => {
  try {
    return await mongoose.connect(process.env.MONGODB_URI ?? '');
  } catch (err) {
    console.log(err);
  }
};
