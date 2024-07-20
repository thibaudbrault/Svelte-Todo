import { db, playlistMusics, playlists } from '$lib/db';
import { and, eq } from 'drizzle-orm';

export const updatePlaylist = async ({ request }) => {
	const formData = await request.formData();
	const { musicId, userId, name } = Object.fromEntries(formData) as {
		musicId: string;
		userId: string;
		name: string;
	};
	const playlist = await db
		.select({ playlistId: playlists.id })
		.from(playlists)
		.where(and(eq(playlists.userId, userId), eq(playlists.name, name)));
	const { playlistId } = playlist[0];
	await db.insert(playlistMusics).values({ musicId, playlistId });
};
