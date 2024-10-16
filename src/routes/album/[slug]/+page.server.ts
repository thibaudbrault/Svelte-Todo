import { CLOUDFRONT_URL } from '$env/static/private';
import {
	createAlbum,
	createCompany,
	createGame,
	updateFavoriteAlbum,
	updateFavoriteMusic,
	updateHistory,
	updatePlaylistMusics,
} from '$lib/actions';
import {
	albums,
	authors,
	db,
	favoritesAlbums,
	games,
	musics,
	musicsToAuthors,
} from '$lib/db';
import { uploadFile } from '$lib/server';
import { authorSlug, musicSlug } from '$lib/utils';
import {
	createMusicSchema,
	favoriteMusicSchema,
	playlistSchema,
	updateMusicSchema,
} from '$lib/validations';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { count, eq } from 'drizzle-orm';
import * as mm from 'music-metadata';
import {
	message,
	setError,
	superValidate,
	withFiles,
} from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const favoriteForm = await superValidate(zod(favoriteMusicSchema));
	const addToPlaylistForm = await superValidate(zod(playlistSchema));
	const createMusicForm = await superValidate(zod(createMusicSchema));
	const updateMusicForm = await superValidate(zod(updateMusicSchema));
	const slug = params.slug;
	const album = await db.query.albums.findFirst({
		where: eq(albums.slug, slug),
	});
	if (!album) {
		return redirect(300, '/');
	}
	const game = await db.query.games.findFirst({
		where: eq(games.id, album.gameId),
	});
	const albumLength = await db
		.select({ count: count() })
		.from(musics)
		.where(eq(musics.albumId, album.id));
	const albumMusics = await db.query.musics.findMany({
		where: eq(musics.albumId, album.id),
		orderBy: musics.number,
		with: {
			authors: {
				with: {
					author: true,
				},
			},
			playlists: {
				columns: {
					playlistId: true,
				},
			},
		},
	});
	const albumLikes = await db
		.select({ count: count() })
		.from(favoritesAlbums)
		.where(eq(favoritesAlbums.albumId, album.id));
	return {
		album,
		game: game?.name ?? '',
		length: albumLength[0].count,
		musics: albumMusics,
		likes: albumLikes[0].count,
		favoriteForm,
		createMusicForm,
		addToPlaylistForm,
		updateMusicForm,
	};
};

export const actions: Actions = {
	createAlbum,
	createGame,
	createCompany,
	updateFavoriteAlbum,
	updateFavoriteMusic,
	updateHistory,
	updatePlaylistMusics,
	createMusic: async ({ request, params }) => {
		const slug = params.slug as string;
		const album = await db.query.albums.findFirst({
			where: eq(albums.slug, slug),
		});
		if (!album) {
			return error(404, { message: 'Could not find album' });
		}
		const { id: albumId } = album;
		const formData = await request.formData();
		const form = await superValidate(formData, zod(createMusicSchema), {
			id: 'createMusic',
		});
		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}
		const { tracks } = form.data;
		let uploadedTracks = 0;
		for (const track of tracks) {
			const buffer = Buffer.from(await track.arrayBuffer());
			const metadata = await mm.parseBuffer(buffer);
			if (!metadata) {
				return setError(form, 'tracks._errors', 'Could not find metadata');
			}
			const name = metadata.common.title ?? '';
			const number = parseFloat(
				metadata.common.disk.no?.toString() +
					'.' +
					metadata.common.track.no?.toString().padStart(2, '0'),
			);
			const musicExists = await db.query.musics.findFirst({
				where: (musics, { eq, and }) =>
					and(
						eq(musics.name, name),
						eq(musics.albumId, albumId),
						eq(musics.number, number),
					),
			});
			if (musicExists) {
				continue;
			}
			let artists = metadata.common.artists ?? [];
			artists = artists[0].split(',').map((item) => item.trim());
			const titleSlug = musicSlug(track.name);
			const filename = `${slug}/${crypto.randomUUID()}${titleSlug}`;
			await uploadFile(buffer, filename, track.type);
			const trackUrl = CLOUDFRONT_URL + filename;
			const newMusic = await db
				.insert(musics)
				.values({
					name,
					url: trackUrl,
					duration: Math.round(metadata.format?.duration ?? 0),
					number,
					albumId,
				})
				.returning({ musicId: musics.id });
			if (!newMusic) {
				continue;
			}
			uploadedTracks += 1;
			const musicId = newMusic[0].musicId;
			let authorId;
			artists?.forEach(async (artist) => {
				const slug = authorSlug(artist);
				const artistExists = await db.query.authors.findFirst({
					where: eq(authors.slug, slug),
				});
				if (!artistExists) {
					const newAuthor = await db
						.insert(authors)
						.values({
							name: artist,
							slug,
						})
						.returning({ authorId: authors.id });
					authorId = newAuthor[0].authorId;
				} else {
					authorId = artistExists.id;
				}
				await db.insert(musicsToAuthors).values({
					musicId,
					authorId,
				});
			});
		}
		if (uploadedTracks === 0) {
			return error(500, { message: 'Tracks already exist' });
		} else {
			return message(form, 'Tracks added successfully');
		}
	},
	updateMusic: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(updateMusicSchema), {
			id: 'updateMusic',
		});
		if (!form.valid) {
			return fail(400, { form });
		}
		const { musicId, name } = form.data;
		await db.update(musics).set({ name }).where(eq(musics.id, musicId));
		return message(form, 'Music data updated');
	},
	deleteMusics: async ({ params }) => {
		const slug = params.slug as string;
		const album = await db.query.albums.findFirst({
			where: eq(albums.slug, slug),
		});
		if (!album) {
			return error(404, { message: 'Could not find album' });
		}
		const { id: albumId } = album;
		await db.delete(musics).where(eq(musics.albumId, albumId));
		return { message: 'Musics deleted successfully' };
	},
};
