import express from 'express';
import AuthController from '../../controllers/auth.controller';
import dtoValidationMiddleware from '../../middlewares/validation.middleware';
import {
  EmailOtpDto,
  LoginDto,
  ResetPasswordDto,
  SetPasswordDto,
  SetUsernameDto,
  VerifyEmailDto,
} from '../../dtos/auth.dto';
import authMiddleware from '../../middlewares/auth.middleware';

const router = express.Router();
const controller = new AuthController();

router.post(
  '/otp-email',
  dtoValidationMiddleware(EmailOtpDto, 'body'),
  controller.sendOtp,
);

router.post(
  '/verify-email',
  dtoValidationMiddleware(VerifyEmailDto, 'body'),
  controller.verifyEmail,
);

router.post(
  '/set-password',
  authMiddleware,
  dtoValidationMiddleware(SetPasswordDto, 'body'),
  controller.setPassword,
);

router.post(
  '/available/username',
  authMiddleware,
  dtoValidationMiddleware(SetUsernameDto, 'body'),
  controller.availableUsername,
);

router.post(
  '/username',
  authMiddleware,
  dtoValidationMiddleware(SetUsernameDto, 'body'),
  controller.setUsername,
);

router.post(
  '/login',
  dtoValidationMiddleware(LoginDto, 'body'),
  controller.login,
);

router.post(
  '/forgot-password',
  dtoValidationMiddleware(EmailOtpDto, 'body'),
  controller.forgotPassword,
);

router.post(
  '/reset-password',
  dtoValidationMiddleware(ResetPasswordDto, 'body'),
  controller.resetPassword,
);

router.post(
  '/request-email-verification',
  dtoValidationMiddleware(EmailOtpDto, 'body'),
  controller.requestEmailVerification
);

export default router;
