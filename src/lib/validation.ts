import { z } from 'zod';

const ACTION = ['add', 'remove'] as const;

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

export const createGameSchema = z.object({
	name: z.string().min(1, { message: 'Enter a name' }),
	company: z.string().min(1, { message: 'Select a company' }),
});

export const updateGameSchema = z.object({
	name: z.string().min(1, { message: 'Enter a name' }).optional(),
	company: z.string().min(1, { message: 'Select a company' }).optional(),
	gameId: z.string().min(1, { message: 'Game ID is required' }),
});

export const createCompanySchema = z.object({
	name: z.string().min(1, { message: 'Enter a name' }),
});

export const updateCompanySchema = z.object({
	name: z.string().min(1, { message: 'Enter a name' }),
	companyId: z.string().min(1, { message: 'Company ID is required' }),
});

export const updateUserSchema = z.object({
	id: z.string().min(1, { message: 'User ID is required' }),
	name: z.string().min(1, { message: 'Enter a name' }),
});

export const playlistSchema = z.object({
	name: z.string().min(1, { message: 'Select a playlist' }),
	musicId: z.string().min(1, { message: 'Music ID is required' }),
	userId: z.string().min(1, { message: 'User ID is required' }),
	action: z.enum(ACTION),
});

export const favoriteMusicSchema = z.object({
	userId: z.string().min(1, { message: 'User ID is required' }),
	musicId: z.string().min(1, { message: 'Music ID is required' }),
	action: z.enum(ACTION),
});

export const favoriteAlbumSchema = z.object({
	userId: z.string().min(1, { message: 'User ID is required' }),
	albumId: z.string().min(1, { message: 'Album ID is required' }),
	action: z.enum(ACTION),
});

export const createPlaylistSchema = playlistSchema.extend({
	name: z.string().min(1, { message: 'Enter a name' }),
	userId: z.string().min(1, { message: 'User ID is required' }),
});

export const createMusicSchema = z.object({
	tracks: z.custom<File>((val) => val instanceof File, 'Upload a file').array(),
});
