import env from 'dotenv';

env.config({
  path: process.env.ENV_FILE_PATH,
});

export enum AppEnvironmentEnum {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

type Config = {
  env: {
    isProduction: boolean;
    isDevelopment: boolean;
  };
  app: {
    env: AppEnvironmentEnum;
    isProduction: boolean;
    secret: string;
    bcryptRounds: number;
    port: number;
    email: string;
    frontEndUrl: string;
    logDir: string;
  };
  redis: {
    mode: string; // 'standalone' | 'cluster';
    host: string;
    port: number;
    password: string;
  };
  termii: {
    apiUrl: string;
    apiKey: string;
  };
  mail: {
    host: string;
    port: string;
    name: string;
    username: string;
    password: string;
  };
};

const config: Config = {
  env: {
    isProduction: process.env.NODE_ENV === AppEnvironmentEnum.PRODUCTION,
    isDevelopment: process.env.NODE_ENV === AppEnvironmentEnum.DEVELOPMENT,
  },
  app: {
    env: process.env.APP_ENV as AppEnvironmentEnum,
    isProduction: process.env.APP_ENV === AppEnvironmentEnum.PRODUCTION,
    secret: process.env.APP_SECRET!,
    bcryptRounds: 10,
    port: +process.env.PORT!,
    email: process.env.APP_EMAIL!,
    frontEndUrl: process.env.APP_FRONTEND_URL!,
    logDir: process.env.LOG_DIR!,
  },
  redis: {
    mode: process.env.REDIS_MODE! || 'standalone',
    host: process.env.REDIS_HOST!,
    port: +process.env.REDIS_PORT!,
    password: process.env.REDIS_PASSWORD!,
  },
  termii: {
    apiUrl: process.env.TERMII_API_URL!,
    apiKey: process.env.TERMII_API_KEY!,
  },
  mail: {
    host: process.env.MAIL_HOST!,
    port: process.env.MAIL_PORT!,
    name: process.env.MAIL_NAME!,
    username: process.env.MAIL_USERNAME!,
    password: process.env.MAIL_PASSWORD!,
  },
};

const validateConfig = () => {
  const missingKeys: string[] = [];
  Object.entries(config).forEach(([baseKey, baseValue]) => {
    Object.entries(baseValue).forEach(([key, value]) => {
      if (value === '' || value === undefined) {
        missingKeys.push(`${baseKey}.${key}`);
      }
    });
  });
  if (missingKeys.length) {
    global.console.warn(`The following configuration keys are not set: ${missingKeys.join(', ')}`);
    // process.exit(1);
  }
};

validateConfig();

export default config;
