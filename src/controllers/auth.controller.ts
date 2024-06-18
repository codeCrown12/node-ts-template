import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { StatusCodes } from 'http-status-codes';
import { AuthenticatedRequest } from '../interfaces';

export default class AuthController {
  private readonly service: AuthService = new AuthService();

  public sendOtp = async (request: Request, response: Response) => {
    const res = await this.service.sendOtp(request.body);
    response.status(StatusCodes.OK).send({
      error: false,
      message: 'Sent successful',
      data: res,
    });
  };

  public verifyEmail = async (request: Request, response: Response) => {
    const res = await this.service.verifyEmail(request.body);
    response.status(StatusCodes.OK).send({
      error: false,
      message: 'Email verified successfully',
      data: res,
    });
  };

  public setPassword = async (request: AuthenticatedRequest, response: Response) => {
    const res = await this.service.setPassword(request.session.user.id, request.body);
    response.status(StatusCodes.OK).send({
      error: false,
      message: 'Password set',
      data: res,
    });
  };

  public availableUsername = async (request: AuthenticatedRequest, response: Response) => {
    const res = await this.service.availableUsername(request.session.user.id, request.body);
    response.status(StatusCodes.OK).send({
      error: false,
      message: 'Available',
      data: res,
    });
  };

  public setUsername = async (request: AuthenticatedRequest, response: Response) => {
    const res = await this.service.setUsername(request.session.user.id, request.body);
    response.status(StatusCodes.OK).send({
      error: false,
      message: 'Username set',
      data: res,
    });
  };

  public login = async (request: Request, response: Response) => {
    const res = await this.service.login(request.body);
    response.status(StatusCodes.OK).send({
      error: false,
      message: 'Login successful',
      data: res,
    });
  };

  public forgotPassword = async (request: Request, response: Response) => {
    const res = await this.service.forgotPassword(request.body);
    response.status(StatusCodes.OK).send({
      error: false,
      message: 'Password reset OTP sent successful',
      data: res,
    });
  };

  public resetPassword = async (request: Request, response: Response) => {
    const res = await this.service.resetPassword(request.body);
    response.status(StatusCodes.OK).send({
      error: false,
      message: 'Password reset successful',
      data: res,
    });
  };

  public requestEmailVerification = async (request: Request, response: Response) => {
    const res = await this.service.requestEmailVerification(request.body);
    response.status(StatusCodes.OK).send({
      error: false,
      message: 'OTP sent successful',
      data: res,
    });
  };
}
