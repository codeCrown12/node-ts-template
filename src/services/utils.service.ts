import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import database from '../database';
import * as bcrypt from 'bcryptjs';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import EmailService from './email.service';

export default class UtilsService {
  public dbService: PrismaClient = database.getClient();
  public emailService: EmailService = new EmailService();

  public generateRandomCode(length: number) {
    return crypto
      .randomBytes(length * 3)
      .toString('base64')
      .split('+')
      .join('')
      .split('/')
      .join('')
      .split('=')
      .join('')
      .substr(0, length);
  }

  public bcryptHash(password: string) {
    return bcrypt.hash(password, config.app.bcryptRounds);
  }

  public bcryptCompare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  public generateJwtToken(payload: Record<string, any>, expiresIn?: string) {
    const jwtPayload = {
      ...payload,
      counter: this.generateRandomCode(36),
    };
    const options = { expiresIn: expiresIn || '720h' };
    const token = jwt.sign(jwtPayload, config.app.secret, options);
    return token;
  }

  public decodeJwtToken(token: string): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.app.secret, (err: any, decoded: JwtPayload | undefined) => {
        if (err) {
          reject(err);
        }
        resolve(decoded as JwtPayload);
      });
    });
  }

  public sanitizeString(str: string) {
    return str.toLowerCase().trim().replace(/\s/g, '');
  }

  public capitalizeString(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
