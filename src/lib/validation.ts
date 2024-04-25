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
	name: z.string().min(1, { message: 'Enter a name' }).optional(),
	companyId: z.string().min(1, { message: 'Company ID is required' }),
});

export const playlistSchema = z.object({
	name: z.string().min(1, { message: 'Enter a name' }),
});

export const favoriteMusicSchema = z.object({
	userId: z.string().min(1, { message: 'User ID is required' }),
	musicId: z.string().min(1, { message: 'Music ID is required' }),
});

export const favoriteAlbumSchema = z.object({
	userId: z.string().min(1, { message: 'User ID is required' }),
	albumId: z.string().min(1, { message: 'Album ID is required' }),
});

export const addToPlaylistSchema = z.object({
	name: z.string().min(1, { message: 'Select a playlist' }),
	musicId: z.string().min(1, { message: 'Music ID is required' }),
	userId: z.string().min(1, { message: 'User ID is required' }),
});

export const createPlaylistSchema = playlistSchema.extend({
	userId: z.string().min(1, { message: 'User ID is required' }),
});

export const updatePlaylistSchema = createPlaylistSchema.extend({
	id: z.string().min(1, { message: 'Playlist ID is required' }),
});

export const deletePlaylistSchema = updatePlaylistSchema.omit({
	name: true,
});

export const createMusicSchema = z.object({
	tracks: z.custom<File>((val) => val instanceof File, 'Upload a file').array(),
});
