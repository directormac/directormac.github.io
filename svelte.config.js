import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

const BASE_PATH = '';
const dev = process.argv.includes('dev');
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components',
			$stores: 'src/lib/stores',
			$utils: 'src/lib/utils'
		},
		//Incase you changed the basepath please uncomment the following lines below
		paths: {
			base: dev ? '' : BASE_PATH
		}
	}
};

export default config;
