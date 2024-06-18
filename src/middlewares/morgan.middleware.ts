import morgan, { StreamOptions } from 'morgan';
import { logger } from '../lib/logger';
import config from '../config';

const stream: StreamOptions = {
  write: (message: string) => logger.http(message.substring(0, message.lastIndexOf('\n'))),
};

const skip = () => {
  return config.env.isProduction;
};

const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', { stream, skip });

export default morganMiddleware;
