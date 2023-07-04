<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>{$page.url} : {$page.error?.message}</h1>
