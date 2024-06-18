import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../interfaces';
import HttpException from '../lib/errors';
import UtilsService from '../services/utils.service';
import redis from '../redis';
import { StatusCodes } from 'http-status-codes';

const utils = new UtilsService();

export default async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authorization = req.header('authorization') || '';
  const token = authorization.split(' ')[1];
  if (!token) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, 'Authentication required');
  }

  const { userId, flag, counter } = await utils.decodeJwtToken(token);

  if (!userId) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, 'Invalid token');
  }

  if (flag !== 'AUTH') {
    throw new HttpException(StatusCodes.UNAUTHORIZED, 'Invalid token');
  }

  const user = await utils.dbService.user.findFirst({
    where: {
      id: userId,
    },
  });
  const session = await redis.get(`sessions:${userId as string}:${counter as string}`);
  if (!user || !session) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, 'Invalid token');
  }

  req.session = {
    user,
  };

  return next();
};
