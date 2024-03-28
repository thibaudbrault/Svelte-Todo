import { z } from 'zod';

export const createAlbumSchema = z.object({
	name: z.string().min(1, { message: 'Album name is required' }),
	cover: z.any(),
	game: z.string().min(1, { message: 'Game name is required' }),
});

export const createGameSchema = z.object({
	name: z.string().min(1, { message: 'Game name is required' }),
	company: z.string().min(1, { message: 'Company name is required' }),
});

export const createCompanySchema = z.object({
	name: z.string().min(1, { message: 'Company name is required' }),
});

export const playlistSchema = z.object({
	name: z.string().min(1, { message: 'Playlist name is required' }),
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

export const creatOneMusicSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	number: z.number().min(1, { message: 'Number must be 1 or more' }),
	track: z.custom<File>((val) => val instanceof File, 'Upload a file'),
});

export const createManyMusicSchema = z.object({
	tracks: z.custom<File>((val) => val instanceof File, 'Upload a file').array(),
});

export type CreateAlbum = typeof createAlbumSchema;
export type CreateGame = typeof createGameSchema;
export type CreateCompany = typeof createCompanySchema;
export type CreateOneMusic = typeof creatOneMusicSchema;
export type CreateManyMusic = typeof createManyMusicSchema;
