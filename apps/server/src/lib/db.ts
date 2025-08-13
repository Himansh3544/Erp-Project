import mongoose from 'mongoose';

export async function connectToDatabase(): Promise<void> {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/erp';
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  // eslint-disable-next-line no-console
  console.log('Connected to MongoDB');
}