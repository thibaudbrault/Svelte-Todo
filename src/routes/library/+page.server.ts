import { db, playlists } from '$lib/db';
import { playlistSchema } from '$lib/validation';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const playlistForm = await superValidate(zod(playlistSchema));
	const session = await event.locals.auth();
	if (!session?.user) throw redirect(303, 'auth/signin');
	return {
		playlistForm,
	};
};

export const actions: Actions = {
	createPlaylist: async ({ request }) => {
		try {
			const { name, userId } = Object.fromEntries(await request.formData()) as {
				name: string;
				userId: string;
			};
			const playlistExists = await db.query.playlists.findFirst({
				where: (playlists, { eq, and }) =>
					and(eq(playlists.name, name), eq(playlists.userId, userId)),
			});
			if (playlistExists) {
				error(500, 'Game already exists');
			}
			await db.insert(playlists).values({
				name,
				userId,
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Could not create a playlist' });
		}
	},
	updatePlaylist: async ({ request }) => {
		try {
			const { name, id, userId } = Object.fromEntries(
				await request.formData(),
			) as {
				name: string;
				id: string;
				userId: string;
			};
			await db
				.update(playlists)
				.set({ name })
				.where(and(eq(playlists.id, Number(id)), eq(playlists.userId, userId)));
		} catch (err) {
			console.error(error);
			return fail(500, { message: 'Could not update this playlist' });
		}
	},
	deletePlaylist: async ({ request }) => {
		try {
			const { id, userId } = Object.fromEntries(await request.formData()) as {
				id: string;
				userId: string;
			};
			await db
				.delete(playlists)
				.where(and(eq(playlists.id, Number(id)), eq(playlists.userId, userId)));
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Could not delete this playlist' });
		}
	},
};
