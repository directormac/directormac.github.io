<script lang="ts">
	export let greetings = 'Your Gretings Here';
	export let description = 'Your Description Here';
	export let name = 'Your  Name Here';
	import Typewriter from '$components/Typwriter.svelte';
</script>

<section class="text-gray-600 body-font">
	<div class="content">
		<div
			class="lg:flex-grow lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
		>
			<span
				class="title-font lg:text-8xl md:text-6xl text-4xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-600"
			>
				<Typewriter text={greetings} speed={0.5} />
			</span>
			<h1 class="title-font font-medium lg:text-8xl md:text-6xl text-4xl mb-4">
				{name}
				<br class="hidden lg:inline-block" />
			</h1>
			<p class="mb-8 leading-relaxed">
				{description}
			</p>
			<div class="flex justify-center">
				<button
					class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
					>About me</button
				>
				<button
					class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
					>Github</button
				>
			</div>
		</div>
		<!-- <div class="lg:max-w-lg lg:w-full w-1/2"> -->
		<!-- 	<img -->
		<!-- 		class="object-cover object-center rounded" -->
		<!-- 		alt="hero" -->
		<!-- 		src="https://dummyimage.com/720x600" -->
		<!-- 	/> -->
		<!-- </div> -->
	</div>
</section>

<!-- src="https://imagedelivery.net/-Jd9PZZzdHHmAHkY_5ZkAA/4afa537b-731b-4b55-edda-63046b86fd00/w=600,h=300,fit=sace-down" -->

<style lang="postcss">
	.content {
		@apply container mx-auto flex px-5 py-24 md:flex-row flex-col items-center;
	}
</style>
