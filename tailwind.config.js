import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {}
	},
	plugins: [
		forms,
		typography,
		plugin(function ({ addComponents }) {
			addComponents({
				'.btn': {
					padding: '.5rem 1rem',
					borderRadius: '.25rem',
					fontWeight: '600'
				},
				'.btn-blue': {
					backgroundColor: '#3490dc',
					color: '#fff',
					'&hover': {
						backgroundColor: '#2779bd'
					}
				},
				'.btn-red': {
					backgroundColor: '#e3342f',
					color: '#fff',
					'&hover': {
						backgroundColor: '#ccc1f1a'
					}
				}
			});
		})
	]
};
