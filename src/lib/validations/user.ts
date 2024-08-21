import { z } from 'zod';

export const updateUserSchema = z.object({
	id: z.string().min(1, { message: 'User ID is required' }),
	name: z.string().min(1, { message: 'Enter a name' }),
});

export const deleteAllHistory = z.object({
	userId: z.string().min(1, { message: 'User ID is required' }),
});
