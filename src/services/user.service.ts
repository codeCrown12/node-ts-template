import _ from 'lodash';
import UtilsService from './utils.service';
import HttpException from '../utils/exception';
import { StatusCodes } from 'http-status-codes';
import { RequestPhoneNumberVerificationDto, UpdateProfileDto, VerifyPhoneNumberDto } from '../dtos/user.dto';
import config from '../config';
import redis from '../redis';

export default class UserService {
  private utils: UtilsService = new UtilsService();

  public async getProfile(userId: string) {
    const user = await this.utils.dbService.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'User not found');
    }

    return {
      ..._.omit(user, ['password']),
    };
  }

  public async updateProfile(userId: string, dto: UpdateProfileDto) {
    const existingUser = await this.utils.dbService.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'User not found');
    }

    if (dto.latitude && dto.longitude) {
      const point = `POINT(${dto.longitude} ${dto.latitude})`
      await this.utils.dbService.$queryRaw`UPDATE "User" SET location = ST_GeomFromText(${point}, 4326)
      WHERE id = ${userId}`
    }

    const user = await this.utils.dbService.user.update({
      where: {
        id: userId,
      },
      data: {
        ..._.omit(dto, ['userId']),
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : existingUser.dateOfBirth,
      },
    });

    return {
      ..._.omit(user, ['password']),
    };
  }

  public async requestPhoneNumberVerification(userId: string, dto: RequestPhoneNumberVerificationDto) {
    const user = await this.utils.dbService.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'User not found');
    }

    const code = config.app.isProduction ? _.random(10000, 99999).toString() : '12345';
    await redis.setex(`verification:phoneNumber:${dto.phoneNumber}`, 30 * 60, code);
    // const message = `Your Outinz confirmation code is ${code}. It expires in 30 minutes.`;
    // await termii(message, dto.phoneNumber);
  }

  public async verifyPhoneNumber(userId: string, dto: VerifyPhoneNumberDto) {
    const user = await this.utils.dbService.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'User not found');
    }

    const storedCode = await redis.get(`verification:phoneNumber:${dto.phoneNumber}`);
    if (!storedCode) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'Invalid phone number or verification code');
    }

    if (dto.otp !== storedCode) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'Invalid phone number or verification code');
    }

    await this.utils.dbService.user.update({
      where: {
        id: userId,
      },
      data: {
        phoneNumber: dto.phoneNumber,
        phoneNumberVerified: true,
      },
    });
  }
}
