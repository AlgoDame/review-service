import dotenv from 'dotenv';
dotenv.config();

export const ProdConfig = {
  database: {
    url: process.env.DB_URL
  }
};
