<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
</svelte:head>

<article class="pt-20">
	<!-- <hgroup> -->
	<!-- 	<h1>{data.meta.title}</h1> -->
	<!-- 	<p>Published at {data.meta.date}</p> -->
	<!-- </hgroup> -->
	<!---->
	<!-- <div class="tags"> -->
	<!-- 	{#each data.meta.categories as category} -->
	<!-- 		<span class="surface-4">&num;{category}</span> -->
	<!-- 	{/each} -->
	<!-- </div> -->

	<div
		class="prose md:prose-lg lg:prose-xl dark:prose-invert max-w-none prose-a:text-blue-500 hover:prose-a:text-blue-400"
	>
		<svelte:component this={data.content} />
	</div>
</article>
