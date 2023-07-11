<script lang="ts">
	import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';
	import Navigation from '$components/Navigation.svelte';
	import '../app.css';
</script>

<svelte:window
	on:sveltekit:navigation-start={() => {
		console.log('Navigation started!');
	}}
	on:sveltekit:navigation-end={() => {
		console.log('Navigation ended!');
	}}
/>

<div class="container mx-auto px-8">
	<Header />
	<slot />
	<Footer />
</div>

<!-- <style lang="postcss"> -->
<!-- 	main { -->
<!-- 		@apply flex flex-col  h-screen px-10; -->
<!-- 	} -->
<!-- </style> -->
