<script lang="ts">
	import { onDestroy } from "svelte";
	import { store } from "./../store";
	import Card from "./Card.svelte";

	let lists: string[];

	const unsub = store.subscribe((val) => {
		lists = [];
		for (let i in val) {
			lists = [...lists, i];
		}
	});

	onDestroy(unsub);
</script>

<!-- Lists of TODOS colletion homepage -->

<div class="w3-center w3-padding">
	{#each lists as list (list)}
		<Card listName={list} />
	{/each}
</div>

<style>
	.w3-center {
		height: 100%;
	}
</style>
