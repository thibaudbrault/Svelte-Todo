import { CLOUDFRONT_URL } from '$env/static/private';
import { companies, db, games } from '$lib/db';
import { uploadFile } from '$lib/server';
import { createGameSchema } from '$lib/validation';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const createGame = async ({ request }: { request: Request }) => {
	const formData = await request.formData();
	const form = await superValidate(formData, zod(createGameSchema), {
		id: 'createGame',
	});
	if (!form.valid) {
		return fail(400, { form });
	}
	const { name, company, cover } = form.data;
	const value = name.toLowerCase();
	const gameExists = await db.query.games.findFirst({
		where: eq(games.value, value),
	});
	if (gameExists) {
		return setError(form, 'name', 'Game already exists');
	}
	const findCompany = await db.query.companies.findFirst({
		where: eq(companies.value, company),
	});
	if (!findCompany) {
		return setError(form, 'company', 'Company not found');
	}
	const companyId = findCompany.id;
	const filename = `games/${crypto.randomUUID()}${cover.name}`;
	await uploadFile(
		Buffer.from(await cover.arrayBuffer()),
		filename,
		cover.type,
	);
	const coverUrl = CLOUDFRONT_URL + filename;
	await db.insert(games).values({
		name,
		value,
		companyId,
		cover: coverUrl,
	});
	return message(form, 'Game created successfully');
};
