import { z } from 'zod';

const BOOLEAN = ['true', 'false'] as const;

export const updateUserSchema = z.object({
	id: z.string().min(1, { message: 'User ID is required' }),
	name: z.string().min(1, { message: 'Enter a name' }),
});

export const deleteHistory = z.object({
	userId: z.string().min(1, { message: 'User ID is required' }),
	values: z.array(z.string()),
	allSelected: z.enum(BOOLEAN),
});
