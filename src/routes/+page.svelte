<script>
	import Hero from '$components/hero/Hero.svelte';
	import Hero2 from '$components/hero/Hero2.svelte';
	import { title, name, description, greetings } from '$lib/config';
</script>

<svelte:head><title>{title}</title></svelte:head>
<Hero2 {name} {description} {greetings} />

<Hero {name} {description} {greetings} />
