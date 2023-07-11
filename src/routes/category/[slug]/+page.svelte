<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>Category</h1>

{#each data.posts as post}
	<h2>{post.title}</h2>
{/each}
