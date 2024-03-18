import { z } from 'zod';

export const createAlbumSchema = z.object({
	name: z.string().min(1, { message: 'Album name is required' }),
	cover: z.any(),
});

export const creatOneMusicSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	number: z.number().min(1, { message: 'Number must be 1 or more' }),
	track: z.custom<File>((val) => val instanceof File, 'Upload a file'),
});

export const createManyMusicSchema = z.object({
	tracks: z.custom<File>((val) => val instanceof File, 'Upload a file').array(),
});

export type CreateAlbum = typeof createAlbumSchema;
export type CreateOneMusic = typeof creatOneMusicSchema;
export type CreateManyMusic = typeof createManyMusicSchema;
