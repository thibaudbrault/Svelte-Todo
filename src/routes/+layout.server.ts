import {
	companies,
	db,
	favoritesAlbums,
	favoritesMusics,
	games,
	playlists,
	users,
	type SelectAlbum,
	type SelectMusic,
} from '$lib/db';
import {
	createAlbumSchema,
	createCompanySchema,
	createGameSchema,
} from '$lib/validation';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { session, user } = await event.locals.safeGetSession();
	const createAlbumForm = await superValidate(zod(createAlbumSchema));
	const createGameForm = await superValidate(zod(createGameSchema));
	const createCompanyForm = await superValidate(zod(createCompanySchema));
	const allGames = await db.select().from(games).orderBy(games.name);
	const allCompanies = await db
		.select()
		.from(companies)
		.orderBy(companies.name);
	let allPlaylists;
	let profile;
	const favMusics: SelectMusic[] = [];
	const favAlbums: SelectAlbum[] = [];
	if (user?.email) {
		profile = await db.query.users.findFirst({
			where: eq(users.email, user?.email),
		});
		allPlaylists = await db.query.playlists.findMany({
			where: eq(playlists.userId, user.id),
			with: {
				musics: {
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
		const musicsRequest = await db.query.favoritesMusics.findMany({
			where: eq(favoritesMusics.userId, user?.id),
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
		});
		const albumsRequest = await db.query.favoritesAlbums.findMany({
			where: eq(favoritesAlbums.userId, user.id),
			with: {
				album: true,
			},
		});
		if (musicsRequest) {
			musicsRequest.forEach((item) => {
				favMusics.push(item.music);
			});
		}
		if (albumsRequest) {
			albumsRequest.forEach((item) => {
				favAlbums.push(item.album);
			});
		}
	}
	return {
		createAlbumForm,
		createGameForm,
		createCompanyForm,
		games: allGames,
		companies: allCompanies,
		playlists: allPlaylists,
		favoritesMusics: favMusics,
		favoritesAlbums: favAlbums,
		session,
		profile,
	};
};
