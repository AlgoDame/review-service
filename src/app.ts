import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { ErrorHandler } from './middlewares/errorHandler';
import connectDB from './database/connection';
import { Logger } from './utils/customLogger.util';
import config from './config/index';
import { loadRoutes } from './routes';

dotenv.config();

const app: Application = express();
const port = config.port;
const API_PREFIX = '/api/v1';

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    data: {
      message: 'API is now live!!! 🚀🚀🚀'
    }
  });
});

app.use(API_PREFIX, loadRoutes(app));

app.use(ErrorHandler.notFoundHandler);
app.use(ErrorHandler.handleError);

const start = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(port, () => {
      Logger.log(`::: 🖥  Server is listening on port ${port} 🔥 :::`);
    });
  } catch (error) {
    Logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

void start();
