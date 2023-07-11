import type { Post } from '$lib/types';
import type { Categories } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
export const load = (async ({ fetch, params }) => {
	const { slug } = params;
	const response = await fetch('/api/posts');
	const allPosts: Post[] = await response.json();
	try {
		const posts: Post[] = allPosts.filter((post) => {
			return post.categories.includes(slug as Categories);
		});
		return { posts };
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}) satisfies PageLoad;
