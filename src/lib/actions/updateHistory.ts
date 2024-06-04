import { db, history } from '$lib/db';

export const updateHistory = async ({ request }) => {
	const formData = await request.formData();
	const { musicId, userId } = Object.fromEntries(formData) as {
		musicId: string;
		userId: string;
	};
	await db.update(history).set({ musicId, userId });
};
