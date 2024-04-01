import {
	createAlbumSchema,
	createGameSchema,
	createCompanySchema,
} from '$lib/validation';
import { zod } from 'sveltekit-superforms/adapters';
import type { LayoutServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import {
	db,
	games,
	companies,
	users,
	playlists,
	musics,
	userFavoritesMusics,
	type SelectMusic,
	type SelectAlbum,
	userFavoritesAlbums,
	albums,
} from '$lib/db';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async (event) => {
	const createAlbumForm = await superValidate(zod(createAlbumSchema));
	const createGameForm = await superValidate(zod(createGameSchema));
	const createCompanyForm = await superValidate(zod(createCompanySchema));
	const allGames = await db.select().from(games);
	const allCompanies = await db.select().from(companies);
	const session = await event.locals.auth();
	let user;
	let userPlaylists;
	const favoritesMusics: SelectMusic[] = [];
	const favoritesAlbums: SelectAlbum[] = [];
	if (session?.user?.email) {
		user = await db.query.users.findFirst({
			where: eq(users.email, session?.user?.email),
		});
		if (user) {
			userPlaylists = await db.query.playlists.findMany({
				where: eq(playlists.userId, user.id),
			});
			const favoritesMusicsRequest = await db
				.select({ musics })
				.from(userFavoritesMusics)
				.leftJoin(musics, eq(userFavoritesMusics.musicId, musics.id))
				.where(eq(userFavoritesMusics.userId, user.id));
			const favoritesAlbumsRequest = await db
				.select({ albums })
				.from(userFavoritesAlbums)
				.leftJoin(albums, eq(userFavoritesAlbums.albumId, albums.id))
				.where(eq(userFavoritesAlbums.userId, user.id));
			if (favoritesMusicsRequest) {
				favoritesMusicsRequest.forEach((item) => {
					favoritesMusics.push(item.musics);
				});
			}
			if (favoritesAlbumsRequest) {
				favoritesAlbumsRequest.forEach((item) => {
					favoritesAlbums.push(item.albums);
				});
			}
		}
	}
	return {
		createAlbumForm,
		createGameForm,
		createCompanyForm,
		games: allGames,
		companies: allCompanies,
		user,
		playlists: userPlaylists,
		favoritesMusics,
		favoritesAlbums,
		session,
	};
};
