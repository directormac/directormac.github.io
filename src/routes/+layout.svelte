<script lang="ts">
	import Navigation from '$components/Navigation.svelte';
	import '../app.css';
</script>

<Navigation />
<div class="main">
	<slot />
</div>

<style lang="postcss">
	.main {
		@apply flex flex-col  h-screen px-10;
	}
</style>
