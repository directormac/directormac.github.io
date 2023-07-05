<script lang="ts">
	// import { IconMoon, IconSunHigh } from '@tabler/icons-svelte';
	import { browser } from '$app/environment';

	// export let toggle: boolean = false;
	// export let button: boolean = false;
	// export let menu: boolean = false;

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
	<!-- <div -->
	<!-- 	class="w-11 h-6 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" -->
	<!-- /> -->
	<span class:hidden={!darkMode}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="#f2ac0a"
			viewBox="0 0 256 256"
			><path
				d="M156,74a74.15,74.15,0,0,0-21.18,3.09,54.08,54.08,0,0,0-11.14-13.61l10.52-15a6,6,0,1,0-9.83-6.89l-10.52,15A53.9,53.9,0,0,0,88,50c-1.15,0-2.28,0-3.41.12L81.4,32.05a6,6,0,1,0-11.81,2.09L72.77,52.2A54,54,0,0,0,47.52,68.32L32.47,57.78a6,6,0,0,0-6.89,9.83l15,10.52A53.7,53.7,0,0,0,34,104c0,1.13,0,2.26.12,3.39l-18.07,3.18a6,6,0,0,0,1,11.91,6.38,6.38,0,0,0,1.05-.09L36.2,119.2a53.51,53.51,0,0,0,7.08,15A50,50,0,0,0,76,222h80a74,74,0,0,0,0-148ZM46,104a42,42,0,0,1,77.48-22.49A74.29,74.29,0,0,0,86.2,123,50.36,50.36,0,0,0,76,122a49.65,49.65,0,0,0-22.79,5.52A42,42,0,0,1,46,104ZM156,210H76a38,38,0,1,1,7.08-75.34,75.84,75.84,0,0,0-1.07,9,6,6,0,0,0,12,.7,61.54,61.54,0,0,1,2-12.24c0-.15.08-.29.11-.43A62.06,62.06,0,1,1,156,210Z"
			/></svg
		>
	</span>
	<span class:hidden={darkMode}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="#383642"
			width="24"
			height="24"
			viewBox="0 0 256 256"
			><path
				d="M236,96a4,4,0,0,1-4,4H212v20a4,4,0,0,1-8,0V100H184a4,4,0,0,1,0-8h20V72a4,4,0,0,1,8,0V92h20A4,4,0,0,1,236,96ZM144,52h12V64a4,4,0,0,0,8,0V52h12a4,4,0,0,0,0-8H164V32a4,4,0,0,0-8,0V44H144a4,4,0,0,0,0,8Zm69.73,103.58a4,4,0,0,1,.71,4,92,92,0,1,1-118-118,4,4,0,0,1,5.29,4.54A93.18,93.18,0,0,0,100,64a92.1,92.1,0,0,0,92,92,93.18,93.18,0,0,0,17.91-1.74A4,4,0,0,1,213.73,155.58Zm-9.46,7.67A100,100,0,0,1,92.75,51.73,84,84,0,1,0,204.27,163.25Z"
			/></svg
		>
	</span>
</label>
