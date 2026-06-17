import {z} from 'zod'

export const sendMessageSchema = z.object({
  content: z.string().min(1, {message: 'Message content cannot be empty'}).max(2000, {message: 'Message content cannot exceed 2000 characters'}),
  group_id: z.string().uuid({message: 'Invalid group ID'}),
})

export const SendDMSchema = z.object({
  content: z.string().min(1, {message: 'Message content cannot be empty'}).max(2000, {message: 'Message content cannot exceed 2000 characters'}),
  conversation_id: z.string().uuid({message: 'Invalid conversation ID'}),
})