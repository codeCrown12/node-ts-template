import express from 'express';
import UserController from '../../controllers/user.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import dtoValidationMiddleware from '../../middlewares/validation.middleware';
import { RequestPhoneNumberVerificationDto, UpdateProfileDto, VerifyPhoneNumberDto } from '../../dtos/user.dto';

const router = express.Router();
const controller = new UserController();

router.get('/', authMiddleware, controller.getProfile);

router.put(
  '/update',
  authMiddleware,
  dtoValidationMiddleware(UpdateProfileDto, 'body'),
  controller.updateProfile,
);

router.post(
  '/request-phone-number-verification',
  authMiddleware,
  dtoValidationMiddleware(RequestPhoneNumberVerificationDto, 'body'),
  controller.requestPhoneNumberVerification,
);

router.post(
  '/verify-phone-number',
  authMiddleware,
  dtoValidationMiddleware(VerifyPhoneNumberDto, 'body'),
  controller.verifyPhoneNumber,
);

export default router;
