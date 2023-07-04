import { defineMDSveXConfig as defineConfig } from 'mdsvex';

export const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],
	smartypants: {
		dashes: 'oldschool'
	},
	remarkPlugins: [],
	rehypePlugins: []
});

export default config;
