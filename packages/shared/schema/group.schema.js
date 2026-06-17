import {z} from 'zod'

export const CreateGroupSchema = z.object({
  name: z.string().trim().min(1, {message: 'Group name cannot be empty'}).max(100, {message: 'Group name cannot exceed 100 characters'}),
  description: z.string().trim().max(500, {message: 'Group description cannot exceed 500 characters'}).optional(),
})

export const JoinGroupSchema = z.object({
  group_id: z.string().uuid({message: 'Invalid group ID'}),
})