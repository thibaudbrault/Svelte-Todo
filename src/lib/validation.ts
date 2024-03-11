import { z } from 'zod';

export const createAlbumSchema = z.object({
	name: z.string().min(1, { message: 'Album name is required' }),
	cover: z.any(),
});

export const createSingleMusicSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	duration: z
		.number()
		.min(0, { message: 'Duration must be a positive number' }),
	number: z.number().min(1, { message: 'Number must be 1 or more' }),
	track: z.any(),
});

export const createMultipleMusicSchema = z.object({
	number: z.number().min(1, { message: 'Number must be 1 or more' }),
	tracks: z.any(),
});

export type CreateAlbum = typeof createAlbumSchema;
export type CreateSingleMusic = typeof createSingleMusicSchema;
export type CreateMultipleMusic = typeof createMultipleMusicSchema;
