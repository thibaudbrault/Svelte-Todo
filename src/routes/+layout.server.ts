import { createAlbumSchema, createGameSchema } from '$lib/validation';
import { zod } from 'sveltekit-superforms/adapters';
import type { LayoutServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';

export const load: LayoutServerLoad = async (event) => {
	const createAlbumForm = await superValidate(zod(createAlbumSchema));
	const createGameForm = await superValidate(zod(createGameSchema));
	return {
		createAlbumForm,
		createGameForm,
		session: await event.locals.auth(),
	};
};
