<script lang="ts">
	import { base } from '$app/paths';

	import { page } from '$app/stores';

	import ToggleTheme from './ToggleTheme.svelte';
	type Links = {
		href: string;
		name: string;
	};
	let links: Links[] = [
		{
			href: `/`,
			name: 'Home'
		},
		{
			href: `${base}/blog`,
			name: 'Blog'
		},
		{
			href: `${base}/projects`,
			name: 'Projects'
		},
		{
			href: `${base}/about`,
			name: 'About'
		}
	];
</script>

<div class="antialiased">
	<header>
		<div class="logo">
			<a href={base}>Logo</a>
		</div>
		<label for="menu-toggle" class="pointer-cursor lg:hidden block">
			<svg
				class="fill-current text-gray-900 dark:text-white"
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 20 20"
			>
				<title>Menu</title>
				<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg
			>
		</label>
		<input type="checkbox" class="hidden" id="menu-toggle" />
		<div class="menu" id="menu">
			<nav>
				<ul class="link">
					{#each links as link}
						<li class:active={$page.url.pathname === link.href}>
							<a href={link.href}>{link.name}</a>
						</li>
					{/each}
					<li>
						<div>
							<ToggleTheme />
						</div>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</div>

<style lang="postcss">
	header {
		@apply lg:px-16 px-6 flex flex-wrap items-center lg:py-0 py-2;
	}
	.logo {
		@apply flex flex-1 justify-between font-medium items-center text-2xl mb-4 md:mb-0;
	}
	.menu {
		@apply hidden justify-between  lg:flex lg:items-center lg:w-auto w-full text-center;
	}
	#menu-toggle:checked + #menu {
		display: block;
	}
	.link {
		@apply flex-grow lg:flex items-center justify-between text-base pt-4 lg:pt-0;
	}
	.link li {
		@apply active:bg-sky-600;
	}
	li.active {
		@apply text-green-600;
	}
	.link a {
		@apply lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-green-400;
	}
</style>
