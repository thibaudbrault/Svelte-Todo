import slugify from 'slugify';

export const albumSlug = (string: string) =>
	slugify(string, {
		replacement: '',
		remove: undefined,
		lower: true,
		strict: false,
		trim: true,
	});

export const musicSlug = (string: string) =>
	slugify(string, {
		replacement: '',
		remove: undefined,
		lower: false,
		strict: false,
		trim: true,
	});
