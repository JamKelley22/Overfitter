<script lang="ts">
	import Counter from './Counter.svelte';

	export let data;
</script>

<svelte:head>
	<title>Overfitter</title>
	<meta name="A closet management system for the home" content="Overfitter demo app" />
</svelte:head>

<section>
	{#each data.feed as { id, name, description }}
		<li><a href="#">{name}</a></li>
	{/each}
</section>
