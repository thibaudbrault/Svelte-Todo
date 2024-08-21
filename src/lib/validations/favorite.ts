import { z } from 'zod';

const ACTION = ['add', 'remove'] as const;

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
