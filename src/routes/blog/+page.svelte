<script lang="ts">
	import type { PageData } from './$types';
	import { title } from '$lib/config';
	export let data: PageData;
</script>

<svelte:head>
	<title>{title} - Blog</title>
</svelte:head>

<section class="my-10">
	<ul>
		{#each data.posts as post}
			<li class="mt-5">
				<a href={post.slug}>
					<span class="font-bold text-2xl mr-5">{post.title}</span> <span>{post.date}</span>
					<br />
					{post.description}<br />
				</a>
				{#each post.categories as category}
					<a href={'/category/' + category} class="mr-5">
						<span class="text-sm font-semibold text-gray-500"># {category}</span>
					</a>
				{/each}
			</li>
		{/each}
	</ul>
</section>
