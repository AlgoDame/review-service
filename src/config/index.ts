import dotenv from 'dotenv';
import { DevConfig } from './development.config';
import { StagingConfig } from './staging.config';
import { ProdConfig } from './production.config';

dotenv.config();

let envConfig: Record<string, any> = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000
};

switch (process.env.NODE_ENV) {
  case 'development':
    envConfig = { ...envConfig, ...DevConfig };
    break;
  case 'staging':
    envConfig = { ...envConfig, ...StagingConfig };
    break;
  case 'production':
    envConfig = { ...envConfig, ...ProdConfig };
    break;
  default:
    envConfig = { ...envConfig, ...DevConfig };
    break;
}

export default envConfig;
