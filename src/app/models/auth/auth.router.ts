import express from 'express';
import validationRequest from '../../middlewere/validationRequest';
import { AuthValidation } from './auth.zod.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewere/auth';

const router=express.Router();
router.post('/user-login',validationRequest(AuthValidation.loginValidationSchema),AuthController.loginUser);
router.post('/change-password',auth('admin','faculty','user'),validationRequest(AuthValidation.changePasswordValidationSchema),AuthController.changePassword)
router.post('/refresh-token',validationRequest(AuthValidation.requestTokenValidationSchema),AuthController.refreshToken)
export const AuthRouter=router;