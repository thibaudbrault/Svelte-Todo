import { z } from 'zod';

export const createGameSchema = z.object({
	name: z.string().min(1, { message: 'Enter a name' }),
	company: z.string().min(1, { message: 'Select a company' }),
	cover: z.any(),
});

export const updateGameSchema = z.object({
	name: z.string().min(1, { message: 'Enter a name' }).optional(),
	company: z.string().min(1, { message: 'Select a company' }).optional(),
	gameId: z.string().min(1, { message: 'Game ID is required' }),
	cover: z.any().optional(),
});
