import { z } from 'zod';
export const createSingleMusicSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	duration: z
		.number()
		.min(0, { message: 'Duration must be a positive number' }),
	number: z.number().min(1, { message: 'Number must be 1 or more' }),
	track: z.instanceof(File, { message: 'Upload a file.' }),
});

export type CreateSingleMusic = typeof createSingleMusicSchema;
