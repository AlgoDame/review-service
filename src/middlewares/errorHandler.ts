import { NextFunction, Request, Response } from 'express';

export interface IError extends Error {
  status?: number;
}
export class ErrorHandler {
  public static notFoundHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
  }

  public static handleError(
    error: IError,
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const statusCode = error.status || 500;
    res.status(statusCode);
    res.json({
      success: false,
      message: error.message,
    });
  }
}
