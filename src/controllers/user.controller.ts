import { Response } from 'express';
import UserService from '../services/user.service';
import { StatusCodes } from 'http-status-codes';
import { AuthenticatedRequest } from '../interfaces';

export default class UserController {
  private readonly service: UserService = new UserService();

  public getProfile = async (request: AuthenticatedRequest, response: Response) => {
    const res = await this.service.getProfile(request.session.user.id);
    response.status(StatusCodes.OK).send({
      error: false,
      message: 'Profile fetched successful',
      data: res,
    });
  };

  public updateProfile = async (request: AuthenticatedRequest, response: Response) => {
    const res = await this.service.updateProfile(request.session.user.id, request.body);
    response.status(StatusCodes.OK).send({
      error: false,
      message: 'Profile fetched successful',
      data: res,
    });
  };

  public requestPhoneNumberVerification = async (request: AuthenticatedRequest, response: Response) => {
    const res = await this.service.requestPhoneNumberVerification(request.session.user.id, request.body);
    response.status(StatusCodes.OK).send({
      error: false,
      message: 'OTP sent successfully',
      data: res,
    });
  };

  public verifyPhoneNumber = async (request: AuthenticatedRequest, response: Response) => {
    const res = await this.service.verifyPhoneNumber(request.session.user.id, request.body);
    response.status(StatusCodes.OK).send({
      error: false,
      message: 'Phone number verified successfully',
      data: res,
    });
  };
}
