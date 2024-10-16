import { z } from 'zod';

export const createAlbumSchema = z.object({
	name: z.string().min(1, { message: 'Enter a name' }),
	release: z.number().min(1950, { message: 'Release date must be above 1950' }),
	cover: z.any(),
	game: z.string().min(1, { message: 'Select a game' }),
});

export const updateAlbumSchema = z.object({
	name: z.string().min(1, { message: 'Album name is required' }).optional(),
	release: z
		.number()
		.min(1950, { message: 'Release date must be above 1950' })
		.optional(),
	cover: z.any().optional(),
	game: z.string().min(1, { message: 'Select a game' }).optional(),
	albumId: z.string().min(1, { message: 'Album ID is required' }),
});
