import { Response } from 'express';

export const successResponse = (
  res: Response,
  code: number = 200,
  data?: any,
) => res.status(code).json({ status: 1, data });

export const errorResponse = (
  res: Response,
  code: number = 200,
  message?: string,
  errors?: any,
) => res.status(code).json({ status: 0, message, errors });
