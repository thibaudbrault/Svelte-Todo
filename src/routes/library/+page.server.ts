import { db, playlists } from '$lib/db';
import {
	createPlaylistSchema,
	deletePlaylistSchema,
	playlistSchema,
	updatePlaylistSchema,
} from '$lib/validation';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { message, setError, superValidate } from 'sveltekit-superforms';
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
		const formData = await request.formData();
		const form = await superValidate(formData, zod(createPlaylistSchema), {
			id: 'createPlaylist',
		});
		if (!form.valid) {
			return fail(400, { form });
		}
		const { name, userId } = form.data;
		const playlistExists = await db.query.playlists.findFirst({
			where: (playlists, { eq, and }) =>
				and(eq(playlists.name, name), eq(playlists.userId, userId)),
		});
		if (playlistExists) {
			return setError(form, 'name', 'Album already exists');
		}
		await db.insert(playlists).values({
			name,
			userId,
		});
		return message(form, 'Playlist created successfully');
	},
	updatePlaylist: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(updatePlaylistSchema), {
			id: 'updatePlaylist',
		});
		if (!form.valid) {
			return fail(400, { form });
		}
		const { name, userId, id } = form.data;
		await db
			.update(playlists)
			.set({ name })
			.where(and(eq(playlists.id, Number(id)), eq(playlists.userId, userId)));
		return message(form, 'Playlist updated successfully');
	},
	deletePlaylist: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(deletePlaylistSchema), {
			id: 'deletePlaylist',
		});
		if (!form.valid) {
			return fail(400, { form });
		}
		const { userId, id } = form.data;
		await db
			.delete(playlists)
			.where(and(eq(playlists.id, Number(id)), eq(playlists.userId, userId)));
		return message(form, 'Playlist deleted successfully');
	},
};
