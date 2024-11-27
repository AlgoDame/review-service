import dotenv from 'dotenv';
dotenv.config();

export const DevConfig = {
  database: {
    url: process.env.DB_URL
  }
};