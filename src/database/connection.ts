import mongoose from 'mongoose';
import config from '.././config/index';
import { Logger } from '../utils/customLogger.util';

const connectDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(config.database.url);
    Logger.info(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    Logger.error('Error connecting to MongoDB:', error);
    throw error;
  }
};
export default connectDB;
