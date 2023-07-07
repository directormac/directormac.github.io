<script lang="ts">
	import { page } from '$app/stores';
</script>

<div>
	<h1 class="text-red-600 text-3xl">{$page.url} : {$page.error?.message}</h1>
</div>

<style lang="postcss">
	div {
		height: 100vh;
		width: 100vw;
		align-items: center;
		align-content: center;
		text-align: center;
		@apply bg-gray-900;
	}
</style>
