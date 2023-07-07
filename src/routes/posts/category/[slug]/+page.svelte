<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<section class="body-font">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap -m-4">
			{#each data?.posts as post}
				<div class="p-4 lg:w-1/3">
					<div
						class="h-full dark:bg-slate-500 bg-slate-300 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative"
					>
						<h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
							{post.title}
						</h1>
						<p class="leading-relaxed mb-3">
							{post.description}
						</p>
						<p class="leading-relaxed mb-3">
							{post.excerpt}
						</p>
						<!-- svelte-ignore a11y-missing-attribute -->
						<a class="text-indigo-500 inline-flex items-center" href={post.slug}>{post.slug} </a>
						<h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
							{post.categories}
						</h2>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

