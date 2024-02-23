import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	driver: 'pg',
	dbCredentials: {
		connectionString: import.meta.env.DATABASE_URL || '',
	},
	verbose: true,
	strict: true,
});
