import dotenv from 'dotenv';
dotenv.config();

export const StagingConfig = {
  database: {
    url: process.env.DB_URL
  }
};
