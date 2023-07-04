import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			// $lib: path.resolve('./src/lib'), // fix cause sveltekit is slow on recognizing this
			// $components: path.resolve('./src/lib/components'), // shorthand for components
			// $utils: path.resolve('./src/lib/utils'), // shorthand for importing utils
			// $stores: path.resolve('./src/lib/stores'), // shorthand for importing stores
			// '~': path.resolve('./src')
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
