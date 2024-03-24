import {
	createAlbumSchema,
	createGameSchema,
	createCompanySchema,
} from '$lib/validation';
import { zod } from 'sveltekit-superforms/adapters';
import type { LayoutServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { db, games, companies, users, playlists } from '$lib/db';
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
	if (session?.user) {
		user = await db.query.users.findFirst({
			where: eq(users.email, session?.user?.email),
		});
		if (user) {
			userPlaylists = await db.query.playlists.findMany({
				where: eq(playlists.userId, user?.id),
			});
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
		session,
	};
};
