import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { updateUserSchema } from '$lib/validation';
import { db, users } from '$lib/db';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	const { session } = await event.locals.safeGetSession();
	if (!session) throw redirect(303, '/login');
	const updateUserForm = await superValidate(zod(updateUserSchema));
	return {
		updateUserForm,
	};
};

export const actions: Actions = {
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
};
