import { db, playlistMusics, playlists } from '$lib/db';
import { playlistSchema } from '$lib/validation';
import { fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const updatePlaylistMusics = async ({
	request,
}: {
	request: Request;
}) => {
	const formData = await request.formData();
	const form = await superValidate(formData, zod(playlistSchema));
	if (!form.valid) {
		return fail(400, { form });
	}
	const { userId, musicId, name, action } = form.data;
	const playlist = await db
		.select({ playlistId: playlists.id })
		.from(playlists)
		.where(and(eq(playlists.userId, userId), eq(playlists.name, name)));
	const { playlistId } = playlist[0];
	if (action === 'add') {
		await db.insert(playlistMusics).values({ musicId, playlistId });
	} else if (action === 'remove') {
		await db
			.delete(playlistMusics)
			.where(
				and(
					eq(playlistMusics.playlistId, playlistId),
					eq(playlistMusics.musicId, musicId),
				),
			);
	}
};
