import { z } from 'zod';

const ACTION = ['add', 'remove'] as const;

export const playlistSchema = z.object({
	name: z.string().min(1, { message: 'Select a playlist' }),
	musicId: z.string().min(1, { message: 'Music ID is required' }),
	userId: z.string().min(1, { message: 'User ID is required' }),
	action: z.enum(ACTION),
});

export const createPlaylistSchema = z.object({
	name: z.string().min(1, { message: 'Enter a name' }),
	userId: z.string(),
});

export const updatePlaylistSchema = z.object({
	name: z.string().min(1, { message: 'Enter a name' }),
	playlistId: z.string(),
});

export const deletePlaylistSchema = z.object({
	confirm: z.literal('confirm', { message: 'You entered a wrong text' }),
	playlistId: z.string(),
	userId: z.string(),
});
