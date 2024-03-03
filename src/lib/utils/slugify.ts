import slugify from 'slugify';

export const slugWithOptions = (string: string) =>
	slugify(string, {
		replacement: '',
		remove: undefined,
		lower: true,
		strict: false,
		trim: true,
	});
