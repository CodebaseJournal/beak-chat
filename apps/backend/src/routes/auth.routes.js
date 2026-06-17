import {Router} from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { SignInSchema, SignUpSchema } from '@beak-chat/shared';

export const authRouter = Router()

// Sign in
authRouter.post('/sign-in',validate(SignInSchema), signIn)

// Sign up
authRouter.post('/sign-up',validate(SignUpSchema) ,signUp)

//Sign-out
authRouter.post('/sign-out',signOut)