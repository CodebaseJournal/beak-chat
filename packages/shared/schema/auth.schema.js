import { z } from 'zod'

export const SignUpSchema = z.object({
  username: z.string().trim().min(3, {message: 'Username must be at least 3 characters long'}),
  email: z.string().trim().email({message: 'Invalid email address'}),
  password: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
  displayName: z.string().trim().min(3, {message: 'Display name must be at least 3 characters long'}),
})

export const SignInSchema = z.object({
  email: z.string().trim().email({message: 'Invalid email address'}),
  password: z.string().min(1, {message: 'Password is required'}),
})