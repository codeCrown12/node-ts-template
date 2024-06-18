import 'reflect-metadata';
import cors from 'cors';
import 'express-async-errors';
import express, { Application, Request } from 'express';
import config from './config';
import morganMiddleware from './middlewares/morgan.middleware';
import { logger } from './lib/logger';
import errorMiddleWare from './middlewares/error.middleware';
import { Server } from 'http';
import database from './database';
import redis from './redis';
import router from './routes';

export default class App {
  public app: Application;
  public port: string | number;
  public database: typeof database;

  constructor() {
    this.app = express();
    this.port = config.app.port || 3000;
    this.database = database;
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeDatabase();
    this.initializeRedis();
    this.initializeErrorHandling();
  }

  public listen(): Server {
    return this.app.listen(config.app.port, () => {
      logger.info(`⚡️[server]: Server is running @ http://localhost:${config.app.port}`);
    });
  }

  private initializeMiddlewares(): void {
    this.app.set('trust proxy', true);
    this.app.use(express.json());
    this.app.use(
      cors<Request>({
        origin: [config.app.frontEndUrl],
      })
    );
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morganMiddleware);
  }

  private initializeRoutes(): void {
    this.app.use(router);
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await this.database.connect();
      logger.info(`🛢️ [Database]: Database connected`);
    } catch (error) {
      logger.error(`🛢️ [Database]: Database connection failed >>> ERROR: ${error}`);
    }
  }

  private async initializeRedis(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      redis.on('connect', () => {
        logger.info('🛢️ [Redis]: Connected to redis server');
        resolve(true);
      });
      redis.on('error', (error) => {
        logger.error('error connecting to redis', {
          error,
        });
        reject(error);
      });
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleWare);
  }
}
