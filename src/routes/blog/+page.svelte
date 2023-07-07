<script lang="ts">
	import type { PageData } from './$types';
	import { title } from '$lib/config';
	export let data: PageData;
</script>

<svelte:head>
	<title>{title} - Blog</title>
</svelte:head>

<section class="body-font overflow-hidden py-24">
	<div class="container px-5 mx-auto">
		{#each data.posts as post}
			<div class="-my-8 divide-y-2 divide-gray-100">
				<div class="py-8 flex flex-wrap md:flex-nowrap">
					<div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
						<span class="font-semibold title-font">{post.categories}</span>
						<span class="mt-1 text-sm">{post.date}</span>
					</div>
					<div class="md:flex-grow">
						<h2 class="text-2xl font-medium title-font mb-2">{post.title}</h2>
						<p class="leading-relaxed">
							{post.description}
						</p>
						<a href={post.slug} class="text-indigo-500 inline-flex items-center mt-4"
							>Read More
							<svg
								class="w-4 h-4 ml-2"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M5 12h14" />
								<path d="M12 5l7 7-7 7" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
