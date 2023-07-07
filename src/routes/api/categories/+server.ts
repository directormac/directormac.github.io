import { json } from '@sveltejs/kit';
import type { Post, Categories } from '$lib/types';

async function getPosts(category?: Categories)
	let posts: Post[] = [];
	// const categories: Categories[] = Object.keys({} as { [K in Categories]: K }) as Categories[];

	const paths = import.meta.glob('/src/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = '/posts/' + path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } satisfies Post;
			post.published && posts.push(post);
		}
	}

	posts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return posts;
}

export async function GET(request) {
	const [, category] = request.path.split('/');
	const posts = await getPosts(category)
	return json(posts);
}
