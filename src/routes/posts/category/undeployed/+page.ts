// import type { Post, Categories } from '$lib/types';
// import type { PageLoad } from './$types';
// export const prerender = false;
// export const load = (async ({ fetch, params }) => {
// 	const response = await fetch('api/posts');
// 	const allPosts: Post[] = await response.json();
// 	const category = params.slug as Categories;
//
// 	const posts = allPosts.filter((post) => post.categories.includes(category));
//
// 	console.log(posts);
// 	return { posts };
// }) satisfies PageLoad;
