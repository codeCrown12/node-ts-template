import { Request } from 'express';
import { User } from '@prisma/client';

interface Session {
  user: User;
  [key: string]: any;
}

export interface AuthenticatedRequest extends Request {
  session: Session;
}

export interface QueryFilter {
  take?: number;
  where?: any;
  cursor?: any;
  skip?: number;
  orderBy?: any;
  include?: any;
}
