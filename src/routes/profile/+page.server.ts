import { createAlbum, createCompany, createGame } from '$lib/actions';
import { db, history, users } from '$lib/db';
import { deleteHistory, updateUserSchema } from '$lib/validations';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { and, desc, eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { session, user } = await event.locals.safeGetSession();
	if (!session || !user) throw redirect(303, '/login');
	const updateUserForm = await superValidate(zod(updateUserSchema));
	const userHistory = await db.query.history.findMany({
		where: eq(history.userId, user.id),
		orderBy: desc(history.listenedAt),
		with: {
			music: {
				with: {
					album: true,
				},
			},
		},
	});
	return {
		history: userHistory,
		updateUserForm,
	};
};

export const actions: Actions = {
	createAlbum,
	createGame,
	createCompany,
	updateUser: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(updateUserSchema), {
			id: 'updateUser',
		});
		if (!form.valid) {
			return fail(400, { form });
		}
		const { id, name } = form.data;
		await db.update(users).set({ name }).where(eq(users.id, id));
		return { message: 'Name updated successfully' };
	},
	deleteHistory: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(deleteHistory));
		if (!form.valid) {
			return fail(400, { form });
		}
		const { userId, values, allSelected } = form.data;
		if (allSelected === 'true') {
			await db.delete(history).where(eq(history.userId, userId));
		} else {
			const parsedValues = JSON.parse(values[0]);
			parsedValues.forEach(async (id) => {
				console.log(id);
				await db
					.delete(history)
					.where(and(eq(history.userId, userId), eq(history.musicId, id)));
			});
		}
		return { message: 'History deleted' };
	},
};
