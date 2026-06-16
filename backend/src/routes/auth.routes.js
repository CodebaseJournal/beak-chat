import {Router} from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.controller.js';

export const authRouter = Router()

// Sign in
authRouter.post('/sign-in', signIn)

// Sign up
authRouter.post('/sign-up',signUp)

//Sign-out
authRouter.post('/sign-out',signOut)