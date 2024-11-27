import { Response } from 'express';

export interface ResponseParams {
  res: Response;
  message?: string;
  data?: Record<string, unknown>;
  statusCode?: number;
}

export const sendResponse = ({ res, data, message, statusCode = 200 }: ResponseParams) => {
  res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data
  });
};
