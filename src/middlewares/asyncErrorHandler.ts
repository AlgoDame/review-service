import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/customLogger.util';

export default function catchAsyncErrors(handler: RequestHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (ex) {
      Logger.error('error ~ ', ex);
      next(ex);
    }
  };
}
