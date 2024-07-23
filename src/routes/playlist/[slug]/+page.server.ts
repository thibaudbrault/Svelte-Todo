import {
	createAlbum,
	createCompany,
	createGame,
	updateFavoriteMusic,
	updateHistory,
} from '$lib/actions';
import { db, playlists } from '$lib/db';
import { redirect, type Actions } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { session, user } = await event.locals.safeGetSession();
	if (!session || !user) throw redirect(303, '/login');
	const name = event.params.slug;
	const playlist = await db.query.playlists.findFirst({
		where: and(eq(playlists.userId, user.id), eq(playlists.name, name)),
		with: {
			musics: {
				columns: {},
				with: {
					music: {
						with: {
							authors: {
								with: {
									author: true,
								},
							},
							album: {
								columns: {
									cover: true,
								},
							},
						},
					},
				},
			},
		},
	});
	if (playlist) {
		playlist.musics = playlist.musics.map((musics) => musics.music);
	} else {
		throw redirect(303, '/');
	}
	return {
		name,
		playlist,
	};
};

export const actions: Actions = {
	createAlbum,
	createGame,
	createCompany,
	updateFavoriteMusic,
	updateHistory,
};
