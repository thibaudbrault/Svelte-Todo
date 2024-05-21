import { DATABASE_URL } from '$env/static/private';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

let client: postgres.Sql;

if (process.env.NODE_ENV === 'production') {
	client = postgres(DATABASE_URL, { prepare: false });
} else {
	const globalConnection = global as typeof globalThis & {
		client: postgres.Sql;
	};

	if (!globalConnection.client) {
		globalConnection.client = postgres(DATABASE_URL, {
			prepare: false,
		});
	}

	client = globalConnection.client;
}

// const client = postgres(DATABASE_URL, { prepare: false });
export const db = drizzle(client, {
	schema,
	logger: process.env.NODE_ENV === 'development',
});
