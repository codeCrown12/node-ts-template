import { NextFunction, Request, Response } from 'express';
import HttpException from '../lib/errors';
import { logger } from '../lib/logger';
import * as requestIp from 'request-ip';

const errorMiddleWare = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  const status: number = error.status || 500;
  const message: string = error.message || 'Something went wrong';

  logger.error(
    `[Error]: Request Ip: ${requestIp.getClientIp(req)}}, Path: ${req.path}, Method: ${req.method}, Status: ${status}, Message: ${message}`
  );

  res.status(status).json({ error: true, message });
};

export default errorMiddleWare;
