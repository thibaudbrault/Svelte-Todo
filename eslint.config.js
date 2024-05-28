/** @type {import('eslint').Linter.FlatConfig[]} */

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import eslintConfigPrettier from 'eslint-config-prettier';
import drizzleEslint from 'eslint-plugin-drizzle';
import svelteParser from 'svelte-eslint-parser';
import globals from 'globals';

export default [
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	eslintConfigPrettier,
	{
		ignores: [
			'.DS_STore',
			'node_modules/**',
			'build/**',
			'.svelte-kit/**',
			'migrations/**',
			'package/**',
			'.env',
			'.env.*',
			'pnpm-lock.yaml',
		],
	},

	// TypeScript
	{
		files: ['**/*.ts'],
		ignores: ['**/*.config.ts'],
		languageOptions: {
			parser: tseslint.parser,
			sourceType: 'module',
			ecmaVersion: 2021,
			parserOptions: {
				project: './tsconfig.json',
				extraFileExtensions: ['.svelte'],
			},
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			'eslint-plugin-drizzle': drizzleEslint,
		},
	},

	// Svelte
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			sourceType: 'module',
			ecmaVersion: 2021,
			globals: {
				...globals.browser,
			},
			parserOptions: {
				parser: tseslint.parser,
				project: './tsconfig.json',
				extraFileExtensions: ['.svelte'],
			},
		},
		plugins: {
			svelte: eslintPluginSvelte,
			'@typescript-eslint': tseslint.plugin,
		},
		rules: {
			...eslintPluginSvelte.configs.recommended.rules,
		},
	},
];
