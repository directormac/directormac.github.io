<script lang="ts">
	import { browser } from '$app/environment';
	import { CloudSun, MoonStar } from 'lucide-svelte';

	let darkMode = true;
	function handleSwitchDarkMode() {
		darkMode = !darkMode;
		localStorage.setItem('theme', darkMode ? 'dark' : 'light');
		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}

	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			darkMode = true;
		} else {
			document.documentElement.classList.remove('dark');
			darkMode = false;
		}
	}
</script>

<label class="relative inline-flex items-center cursor-pointer">
	<input
		type="checkbox"
		value={darkMode}
		id="theme-toggle"
		on:click={handleSwitchDarkMode}
		class="sr-only peer"
	/>
	<span class:hidden={!darkMode}>
		<CloudSun style="color: var(--yellow)" />
	</span>
	<span class:hidden={darkMode}>
		<MoonStar style="color: var(--mantle)" strokeWidth={1} />
	</span>
</label>
