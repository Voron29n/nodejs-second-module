import { NextFunction, Request, Response } from 'express';

const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware Error Handling');
  const errStatus = err.statusCode || 400;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
};

export default ErrorHandler;
