import { Request, Response, NextFunction } from 'express';

const logRequests = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const { method, originalUrl } = request;
  const logLabel = `[${method.toUpperCase()}] ${originalUrl}`;
  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
};

export default logRequests;
