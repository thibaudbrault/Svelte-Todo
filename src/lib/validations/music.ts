import { z } from 'zod';

export const createMusicSchema = z.object({
	tracks: z.custom<File>((val) => val instanceof File, 'Upload a file').array(),
});

export const updateMusicSchema = z.object({
	name: z.string().min(1, { message: 'Enter a name' }).optional(),
	musicId: z.string(),
});
