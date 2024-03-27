import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { albumSlug } from '$lib/utils';
import { db, albums, companies, games } from '$lib/db';
import { CLOUDFRONT_URL } from '$env/static/private';
import { uploadFile } from '$lib/server';
import { eq } from 'drizzle-orm';
import {
	createAlbumSchema,
	createCompanySchema,
	createGameSchema,
} from '$lib/validation';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	const allAlbums = await db.select().from(albums);
	return {
		albums: allAlbums,
	};
};

export const actions: Actions = {
	createCompany: async ({ request }) => {
		try {
			const formData = await request.formData();
			const form = await superValidate(formData, zod(createCompanySchema));
			if (!form.valid) {
				fail(400, { form });
			}
			const { name } = form.data;
			const value = name.toLowerCase();
			const companyExists = await db.query.companies.findFirst({
				where: eq(companies.value, value),
			});
			if (companyExists) {
				error(500, 'Game already exists');
			}
			await db.insert(companies).values({
				name,
				value,
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Could not create a company' });
		}
	},
	createGame: async ({ request }) => {
		try {
			const formData = await request.formData();
			const form = await superValidate(formData, zod(createGameSchema));
			if (!form.valid) {
				fail(400, { form });
			}
			const { name, company } = form.data;
			const value = name.toLowerCase();
			const gameExists = await db.query.games.findFirst({
				where: eq(games.value, value),
			});
			if (gameExists) {
				error(500, 'Game already exists');
			}
			const findCompany = await db.query.companies.findFirst({
				where: eq(companies.value, company),
			});
			if (!findCompany) {
				error(500, 'Could not find company');
			}
			const companyId = findCompany.id;
			await db.insert(games).values({
				name,
				value,
				companyId,
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Could not create a company' });
		}
	},
	createAlbum: async ({ request }) => {
		try {
			const formData = await request.formData();
			const form = await superValidate(formData, zod(createAlbumSchema));
			if (!form.valid) {
				fail(400, { form });
			}
			const { name, game, cover } = form.data;
			const slug = albumSlug(name);
			const filename = `${slug}/${crypto.randomUUID()}${albumSlug(cover?.name)}`;
			const findGame = await db.query.games.findFirst({
				where: eq(companies.value, game),
			});
			if (!findGame) {
				error(500, 'Could not find game');
			}
			const gameId = findGame.id;
			await uploadFile(
				Buffer.from(await cover.arrayBuffer()),
				filename,
				cover.type,
			);
			const coverUrl = CLOUDFRONT_URL + filename;
			await db.insert(albums).values({
				name,
				cover: coverUrl,
				slug,
				gameId,
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Could not create an album' });
		}
		return { status: 201 };
	},
};
