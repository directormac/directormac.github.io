<script lang="ts">
	import { brand } from '$lib/config';
	import { base } from '$app/paths';
	import { ChevronsDown, Terminal } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	let showLinks = false;

	import ToggleTheme from './ToggleTheme.svelte';
	type Links = {
		href: string;
		label: string;
	};
	let links: Links[] = [
		{
			href: `${base}/blog`,
			label: 'blog'
		},
		{
			href: `${base}/projects`,
			label: 'projects'
		},
		{
			href: `${base}/about`,
			label: 'about'
		}
	];
</script>

<div class="flex flex-row justify-center items-center">
	<!-- Hamburger Menu -->
	<div class="md:hidden basis-1/6 ml-2 flex-1">
		<label for="menu-toggle" class="cursor-pointer lg:hidden">
			<ChevronsDown />
		</label>
		<input bind:checked={showLinks} type="checkbox" class="hidden" id="menu-toggle" />
	</div>

	<!-- Logo Section -->
	<div class="basis-1/2 md:basis-1/6 flex items-center">
		<Terminal class="mr-2 mx-2 icon-color" />
		<a class="text-2xl" href={`${base}/`}>{brand}</a>
	</div>

	<!-- Links Section -->
	<div class="grow basis-auto justify-center items-center hidden md:flex">
		<ul class="flex items-center text-2xl">
			{#each links as link}
				<div>
					<li class:active={$page.url.pathname === link.href}>
						<a
							class="px-2 py-2 block border-transparent border-b-2 hover:border-green-800"
							href={link.href}
						>
							{link.label}
						</a>
					</li>
				</div>
			{/each}
		</ul>
	</div>
	<div class="basis-1/6 flex justify-end items-end mr-2">
		<ToggleTheme />
	</div>
</div>

<div
	transition:slide
	class="justify-between lg:items-center lg:w-auto w-full text-center text-2xl"
	id="menu"
>
	{#if showLinks}
		<ul class="flex-row border-transparent border-t-2 border-green-400">
			{#each links as link}
				<li class:active={$page.url.pathname === link.href} transition:slide|global>
					<a
						class="px-2 py-4 block border-transparent border-b-2 hover:text-green-500 hover:border-green-400"
						href={link.href}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	li.active {
		color: var(--green);
	}
	li:hover {
		border-color: var(--green);
	}
	.logo-color {
		color: var(--tokyo-blue);
	}
</style>
