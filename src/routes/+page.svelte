<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import Typewriter from '$components/Typwriter.svelte';

	let visible = false;

	onMount(() => {
		visible = true;
	});
</script>

{#if visible}
	<Typewriter text="Welcome to SvelteKit" />
	<h1 class="text-3xl" transition:fade>This template is written by</h1>
	<h1 class="text-3xl" transition:fly={{ x: 200, duration: 2000 }}>directormac</h1>
	<p>
		Visit <a href="https://github.com/directormac">github.com/directormac</a> to read the documentation
	</p>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	This should work
{/if}

<style>
	/* This will only apply to this page */
	:global(html) {
		@apply bg-slate-900;
		@apply text-white;
	}
</style>
