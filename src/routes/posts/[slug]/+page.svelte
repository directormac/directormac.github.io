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
	<div
		class="prose md:prose-lg lg:prose-xl
    dark:prose-invert max-w-none
    prose-a:text-blue-500 hover:prose-a:text-blue-400"
	>
		<svelte:component this={data.content} />
	</div>
</article>
