import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

export default async function connectDB(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('The MONGODB_URI environment variable is not defined.');
    }
    
    await mongoose.connect(mongoURI);

    res.status(200).json({ message: 'Connected to MongoDB' });
  } catch (error: unknown) {
    // We check if the error has a message property and if it is a string.
    // If so, we can assume it's an Error object.
    if (error instanceof Error) {
      console.error('MongoDB connection error', error);
      res.status(500).json({ message: 'Failed to connect to MongoDB', error: error.message });
    } else {
      // If the caught error is not an instance of Error, we handle it more generically.
      console.error('An unexpected error occurred', error);
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
}
